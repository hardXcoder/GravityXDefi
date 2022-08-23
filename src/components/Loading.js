import React from 'react';

export default class Loading extends React.Component {


    render() {

        return (
            <div className = "loadingContainer d-flex flex-column align-items-center">
                <div className="loadingIndicator">
                </div>
                {this.props.children}
            </div>
        )

    }


}