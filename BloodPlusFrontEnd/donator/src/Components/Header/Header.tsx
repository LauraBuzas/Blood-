import * as React from 'react'
import { Link } from 'react-router-dom';
import './Header.css'
// import { Register } from '../Account/Register';
import App from '../../App';
import { withRouter } from 'react-router-dom'
import { INode } from '../../Models/INode';
export interface HeaderProps{}

export interface HeaderState
{
    nodes:Array<INode>;
    registered:boolean;
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
                    title:"Home",
                    link:'/'
                },
                {
                    title:"Profile",
                    link:"/"
                }]
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
        // AccountService.logoutUser();
    //    this.setState({registered:false})
    }

    render()
    {
        if(!this.state.registered)
        {
            return(<App/>)
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