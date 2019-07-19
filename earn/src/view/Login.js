import React, { Component } from 'react';
import '../css/login.css'
import Input from '../components/Input';
class Login extends Component {
    render() {
        return (
            <div className="loginUser">
                <div className="leftLogin">
                    <p>
                        Welcome
                   </p>
                    <p>
                        赚赚金融 开创信贷“1＋N”模式的综合互联网金融服务共享平台
                   </p>
                </div>
                <div className="rightLogin">
                    <Input {...this.props}/>
                </div>
            </div>
        );
    }
}

export default Login;