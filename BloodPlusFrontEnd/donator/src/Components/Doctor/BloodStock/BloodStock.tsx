
import React from "react";
import ReactDOM from "react-dom"

import './tablestyle.css'
import Collapsible from 'react-collapsible'
import {ICenterBloodQty} from '../../../Models/ICenterBloodQty'
import ReactTable from "react-table";
import "react-table/react-table.css";
let centerStock:ICenterBloodQty[];
        centerStock=[
        {
            center:'centru',
            location:'Cluj',
            quantity:10
        },{
          center:'centru2',
          location:'Cluj-Napoca',
          quantity:20
      }
      ]


export interface BloodStockProps{


}
interface BloodStockState{
    sangeint:string,
    trom:string,
    grosii:string,
    plas:string

}


export default class BloodStock extends React.Component<BloodStockProps,BloodStockState>{
        constructor(props){
            super(props);
            this.state={sangeint:'Sange integral +',trom:'Trombocite +',grosii:'Globule rosii +',plas:'Plasma +'};
        }

    render(){
        return(
             <div>
                  <h1 className='head'><hr/>Stoc sange <hr/></h1>

<ReactTable
          data={centerStock}
          columns={[
            {
              Header: "Centru",
              accessor: "center"
             
            },
            {
              Header: "Locatie",
              accessor: "location"
             
            },
            {
              Header: "Cantitate",
              accessor: "quantity"
             
            },
           
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
              
                  
                 </div>   
        )
    }
}
