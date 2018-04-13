import * as React from 'react'
import { Link } from 'react-router-dom';
import './Header.css'
// import { Register } from '../Account/Register';
import App from '../../App';
import { withRouter } from 'react-router-dom'
import { INode } from '../../Models/INode';
import { AccountService } from '../../Services/AccountServices';
import Alert from 'react-s-alert';
import { Redirect } from 'react-router';

export interface HeaderProps{}

export interface HeaderState
{
    nodes:Array<INode>;
    registered:boolean;
    message:string;
}

export class Header extends React.Component<HeaderProps,HeaderState>
{
    

    constructor(props:HeaderProps)
    {
        super(props);
        this.state=
        {
            registered:true,
            nodes:[
                {
                    title:"Acasă",
                    link:'/'
                },
                {
                    title:"Cont nou",
                    link:"/register"
                },
                {
                    title:"Conectează-te",
                    link:"/logIn"
                }],
            message:''
        };
    }

    renderNode(node:any, index:number):JSX.Element
    {
        return(
            // <div key={index}>
                <Link to={node.link}>
                    <span> {node.title} </span>
                    {/* {node.title=="LogOut"?<a onClick={this.logout.bind(this)} ></a>:null} */}
                </Link>
            // </div>
        )
    }

    logout()
    {
        AccountService.logoutUser().then(()=>{
            this.setState({registered:false})
            

        },
        (error) => {
            this.setState({
                message: "Error logout.Please try again"
                
            });
            Alert.error(this.state.message, {
                position: 'top-right',
                effect: 'jelly'
              });
        });
    

    
     
    }

    render()
    {
        if(!this.state.registered)
        {
            return <Redirect to="/"/>
        }
        
        return(
            <div className="hangouts-header">
                <div className="hangouts-nodes">
                    {this.state.nodes.map(this.renderNode.bind(this))}
                    <Link onClick={this.logout.bind(this)} to="/">
                    <span>Log Out</span>
                    </Link>
                    {/* <div style={{align:"right"}}><a onClick={this.logout.bind(this)} >Logout</a></div> */}
                </div>
            </div>
        )
    }
}