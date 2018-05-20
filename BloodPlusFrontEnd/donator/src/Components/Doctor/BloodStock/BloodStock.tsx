
import React from "react";
import ReactDOM from "react-dom"
import './FormStyle.css'
import './tablestyle.css'
import Collapsible from 'react-collapsible'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
require('react-bootstrap-table-next/dist/react-bootstrap-table2.min.css');
const products = [ {id:1,name:'milk',price:15},{id:2,name:'coffee',price:55}];
const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true,
  //headerClasses: 'headerclass'
}, {
  dataField: 'price',
  text: 'Product Price',
  sort: true
}];

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


                <BootstrapTable id='tabel1' keyField='id' data={ products } columns={ columns } /><br/>
                  <table id='tabel1' >

                      <tr>
                          <th>Centru</th>
                          <th>Stoc sange</th>
                          <th>Cantitate</th>

                      </tr>
                    <tr >
                        <td>Centru1</td>
                        <td>
                            
                                
                               
                                <Collapsible trigger={this.state.sangeint } >
                                <label>Grupa:</label>
                                <select>
                                    <option>O I</option>
                                   
                                    <option>A II</option>
                                   
                                    <option>B III</option>
                                   
                                    <option>AB IV</option>
                                    
                                </select>
                                <label>  Rh:</label>
                                <select>
                                    <option>+</option>
                                   
                                    <option>-</option>
                                   
                                   
                                    
                                </select><br/>


                                </Collapsible>
                               <Collapsible trigger={this.state.trom}>
                               </Collapsible>
                                <div id='listcol'>
                              
                                 <Collapsible trigger={this.state.grosii}  >
                                 <label>Grupa:</label>
                                <select>
                                    <option>O I</option>
                                   
                                    <option>A II</option>
                                   
                                    <option>B III</option>
                                   
                                    <option>AB IV</option>
                                    
                                </select>
                                <label>  Rh:</label>
                                <select>
                                    <option>+</option>
                                   
                                    <option>-</option>
                                   
                                   
                                    
                                </select><br/>

                                </Collapsible>
                                </div>
                                <Collapsible trigger={this.state.plas}>
                                <label>Grupa:</label>
                                <select>
                                    <option>O I</option>
                                   
                                    <option>A II</option>
                                   
                                    <option>B III</option>
                                   
                                    <option>AB IV</option>
                                    
                                </select>
                                

                                </Collapsible>


                        </td>
                        <td>
                            </td>
                            
                        </tr>

                     
                      </table>
                 </div>   
        )
    }
}
