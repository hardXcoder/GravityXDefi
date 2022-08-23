import React from "react";
import metamask from "../images/metamask5.png";
import questionMark from "../images/QuestionMark.jpeg";

import BN from "bn.js";
import Web3 from "web3";

import { Link } from "react-router-dom";

import NoWallet from "./NoWallet";
import Loading from "./Loading";

import { getCurrentAccount, getWeb3Util } from "./util";

export default class Wallet extends React.Component {
  constructor(props) {
    super(props);

    // console.log("Wallet constructor called");
  }

  render() {
    return <div></div>;
  }
}
