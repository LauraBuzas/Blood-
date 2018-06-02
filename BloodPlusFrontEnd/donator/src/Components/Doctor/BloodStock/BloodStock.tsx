
import React from "react";
import ReactDOM from "react-dom"
import {Helmet} from 'react-helmet'
import './tablestyle.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {ICenterBloodQty} from '../../../../src/Models/ICenterBloodQty'
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import './styles.css';
import {Header} from '../../Header/Header'
import {DoctorService} from '../../../Services/DoctorService'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

export interface BloodStockProps{


}
interface BloodStockState{
   centerstock:ICenterBloodQty[]

}

const groupType = {
  
  'O1':'O1',
  'A2': 'A2',
  'B3': 'B3',
  'AB4':'AB4'
};


const RhType = {
  
  'POZITIV':'POZITIV',
  'NEGATIV': 'NEGATIV',
  '-':'-'
 
};
const componentType = {
  'Sange neseparat': 'Sange neseparat',
  'Trombocite':'Trombocite',
  'Plasma': 'Plasma',
  'Globule rosii': 'Globule rosii',
  
};




export class BloodStock extends React.Component<BloodStockProps,BloodStockState>{
        constructor(props){
            super(props);
           this.state={centerstock:[]};
              this.renderShowsTotal=this.renderShowsTotal.bind(this);
        }



        componentDidMount(){
          DoctorService.getCentersStock().then((centers:ICenterBloodQty[])=>{
              this.setState({
                  centerstock:centers
              });
          });
          console.log("e aici")
      }
        renderShowsTotal(start, to, total) {
          return (
            <p style={ { color: 'blue' } }>
             
            </p>
          );
        }
    render(){

      const options = {
        noDataText: "Nu sunt centre disponibile.",
        page: 1,  // which page you want to show as default
        sizePerPageList: [ {
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
          text: 'All', value: this.state.centerstock.length} 
        ], // you can change the dropdown list for size per page
        sizePerPage: 5,  // which size per page you want to locate as default
        pageStartIndex: 1, // where to start counting the pages
        paginationSize: 3,  // the pagination bar size.
        prePage: 'Inapoi', // Previous page button text
        nextPage: 'Inainte', // Next page button text
        firstPage: 'Prima', // First page button text
        lastPage: 'Ultima', // Last page button text
        paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
        paginationPosition: 'top'  ,// default is bottom, top and both is all available
        hideSizePerPage: true,// > You can hide the dropdown for sizePerPage
        alwaysShowAllBtns: true // Always show next and previous button
        // withFirstAndLast: false > Hide the going to First and Last page button
    }
        return(
             <div>
              
                  
                 

                 <Helmet>
                    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
                   
                </Helmet>
                <h1 className='head2'><hr/>Sange disponibil in centre <hr/></h1>
                <BootstrapTable
                
                    data={this.state.centerstock}
                    striped
                    hover
                    pagination={true}
                    options={options}
                   
                >
                
                    <TableHeaderColumn width="8%" dataField="CenterName" isKey={true}>Centru</TableHeaderColumn>
                    <TableHeaderColumn dataField="Address" filter={ { type: 'TextFilter', delay: 200 } }>Locatie</TableHeaderColumn>
                    <TableHeaderColumn width="6%" dataField="Component"
                    
                    filter={ { type: 'SelectFilter', options: componentType,selectText:'Alege',condition:'eq' } }
                    >Componenta</TableHeaderColumn>
                    <TableHeaderColumn width="5%" dataField="Group"
                     filter={ { type: 'SelectFilter', options: groupType,selectText:'Alege',condition:'eq' } }
                    
                    >Grupa</TableHeaderColumn>
                    <TableHeaderColumn width="5%" dataField="Rh"
                     filter={ { type: 'SelectFilter', options: RhType,selectText:'Alege' } }
                    
                    >Rh</TableHeaderColumn>
                    <TableHeaderColumn width="5%" dataField="Quantity">Cantitate</TableHeaderColumn>
                </BootstrapTable>
          
                  
                 </div>   
        )
    }
}