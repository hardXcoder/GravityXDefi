import Web3 from "web3";
import { web3_Api } from "../constants";

export const getWeb3Util = () => {
  if (window.ethereum) {
    return new Web3(window.ethereum);
  } else {
    return new Web3(web3_Api);
  }
};

export const getCurrentAccount = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // console.log("I am in util, and account is :" + accounts)
      console.log(accounts);

      if (accounts && accounts.length != 0) {
        return accounts[0];
      }
    } catch (error) {
      return "NA";
    }
  }

  return "NA";
};
