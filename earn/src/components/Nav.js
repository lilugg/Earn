import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {connect} from 'react-redux'
import {InpFn} from '../api/ipt'
const { SubMenu } = Menu;

class Nav extends Component {
 constructor(props) {
   super(props);
   this.state={
     index:"首页",
     setting:"设置",
     dz:"贷款订单",
     zd:"转单订单",
     bx:"保险订单",
   }
 }
 
    render() {
        return (
            <div style={{ width: 200 }}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" onClick={(e)=>{
              this.props.history.push('/home/index')
              this.props.addTit({title:this.state.index,key:e.key,path:'/home/index'})
              }}>
          <Icon type="home" />
            <span>{this.state.index}</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={(e)=>{
              this.props.history.push('/home/setting')
              this.props.addTit({title:this.state.setting,key:e.key,path:'/home/setting'})
              }} >
          <Icon type="setting"/>
            <span>{this.state.setting}</span>
          </Menu.Item>
          <SubMenu 
            key="3"  
            title={
              <span>
                <Icon type="file-protect" />
                <span>订单管理</span>
              </span>
            }
          >
            <Menu.Item onClick={(e)=>{
              this.props.history.push('/home/order/dk')
              this.props.addTit({title:e.item.props.children,key:e.key,path:'/home/order/dk'})
              this.props.allData(InpFn(e.item.props.id))
              }} key="4" id="1">{this.state.dz}</Menu.Item>
            <Menu.Item onClick={(e)=>{
              this.props.history.push('/home/order/zk')
              console.log(e)
              this.props.addTit({title:e.item.props.children,key:e.key,path:'/home/order/zk'})
              this.props.allData(InpFn(e.item.props.id))
              }} key="5" id="2">{this.state.zd}</Menu.Item>
            <Menu.Item key="6" id="3" onClick={(e)=>{
              this.props.history.push('/home/order/bx')
              this.props.addTit({title:e.item.props.children,key:e.key,path:'/home/order/bx'})
              this.props.allData(InpFn(e.item.props.id))
              }}>{this.state.bx}</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
        );
    }
}
let mapStateToProps=(state)=>{
  return{

  }
}
let mapDispatchToProps=(dispatch)=>{
  return{
    addTit:(obj)=>{
      dispatch({type:'Top',obj})
    },
    allData:(fn)=>{
      dispatch(fn)
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Nav) ;