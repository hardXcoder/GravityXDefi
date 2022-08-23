import React from 'react';
import metamask from '../images/metamask5.png'


export default class NoWallet extends React.Component {
    
    render() {
        return (
            <div>

                <table className="table table-borderless text-muted text-center mt-4">

                    <img src={metamask} alt="metamask" className="img-fluid" />

                </table>
                <div className="card mb-4" >

                    <div className="card-body">

                        <a href="https://metamask.io/" target="_blank">
                         <button type="submit" className=" btn-block btn-lg" id="buttonContent">Get Metamask</button>
                       </a>

                    </div>
                </div>
            </div>
        );
    }
}