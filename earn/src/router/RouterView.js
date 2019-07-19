import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
class RouteView extends Component {
    render() {
        let {routes}=this.props
        let arrRedirect=routes.filter((item,index)=>{
            return item.redirect
        })
        let Redirects=arrRedirect.map((item,index)=>{
           return <Redirect key={index} to={item.redirect} from={item.path} exact/>
        })
        routes=routes.filter(item=>!item.redirect)
        return (
            <Switch>
                {
                   routes.map((item,index)=>{
                     return <Route path={item.path} key={index} render={(props)=>{
                        return <>
                        {item.children&&<item.component children={item.children} {...props}/>}
                        {!item.children&&<item.component {...props} />}
                     </>
                     }}/>
                   })  
                }
                {Redirects.length!==0&&Redirects}
            </Switch>
        );
    }
}

export default RouteView;