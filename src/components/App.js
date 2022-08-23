import React, { Component } from "react";
import Web3 from "web3";

import USDC_JSON from "../abis/USDC.json";
import INRC_JSON from "../abis/INRC.json";
import COMMISSION_ACCOUNT_JSON from "../abis/CommissionFeeAccounts.json";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Main from "./Main";
import Wallet from "./Wallet";

import "./App.css";
import { Switch, Route } from "react-router-dom";

import { USDC_CONTRACT_ADDRESS } from "../constants";
import { INRC_CONTRACT_ADDRESS } from "../constants";
import { COMMISSION_FEE_ACCOUNT_CONTRACT_ADDRESS } from "../constants";

import { web3_Api } from "../constants";

import { getCurrentAccount, getWeb3Util } from "./util";
import Faucet from "./Faucet";

class App extends Component {
  async componentWillMount() {
    if (window.ethereum) {
      const currentAccount = await getCurrentAccount();
      this.setState({ account: currentAccount });

      window.ethereum.on("accountsChanged", (accounts) => {
        console.log("in app event handler");

        if (accounts && accounts.length != 0) {
          this.setState({ account: accounts[0] });
        } else {
          this.setState({ account: "NA" });
        }

        this.loadWeb3();
      });

      //Checking if the account is connected to metamask, then loading all data
      if (currentAccount != "NA") {
        this.loadWeb3();
      }
    }
  }

  connectToWallet = async () => {
    try {
      await window.ethereum.enable().then((account) => {
        this.setState({ account: account[0] });
      });
      this.loadWeb3();
    } catch (error) {}
  };

  async loadWeb3() {
    if (window.ethereum) {
      await this.loadBlockchainData();
    }
  }

  async loadBlockchainData() {
    try {
      const usdcContract = await new this.web3.eth.Contract(
        USDC_JSON,
        USDC_CONTRACT_ADDRESS
      );

      const inrcContract = await new this.web3.eth.Contract(
        INRC_JSON,
        INRC_CONTRACT_ADDRESS
      );

      const commissionFeeAccountContract = await new this.web3.eth.Contract(
        COMMISSION_ACCOUNT_JSON,
        COMMISSION_FEE_ACCOUNT_CONTRACT_ADDRESS
      );

      console.log("Abracadabra");

      if (usdcContract && inrcContract && commissionFeeAccountContract) {
        this.setState({ usdcContract });
        this.setState({ inrcContract });
        this.setState({ commissionFeeAccountContract });

        console.log(usdcContract);
        console.log(inrcContract);
        console.log(commissionFeeAccountContract);

        var usdcInWallet = this.toEthUnit(
          await usdcContract.methods.balanceOf(this.state.account).call()
        );

        var inrcInWallet = this.toEthUnit(
          await inrcContract.methods.balanceOf(this.state.account).call()
        );

        console.log(usdcInWallet);
        console.log(inrcInWallet);

        this.setState({ usdcInWallet });
        this.setState({ inrcInWallet });
      } else {
        window.alert("Contract not deployed to detected network.");
      }
      this.setState({ loading: false });
    } catch (error) {}
  }

  checkWalletConnection = async () => {
    if (this.state.account == "NA") {
      await this.connectToWallet();
    }

    await this.loadWeb3();
  };

  mintINRC = async (usdcDepositAmount, callback) => {
    // await this.checkWalletConnection();

    await this.state.usdcContract.methods
      .approve(INRC_CONTRACT_ADDRESS, this.toWeiUnit(usdcDepositAmount))
      .send({ from: this.state.account }, function(err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log("Hash of the approval transaction: " + res);
      });

    try {
      this.setState({ loading: true });
      await this.state.inrcContract.methods
        .mint(this.toWeiUnit(usdcDepositAmount))
        .send({
          from: this.state.account,
          gas: 220000,
        })
        .on("transactionHash", (hash) => {})
        .on("receipt", (receipt) => {
          window.alert("Transaction successful");
        })
        .on("error", (err) => {
          window.alert(err.message);
        });
    } catch (error) {
      console.log(error);
    } finally {
      if (callback) {
        callback();
      }

      await this.loadWeb3();
    }

    console.log("Hello I am in Appjs in mintINRC");
  };

  redeemINRC = async (inrcRedeemAmount, callback) => {
    try {
      this.setState({ loading: true });
      await this.state.inrcContract.methods
        .redeem(this.toWeiUnit(inrcRedeemAmount))
        .send({
          from: this.state.account,
          gas: 220000,
        })
        .on("transactionHash", (hash) => {})
        .on("receipt", (receipt) => {
          window.alert("Transaction successful");
        })
        .on("error", (err) => {
          window.alert(err.message);
        });
    } catch (error) {
      console.log(error);
    } finally {
      if (callback) {
        callback();
      }

      await this.loadWeb3();
    }
  };

  toEthUnit = (wei) => {
    var num = Web3.utils.fromWei(wei);
    var value = parseFloat(num).toFixed(0);
    return value;
  };

  toWeiUnit = (ether) => {
    var num = Web3.utils.toWei(ether);
    // var value = parseFloat(num).toFixed(6);
    return num;
  };

  remainingQuantity = async (nftContract) => {
    // var max = await nftContract.methods.maxBoku().call();
    // var minted = await nftContract.methods.totalSupply().call();
    //  console.log("poiop : " + max + " : " + minted);
    // return max - minted;
  };

  constructor(props) {
    super(props);

    this.state = {
      account: "NA",
      inrcContract: {},
      usdcContract: {},
      commissionFeeAccountContract: {},
      bitQueenSymbol: "0",
      usdcInWallet: 0,
      inrcInWallet: 0,
      loading: true,
      tokenName: null,
      srcLinkArray: [],
      totalSupply: 0,
      remQty: 0,
      isWeb3Browser: true,
    };

    this.web3 = getWeb3Util();
  }

  render() {
    return (
      <div className="backgroundPaper">
        <Navbar account={this.state.account} />

        <div className=" mainContainer">
          <div>
            <Main
              mintINRC={this.mintINRC}
              redeemINRC={this.redeemINRC}
              usdcInWallet={this.state.usdcInWallet}
              inrcInWallet={this.state.inrcInWallet}
              account={this.state.account}
              connectToWallet={this.connectToWallet}
            />
          </div>
        </div>

        <Footer account={this.state.account} />
      </div>
    );
  }
}

export default App;
