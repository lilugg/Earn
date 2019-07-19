import React, { Component } from 'react';
import { Layout, Button} from 'antd';
import RouterView from '../router/RouterView'
import Nav from '../components/Nav';
import Tou from '../components/Tou';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {InpFn} from '../api/ipt'
// import Tob from '../components/Tob';
const { Header, Sider, Content } = Layout;
class Home extends Component {
    componentDidMount(){
        if(localStorage.sessionId){
           this.props.history.push('/home')    
        }else{
            this.props.history.push('/login')

        }
    }
    state = {
        size: 'large',
      };
    
      handleSizeChange = e => {
        this.setState({ size: e.target.value });
      };
      headClick(id){
        if(id*1===4){
          this.props.allData(InpFn(1))
        }else if(id*1===5){
          this.props.allData(InpFn(2))
        }else if(id*1===6){
          this.props.allData(InpFn(3))
        }
      }
    render() {
        const { size } = this.state;
        return (
            <div className="home">
                <Layout>
                    <Sider>
                        <Tou/>
                        <Nav {...this.props} />
                        <Button type="danger" size={size}>退出</Button>
                        <Button type="primary" size={size}>设置</Button>
                    </Sider>
                    <Layout>
                        <Header>
                            {
                              this.props.TopList&&this.props.TopList.map((item,index)=>{
                                  return <p key={index} >
                                  <NavLink to={item.path} onClick={this.headClick.bind(this,item.key)}>{item.title}</NavLink> 
                                 <span onClick={()=>{
                                     this.props.remove(index)
                                 }}>×</span>
                                </p>
                              })
                            }
                        </Header>
                        <Content>
                            <RouterView routes={this.props.children}/>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
let mapStateToProps=(state)=>{
    return{
      TopList:state.topNav
    }
  }
  let mapDispatchToProps=(dispatch)=>{
    return{
      remove:(ind)=>{
        dispatch({type:'Remove',ind})
      },
      allData:(fn)=>{
        dispatch(fn)
      }
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Home) ;