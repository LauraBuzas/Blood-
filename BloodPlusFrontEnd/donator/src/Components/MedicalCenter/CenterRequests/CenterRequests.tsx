import * as React from 'react'
import * as signalR from '@aspnet/signalr';
import {Helmet} from 'react-helmet'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { WebSocketService } from '../../../Services/WebSocketService';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import './CenterRequests.css';
import { EmployeeService } from '../../../Services/EmployeeService';
import { IEmployeeRequest } from '../../../Models/IEmployeeRequest';
import { IGroupedStock } from '../../../Models/IGroupedStock';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

export interface CenterRequestProps{webSocket:WebSocketService;}
interface CenterRequestState
{
  requests:IEmployeeRequest[];
  notificationRequested:boolean;
  message:string;
  stock:IGroupedStock[];
  noNotifications:number
}
export class CenterRequest extends React.Component<CenterRequestProps,CenterRequestState>
{

    constructor(props: CenterRequestProps) {
       
        super(props);
        this.state=
        {
            requests:[],
            notificationRequested:false,
            message:'',
            stock:[],
            noNotifications:0
        }
        this.getRequests=this.getRequests.bind(this);
        this.getStock=this.getStock.bind(this);
        // var webSocket=new WebSocketService();
        // webSocket.startConnection();   
       // webSocket.subscribeToAGroup("employees");
        
    }

    getRequests()
    {
        EmployeeService.getRequests().then((requests:IEmployeeRequest[]) => {
          this.setState({
              requests:requests
          });    
      },
          (error) => {
              this.setState({
                  message: "A apărut o eroare la aducerea cererilor de la doctori"
                  
              });
              Alert.error(this.state.message, {
                  position: 'top-right',
                  effect: 'jelly'
                });
          });    
    }

    getStock()
    {
        EmployeeService.getGroupedStock().then((stock:IGroupedStock[]) => {
          this.setState({
            stock:stock
          });    
      },
          (error) => {
              this.setState({
                  message: "A apărut o eroare la aducerea stocului de sange"
                  
              });
              Alert.error(this.state.message, {
                  position: 'top-right',
                  effect: 'jelly'
                });
          });    
    }

    componentDidMount() {
      this.getStock();
      this.getRequests();
     
    }
    
    addRequest(request:IEmployeeRequest)
    {
        var all=this.state.requests;
        all.push(request);
        this.setState({requests:all});
        Alert.info("Un doctor are nevoie de sânge. Verificați cererile", {
            position: 'top-right',
            effect: 'jelly'
          });
    }

    buttonAccept(cell,row){
          return <button className="button-accept" onClick = {() => {this.acceptRequest(row)}}>
            <i className="fa fa-check-square"></i>
            </button>
    }

    acceptRequest(row)
    {
      EmployeeService.acceptRequest(row).then((request:IEmployeeRequest) => {
        console.log("s-a acceptat"+request)
        this.getRequests();
        this.getStock();
        Alert.success("Cererea a fost acceptata cu success. Doctorul va fi notificat.", {
            position: 'top-right',
            effect: 'jelly'
          });
        Alert.success("Verificati stocul disponibil", {
            position: 'top-right',
            effect: 'jelly'
          });
      },
        (error) => {
            Alert.error(error.response.data, {
                position: 'top-right',
                effect: 'jelly'
              });
        });        
    }

    bloodbags(grup:any,index:number):JSX.Element
    {
        if(grup.component=="Punga de sange")
                return (<p>{grup.bloodType} {grup.rh}: {grup.quantity}</p>);
        else return(null);
    }

    thrombocytes(grup:any,index:number):JSX.Element
    {
        if(grup.component=="Trombocite")
            return <p>{grup.bloodType} {grup.rh}: {grup.quantity}</p>
        else return null;    
    }
    redbloodcells(grup:any,index:number):JSX.Element
    {
        if(grup.component=="Globule rosii")
            return <p>{grup.bloodType} {grup.rh}: {grup.quantity}</p>
        else return null;
    }

    plasma(grup:any,index:number):JSX.Element
    {
        if(grup.component=="Plasma")
            return (<p>{grup.bloodType} {grup.rh}: {grup.quantity}</p>);
        else return null;
        
    }

    emergencyColumnFormat(fieldValue, row, rowIdx, colIdx) {
        // fieldValue is column value
        // row is whole row object
        // rowIdx is index of row
        // colIdx is index of column
        switch (fieldValue) {
            case ("CRITIC"):
                return "column-critical";
            case ("RIDICAT"):
                return "column-high";
            case ("MEDIU"):
                return "column-medium";
            case ("SCĂZUT"):
                return "column-low";
        }
        return "";
    }
    
    render() {
      if(this.props.webSocket!==null && !this.state.notificationRequested){
          this.props.webSocket.requestNotification((request: IEmployeeRequest) => {
            this.addRequest(request);
          });
          this.setState({notificationRequested:true});
        }
      return (
        <div className="all-requests">
        {/* <div>
             <NotificationBadge count={this.state.noNotifications} effect={Effect.SCALE}/>
        </div> */}
            <div className="column left-stock">
                <h1 id="stock-header"> Stoc sânge </h1>
                <Accordion className="stock-accordion">
                <AccordionItem className="stock-accordion-item">
                    <AccordionItemTitle className="stock-accordion-title">
                        <h3>Pungi de sânge</h3>
                    </AccordionItemTitle>
                    <AccordionItemBody className="stock-accordion-body">
                        {this.state.stock.map(this.bloodbags.bind(this))}
                    </AccordionItemBody>
                </AccordionItem>
                <AccordionItem className="stock-accordion-item">
                    <AccordionItemTitle className="stock-accordion-title">
                        <h3>Trombocite</h3>
                    </AccordionItemTitle>
                    <AccordionItemBody className="stock-accordion-body">
                    {this.state.stock.map(this.thrombocytes.bind(this))}
                    </AccordionItemBody>
                </AccordionItem>
                <AccordionItem className="stock-accordion-item">
                    <AccordionItemTitle className="stock-accordion-title">
                        <h3>Globule roșii</h3>
                    </AccordionItemTitle>
                    <AccordionItemBody className="stock-accordion-body">
                    {this.state.stock.map(this.redbloodcells.bind(this))}
                    </AccordionItemBody>
                </AccordionItem>
                <AccordionItem className="stock-accordion-item">
                    <AccordionItemTitle className="stock-accordion-title">
                        <h3>Plasma</h3>
                    </AccordionItemTitle>
                    <AccordionItemBody className="stock-accordion-body">
                        {this.state.stock.map(this.plasma.bind(this))}
                    </AccordionItemBody>
                </AccordionItem>
                </Accordion>
            </div>   

            <div className="column right-table">
            <Helmet>
                <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
            </Helmet>
            <BootstrapTable data={ this.state.requests} 
                            stripped={true}
                            hover={true}
                            search={ true }
                            >
            <TableHeaderColumn width={30} dataField='id' isKey={true}>Id</TableHeaderColumn>
            <TableHeaderColumn width={70} dataField='bloodType'>Grupă</TableHeaderColumn>
            <TableHeaderColumn width={100} dataField='rh'>Rh</TableHeaderColumn>
            <TableHeaderColumn width={130} dataField='component' >Componentă</TableHeaderColumn>
            <TableHeaderColumn width={180} dataField='dateOfRequest'>Data</TableHeaderColumn>
            <TableHeaderColumn width={120} dataField='emergencyLevel' columnClassName={this.emergencyColumnFormat}>Nivel urgență</TableHeaderColumn>
            <TableHeaderColumn width={90} dataField='quantityNeeded'>Necesar</TableHeaderColumn>
            <TableHeaderColumn width={80} dataField="button" dataAlign={'center'} editable={false} dataFormat={this.buttonAccept.bind(this)}>Acceptă</TableHeaderColumn>
            </BootstrapTable>
           <Alert stack={true} timeout={3000} />
                  
        </div>
      </div>
      );
    }
}

