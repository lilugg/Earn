import React, { Component } from 'react';
import RouteView from '../../router/RouterView';

class Can extends Component {
    render() {
        return (
            <div>
                <RouteView routes={this.props.children}/>
            </div>
        );
    }
}

export default Can;