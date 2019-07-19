import React, { Component } from 'react';
import { connect } from 'react-redux'
import Axios from 'axios';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            pass: "",
            auth: "",
            num:"",
            timer:null
        }
    }
    componentWillUnmount(){
      this.setState({
        timer:null
      })
    }
    render() {
        return (
            <div className="login">
                <dl>
                    <dt className="iconfont icon-baidu2" style={{ fontSize: "100px" }}></dt>
                    <dd>赚赚金融渠道管理系统</dd>
                </dl>
                <p><input type="text" onChange={(e) => {
                    this.setState({
                        phone: e.target.value
                    })
                }} value={this.state.phone} placeholder='手机号' /></p>
                <p><input type="password" onChange={(e) => {
                    this.setState({
                        pass: e.target.value
                    })
                }} value={this.state.pass} placeholder='登录密码' /></p>
                <p className="yan"><input type="text" onChange={(e) => {
                    this.setState({
                        auth: e.target.value
                    })
                }} value={this.state.auth} placeholder='验证码' /><span onClick={()=>{
                    this.setState({
                        timer:setTimeout(()=>{
                      this.setState({
                          num:"获取验证码"
                      })
                    },2000)
                    })
                  Axios.get('http://localhost:3000/api/checkCode').then(({data})=>{
                      this.setState({
                          num:data.Verification
                      })  
                  })
                }}>{this.state.num?this.state.num:"获取验证码"}</span></p>
                <button onClick={() => {
                    let obj = {
                        phone:this.state.phone,
                        checkcode:this.state.auth,
                        password:this.state.pass
                        }
                        Axios.defaults.headers.common['authorization']=localStorage.sessionId;
                        Axios.post('http://localhost:3000/api/login',obj).then(({ data }) => {
                            if(data.code===0){
                                localStorage.sessionId=data.sessionId;
                                this.props.history.push('/home')
                            }else{
                                this.setState({
                                    pass:'',
                                    phone:'',
                                    checkcode:''
                                })
                                alert(data.message)
                            }
                           
                        })
                }} style={{ background: "#7b1ad9" }} >登陆</button>
            </div >
        );
    }
}
let mapStateToProps = (state) => {
    return {
         
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
     loginCode:(fn)=>{
       dispatch(fn)
     }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Input);