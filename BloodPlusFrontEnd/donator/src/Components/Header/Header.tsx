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
    {
        title:"Acasă",
        link:'/'
    },
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
    {
        title:"Acasă",
        link:'/'
    },
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
        title:"Sange disponibil",
        link:"/bloodstock"
    }
]
var nodesHospitalAdmin=[
    {
        title:"Acasă",
        link:'/'
    },
    {
        title:"Conturi",
        link:"/hospital/admin"
    }]
var nodesCenterAdmin=[
        {
            title:"Acasă",
            link:'/'
        },
        {
            title:"Conturi",
            link:"/center/admin"
        },
    ]

var nodesEmployee=[
    {
        title:"Acasă",
        link:'/'
    },
    {
        title:"Profil",
        link:"/employee/profile"
    },
    {
        title:"Cereri de sânge",
        link:"/employee/requests"
    },
    {
        title: "Stoc sange",
        link: "/employees/stock"
    }

]

var nodesDonor=[
    {
        title:"Acasă",
        link:'/'
    },
    {
        title:"Profil",
        link:'/donor/profile'
    },
    {
        title:"Analizele mele",
        link:"/donor/analyses"
    }]
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
                    <span> {node.title} </span>
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
                    {currentNodes.map(this.renderNode.bind(this))}
                    {isRegistered?
                        <Link onClick={this.props.logOut} to="/">
                            <span>Log Out</span>
                        </Link>
                        : <Redirect to="/"/>
                    }
                   
                </div>
                </div>)
    }
}