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


export interface HeaderProps
{
    role:string;
    isLoggedIn:boolean;
    logOut:any;
}

export interface HeaderState
{
    nodes:Array<INode>;
    registered:boolean;
    message:string;
    role:string;
}

var nodesGuest=[
    // {
    //     title:"Acasă",
    //     link:'/'
    // },
    {
        title:"Centre",
        link:'/centers'
    },
    {
        title:"Cont nou",
        link:"/register"
    },
    {
        title:"Conectează-te",
        link:"/logIn"
    }]

var nodesDoctor=[
    // {
    //     title:"Acasă",
    //     link:'/'
    // },
    {
        title:"Profil",
        link:"/doctor/profile"
    },
    {
        title:"Cere sânge",
        link:"/request"
    },
    {
        title:"Pacienții mei",
        link:"doctor/patients"
    },
    {
        title:"Sânge disponibil",
        link:"/bloodstock"
    }
]
var nodesHospitalAdmin=[
    // {
    //     title:"Acasă",
    //     link:'/'
    // },
    {
        title:"Conturi",
        link:"/hospital/admin"
    }]
var nodesCenterAdmin=[
    // {
    //     title:"Acasă",
    //     link:'/'
    // },
    {
        title:"Conturi",
        link:"/center/admin"
    },
]

var nodesEmployee=[
    // {
    //     title:"Acasă",
    //     link:'/'
    // },
    {
        title:"Profil",
        link:"/employee/profile"
    },
    {
        title:"Cereri sânge",
        link:"/employee/requests"
    },
    {
        title: "Stoc sânge",
        link: "/employees/stock"
    },
    {
        title: "Analize",
        link: "/employees/analyses"
    },
    {
        title:"Donatori",
        link: "/employees/donors"
    }

]

var nodesDonor=[
    // {
    //     title:"Acasă",
    //     link:'/'
    // }
    {
        title:"Profil",
        link:'/donor/profile'
    },
    {
        title:"Analizele mele",
        link:"/donor/analyses"
    },
    {
        title:"Centre",
        link:'/centers'
    }
]
export class Header extends React.Component<HeaderProps,HeaderState>
{
    constructor(props:HeaderProps)
    {
        super(props);
        this.state=
        {
            registered:this.props.isLoggedIn,
            nodes:nodesGuest,
            message:'',
            role:this.props.role
        };

    }

    renderNode(node:any, index:number):JSX.Element
    {
        return(
            // <div key={index}>
                <Link to={node.link}>
                    {node.title}
                    {/* {node.title=="LogOut"?<a onClick={this.logout.bind(this)} ></a>:null} */}
                </Link>
            // </div>
        )
    }

   

    render()
    {
        var currentNodes=nodesGuest;
        if(this.props.role=="HospitalDoctor")
            currentNodes=nodesDoctor;
        if(this.props.role=="HospitalAdmin")
            currentNodes=nodesHospitalAdmin;
        if(this.props.role=="DonationCenterAdmin")
            currentNodes=nodesCenterAdmin;
        if(this.props.role=="Donor")
            currentNodes=nodesDonor;

        if(this.props.role=="DonationCenterDoctor")
            currentNodes=nodesEmployee;
        
        return this.renderHeader(this.props.isLoggedIn,currentNodes);
    }

    renderHeader(isRegistered:boolean, currentNodes)
    {
        return( 
            <div className="hangouts-header">
            <div className="hangouts-nodes">
                <Link className="home-link" to="/">
                    <i className="fa fa-home"></i>
                    
                </Link>
                    
                {currentNodes.map(this.renderNode.bind(this))}
                {isRegistered?
                    <Link className="log-out" onClick={this.props.logOut} to="/">
                        <i className="fa fa-sign-out"></i>
                        
                        
                    </Link>
                    : <Redirect to="/"/>
                }
                
            </div>
            </div>)
    }
}