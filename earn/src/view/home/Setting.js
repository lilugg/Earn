import React, { Component } from 'react';
import Axios from 'axios';
class Setting extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:{},
            file:""
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
            <div>
               <dl>
                   <dt style={{width: '200px', height: '200px', overflow: 'hidden', borderRadius: '50%'}}>
                       <input type="file" onChange={(e)=>{
                         let fileObj=e.target.files[0]
                         let reg=/\.(jpg|jpeg|gif|png)$/
                         if(!reg.test(fileObj.name)){
                            alert('格式不对')
                            return
                         }
                         let readerFileObj = new FileReader()
                         readerFileObj.readAsDataURL(fileObj)
                         readerFileObj.onload=()=>{
                            console.log(readerFileObj.result)
                            let data=this.state.data
                            data.facePhoto=readerFileObj.result
                            this.setState({data})
                         }
                        //  console.log(readerFileObj)
                       }}/>
                       <img src={`${this.state.data.facePhoto}`} alt=""/>
                   </dt>
               </dl>
                <button onClick={()=>{
                    console.log(this.state.data.facePhoto)
                     Axios.defaults.headers.common['authorization']=localStorage.sessionId;
                    Axios.post('http://localhost:3000/api/facePhoto',{file:this.state.data.facePhoto}).then(({data})=>{
                        console.log(data,"data")
                    })
                }}>更改</button>
            </div>
        );
    }
}

export default Setting;