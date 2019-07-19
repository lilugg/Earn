import React, { Component } from 'react';
import Axios from 'axios';

class Tou extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:{}
        }
    }
    
    componentDidMount(){
        Axios.defaults.headers.common['authorization']=localStorage.sessionId;
        Axios.get('http://localhost:3000/api/islogin').then(({data})=>{
         this.setState({
             data:data.info
         })
        });
    }
    render() {
        return (
            <div className="tou">
                <p>
                   <img src={`http://localhost:3001${this.state.data.facePhoto}`} alt=""/>   
                </p>
                <span>{this.state.data.phone}</span>
              
            </div>
        );
    }
}

export default Tou;