import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
let defaultData={
topNav:[],
list:[]
}
let reducer=(state=defaultData,action)=>{
    let newData=JSON.parse(JSON.stringify(state))
  switch(action.type){
      case 'Top':
       
         let yes=newData.topNav.some(item=>{
         return item.key===action.obj.key
         })
      
         if(yes){
            newData.topNav.forEach((item,index)=>{
              item.ind=index;
             if(item.key===action.obj.key){
                 let obj=newData.topNav.splice(index,1)[0];
                newData.topNav.unshift(obj);
             }
            })
         }else{
          newData.topNav.unshift(action.obj);
         }  
      break;
      case 'Remove':
          newData.topNav.splice(action.ind,1)
          newData.topNav.forEach((item,index)=>{
            item.id=index;
          })
    break;
    case 'AllSTATE':
     newData.list=action.data;
break;
      default:break;
  }
  return newData
}
export const store=createStore(reducer,applyMiddleware(thunk))
