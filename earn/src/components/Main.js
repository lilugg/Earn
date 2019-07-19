import React, { Component } from 'react'
import { Table, DatePicker ,Radio,Select,Button } from 'antd';
import {connect} from 'react-redux'
const { RangePicker } = DatePicker;
const { Option } = Select;
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filData:undefined,
           type:"",
           service:"",
           state:"",
           start:"",
           end:"",
            columns: [
                { title: '订单号', dataIndex: 'id', key: '1', fixed: 'left',width:200},
                { title: '下单时间', dataIndex: 'date', key: '2', fixed: 'left',width:200 },
                { title: '用户名', dataIndex: 'customerName', key: '3',width:200 },
                { title: '手机号', dataIndex: 'phone', key: '4',fixed: 'left',width:200 },
                { title: '转单类型', dataIndex: 'type', key: '5',fixed: 'left',width:200 },
                { title: '贷款金额', dataIndex: 'money', key: '6',fixed: 'left',width:200 },
                { title: '订单状态', dataIndex: 'handleState', key: '7',fixed: 'left',width:200 },
                { title: '客服', dataIndex: 'serviceName', key: '8',fixed: 'left',width:200 },
                {
                  title: '操作',
                  key: 'operation',
                  fixed: 'right',
                  width: 100,
                  render: () => <p >...</p>,
                },
              ],           
            data:  [],
           
        }
        // this.Filter({})
    }
    // componentDidMount(){
    //     this.Filter({})
    // }
    handleChange(value) {
        this.setState({
            type:value.key
        })
      }
      allChange(value) {
        this.setState({
            service:value.key
        })
      }
    onChange(date, dateString) {
        this.setState({
            start:dateString[0],
            end:dateString[1],
        })
      }
      stateData(){
       var arr=JSON.parse(JSON.stringify(this.state.filData?this.state.filData:this.props.list));
      arr.forEach(item=>{
          if(item.handleState===0){
            item.handleState='新订单'  
          }else if(item.handleState===1){
            item.handleState='未审核'  
          }else if(item.handleState===2){
            item.handleState='已接单'  
          }else if(item.handleState===3){
            item.handleState='已完成' 
          }else if(item.handleState===4){
            item.handleState='暂无状态'  
          }
      })
      return arr
      }
    render() {
        return (
            <div>
                <div>
                  处理时间：  <RangePicker onChange={this.onChange.bind(this)} /> <br/>
                   处理状态： <Radio.Group defaultValue="a" buttonStyle="solid" onChange={(e)=>{
                       this.setState({
                           state:e.target.value
                       })
                   }} >
                                <Radio.Button value="全部">全部</Radio.Button>
                                <Radio.Button value="0">新订单</Radio.Button>
                                <Radio.Button value="1">未审核</Radio.Button>
                                <Radio.Button value="2">已接单</Radio.Button>
                                <Radio.Button value="3">已完成</Radio.Button>
                                <Radio.Button value="4">暂无状态</Radio.Button>
                            </Radio.Group>
                          转单类型：  <Select
                                labelInValue
                                defaultValue={{ key: '请选择订单' }}
                                style={{ width: 120 }}
                                onChange={this.handleChange.bind(this)}
                            >
                                 <Option value="请选择订单" disabled>请选择订单</Option>
                                <Option value="信用贷">信用贷</Option>
                                <Option value="押房贷">押房贷</Option>
                                <Option value="房乐贷">房乐贷</Option>
                                <Option value="车乐贷">车乐贷</Option>
                            </Select>
                         客服名称：   <Select
                                labelInValue
                                defaultValue={{ key: '请选择订单' }}
                                style={{ width: 120 }}
                                
                                onChange={this.allChange.bind(this)}
                            >
                                <Option value="请选择订单" disabled>请选择订单</Option>
                                <Option value="李大维">李大维</Option>
                                <Option value="张玲">张玲</Option>
                                <Option value="李家豪">李家豪</Option>
                                <Option value="李小冉">李小冉</Option>
                                <Option value="李莉">李莉</Option>
                            </Select>
                            <Button type="primary" onClick={()=>{
                            
                              let obj={
                                    type:this.state.type,
                                    service:this.state.service,
                                    state:this.state.state,
                                    start:this.state.start,
                                    end:this.state.end,
                                }
                                console.log(obj)
                             this.Filter(obj)
                            }}>搜索</Button>
                </div>
                <Table pagination={{pageSize:5}} columns={this.state.columns} dataSource={this.stateData()}  />
            </div>
            
        )
    }
    Filter(obj){
        var arr=JSON.parse(JSON.stringify(this.props.list));
        let startTime= new Date(obj.start)*1;
        let endTime=new Date(obj.end)*1;
        // if(obj.state==='全部'){
        //     arr=this.props.list
        // }
        arr=arr.filter(item=>{
            let newDate=new Date(item.date)*1;
            if(startTime&&endTime){
                if(newDate>endTime||newDate<startTime){
                    return false
                }
            }
            if(obj.service!==""&&obj.service!=="请选择订单"){
                if(obj.service!==item.serviceName){
                    return false
                }
            }
            if(obj.type!==""&&obj.type!=="请选择订单"){
                if(obj.type!==item.type){
                    return false
                }
            }
            if(obj.state!==""&&obj.state!=="全部"){
             if(obj.state*1!==item.handleState){
               return false
             }
            }
            return true
        })
         this.setState({
            filData:arr
         })
    }
}
export default connect((state)=>{
 return{
     list:state.list
 }
})(Main) ;
