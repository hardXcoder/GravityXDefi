import React, { Component, Fragment } from "react";

import bg from "../images/bg8.gif";

class Faucet extends Component {
  state = {
    isSaleStarted: true,
    imgSrc: "https://bitqueensdata.blob.core.windows.net/bitqueensdata/",
    loading: false,
  };

  getValue = (totalSupply, curLevelCapacity, bucketSize) => {
    var value = 0;

    if (totalSupply >= curLevelCapacity) value = bucketSize;
    else if (totalSupply <= curLevelCapacity - bucketSize) value = 0;
    else value = bucketSize - (curLevelCapacity - totalSupply);

    return value;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });
  };

  render() {
    return (
      <div className="prefaceBlock">
        <img alt=" " className="prefaceImage" src={bg} />
      </div>
    );
  }
}

export default Faucet;
