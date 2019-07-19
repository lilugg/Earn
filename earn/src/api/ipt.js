import axios from 'axios'
export  function InpFn(id) {
  return  function (next) {
    axios.defaults.headers.common['authorization']=localStorage.sessionId;
        axios.get('http://localhost:3000/api/list?order='+id).then(({ data }) => {
            data.data.forEach((item,index)=>{
                item.key=index
            })
            next({ type: "AllSTATE", data:data.data })
        })
    }
}
