import React, { Component, Fragment } from "react";

import Loading from "./Loading";

import { useState } from "react";

class Main extends Component {
  state = {
    isSaleStarted: true,
    loading: false,
    usdcDeposit: 0,
    inrcRedeem: 0,
  };

  redeem = async () => {
    this.setState({
      loading: true,
    });
    try {
      if (this.state.inrcRedeem > 0) {
        console.log("Redeem is called");
        console.log(this.state.inrcRedeem);
        await this.props.redeemINRC(this.state.inrcRedeem, () => {
          this.setState({
            loading: false,
          });
        });
      } else {
        window.alert("Please enter the correct INRC amount");
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
    }

    this.setState({
      loading: false,
    });
  };

  mint = async () => {
    this.setState({
      loading: true,
    });
    try {
      if (this.state.usdcDeposit > 0) {
        console.log("mint is called");
        console.log(this.state.usdcDeposit);
        await this.props.mintINRC(this.state.usdcDeposit, () => {
          this.setState({
            loading: false,
          });
        });
      } else {
        window.alert("Please enter the correct USDC amount");
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
    }

    this.setState({
      loading: false,
    });
  };

  handleInrcValueChange = (event) => {
    this.state.inrcRedeem = event.target.value;

    console.log("value is:", event.target.value);
  };

  handleUsdcValueChange = (event) => {
    this.state.usdcDeposit = event.target.value;

    console.log("value is:", this.state.usdcDeposit);
  };

  connectWallet = () => {
    this.props.connectToWallet(this.state.inrcRedeem);
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    let numberOfNFTs = this.input.value;
    await this.props.mintINRC(numberOfNFTs, () => {
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    return (
      <div>
        <div className="">
          <h2 className="whiteText AboretoText">DEFI Simplified</h2>
          <br></br>
          {this.props.account != "NA" ? (
            <div className="centerAlign">
              <button className="greenColorButton">CONNECTED</button>
            </div>
          ) : (
            <div className="centerAlign">
              <button onClick={this.connectWallet}>CONNECT</button>
            </div>
          )}
          <br></br>
          <h3 className="whiteText AboretoText">
            Account : {this.props.account}
          </h3>
          <br></br> <br></br>
        </div>

        <div>
          <div className="firstDiv">
            <div className="card">
              <div className="container">
                <input
                  placeholder="Enter amount of USDC..."
                  type="text"
                  id="usdcDeposit"
                  name="usdcDeposit"
                  onChange={this.handleUsdcValueChange}
                  className="robotoText"
                ></input>
                <div className="secondaryCard">
                  <div className="container">
                    <h4 className="AboretoText ">Pay with USDC </h4>
                  </div>
                </div>
                <div className="secondaryCard">
                  <div className="container">
                    <h4 className="AboretoText">Mint INRC</h4>
                  </div>
                </div>
                <p className="robotoText">Mint Rate : 1 USDC ~ 80 INRC</p>
                {/* <p className="robotoText"> Estimated Output : {this.state.usdcDeposit}</p> */}
                <p className="robotoText">
                  My Wallet balance : {this.props.usdcInWallet} USDC
                </p>
                <p className="robotoText">0.5 % Transaction fees</p>
                {this.state.loading ? (
                  <Loading>
                    <p className="mt-2">
                      Please wait while the transaction is executing
                    </p>
                  </Loading>
                ) : (
                  <button onClick={this.mint}> MINT</button>
                )}{" "}
              </div>
            </div>
          </div>

          <div className="secondDiv">
            <div className="card">
              <div className="container">
                <input
                  placeholder="Enter amount of INRC..."
                  type="text"
                  id="inrcDeposit"
                  name="inrcDeposit"
                  onChange={this.handleInrcValueChange}
                  className="robotoText"
                ></input>

                <div className="secondaryCard">
                  <div className="container">
                    <h4 className="AboretoText">
                      <b>Redeem INRC</b>
                    </h4>
                  </div>
                </div>

                <div className="secondaryCard">
                  <div className="container">
                    <h4 className="AboretoText">Get USDC</h4>
                  </div>
                </div>

                <p className="robotoText">Redeem Rate : 1 INRC ~ 0.0125 USDC</p>
                {/* <p className="robotoText">Estimated Output : {}</p> */}
                <p className="robotoText">
                  My Wallet balance : {this.props.inrcInWallet} INRC
                </p>
                <p className="robotoText">0.5 % Transaction fees</p>

                {this.state.loading ? (
                  <Loading>
                    <p className="mt-2">
                      Please wait while the transaction is executing
                    </p>
                  </Loading>
                ) : (
                  <button onClick={this.redeem}> REDEEM</button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mintArea">
          <div className="mintTextBlock">
            
            <p>Always old, sometimes new.</p>
            <p> Never sad, sometimes blue.</p>
            <p>Never empty, sometimes full. </p>
            <p>Never pushes, always pulls. </p>
            <br></br>
            <p>
              Something coming, anyone haven't thought in their wildest dreamz{" "}
            </p>
            <br></br>
          </div>
          <div className="mintButtonBlock">
            {this.state.loading ? (
              <Loading>
                <p className="mt-2">
                  Please wait while the transaction is executing
                </p>
              </Loading>
            ) : (
              
              <form className="mb-2" onSubmit={this.handleSubmit}>
                <div className="input-group mb-4">
                  <input
                    type="text"
                    ref={(input) => {
                      this.input = input;
                    }}
                    className="form-control form-control-lg"
                    placeholder="Quantity.."
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">Max 10</div>
                  </div>
                </div>

                {this.state.loading ? (
                  <Loading>
                    <p className="mt-2">
                      Please wait while the transaction is executing
                    </p>
                  </Loading>
                ) : (
                  <Fragment>
                    <button
                      type="submit"
                      className="greyClass btn-block responsiveTextSize btn-lg"
                      id="buttonContent"
                      disabled={this.state.loading}
                    >
                      Mint your Owlz!
                    </button>
                    <br></br>
                    <p>
                      <b>
                        <i>First free then 0.0069 eth/each.</i>
                      </b>
                    </p>
                    <a
                      href="https://etherscan.io/address/0x4b2CaCCE7b585B2914D2a30750fFA6E8Fb91E6ee"
                      className=" "
                    >
                      <p>
                        <b>
                          <u className="greyLink"> Verified smart contracts</u>
                        </b>
                      </p>
                    </a>

                   
                  </Fragment>
                )}
              </form>
            )}
          </div>
        </div> */}
      </div>
    );
  }
}

export default Main;
