// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract INRC is ERC20, Ownable {
    address swapDenomination;

    address commissionFeeAccount;

    uint256 commissionFee;

    constructor(
        address _swapDenomination,
        address _commissionFeeAccount,
        uint256 _commissionFee
    ) ERC20("INRC Token", "INRC") {
        commissionFeeAccount = _commissionFeeAccount;
        swapDenomination = _swapDenomination;
        commissionFee = _commissionFee;
    }

    function mint(uint256 _depositDenominationAmount) external returns (bool) {
        // Using checks-effects-interaction pattern to prevent malicious attacks

        require(
            ERC20(swapDenomination).balanceOf(msg.sender) >=
                _depositDenominationAmount,
            "Not enough balance to Mint"
        );

        // Deducting the fees
        uint256 effectiveAmountDepositAfterFee = (_depositDenominationAmount *
            (1000 - commissionFee)) / 1000;

        // Calculating the effective exchange rate
        uint256 exchangeRateAmount = getExchangeRateAmount(
            swapDenomination,
            address(this),
            effectiveAmountDepositAfterFee
        );

        // Sending the tokens from Owner to the INRC contract to lock
        require(
            ERC20(swapDenomination).transferFrom(
                msg.sender,
                address(this),
                _depositDenominationAmount
            ),
            "Please check your USDC balance"
        );

        // Sending fee to commission account
        ERC20(swapDenomination).transfer(
            commissionFeeAccount,
            (_depositDenominationAmount - effectiveAmountDepositAfterFee)
        );

        // Mint the tokens to Owner
        _mint(msg.sender, exchangeRateAmount);

        return true;
    }

    function redeem(uint256 _redeemAmount) external returns (bool) {
        // Using checks-effects-interaction pattern to prevent malicious attacks

        require(
            ERC20(address(this)).balanceOf(msg.sender) >= _redeemAmount,
            "Not enough balance to Redeem"
        );

        // Calculating effective amounts after fee deduction
        uint256 exchangeRateAmount = getExchangeRateAmount(
            address(this),
            swapDenomination,
            _redeemAmount
        );

        uint256 effectiveAmountRedeem = (exchangeRateAmount *
            ((1000 - commissionFee))) / 1000;

        // Transfer to Commission fee account
        require(
            ERC20(swapDenomination).transfer(
                commissionFeeAccount,
                (exchangeRateAmount - effectiveAmountRedeem)
            ),
            "Please check your INRC balance"
        );

        // Burning the INRC tokens
        _burn(msg.sender, _redeemAmount);

        // Transfer to Redemption Owner
        ERC20(swapDenomination).transfer(msg.sender, effectiveAmountRedeem);

        return true;
    }

    function getExchangeRateAmount(
        address fromCurrency,
        address toCurrency,
        uint256 exchangeAmount
    ) public view returns (uint256) {
        if (fromCurrency == swapDenomination && toCurrency == address(this)) {
            return 80 * exchangeAmount;
        } else {
            return exchangeAmount / 80;
        }
    }

    // Upgradeable contract to change the swap denomination in fututre if required with onlyOwner modifier

    function setSwapDenominator(address _denominator) public onlyOwner {
        swapDenomination = _denominator;
    }

    function setCommissionFeeAccount(address _commissionFeeAccount)
        public
        onlyOwner
    {
        commissionFeeAccount = _commissionFeeAccount;
    }

    function setCommissionFee(uint256 _commissionFee) public onlyOwner {
        commissionFee = _commissionFee;
    }
}
