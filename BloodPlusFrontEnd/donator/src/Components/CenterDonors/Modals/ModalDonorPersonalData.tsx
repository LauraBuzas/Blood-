import * as React from 'react';
import Modal from 'react-responsive-modal';
import {Helmet} from 'react-helmet';
import {Label} from 'react-bootstrap';
import { IDonorInfoGet } from '../../../Models/IDonorInfoGet';

const styles={
    fontFamily:'sans-serif',
    textAlign:'center'
};

export interface ModalDonorPersonalDataProps{
    onClose:any,
    row:IDonorInfoGet
}
interface ModalDonorPersonalDataState{
    open:boolean
}
export class ModalDonorPersonalData extends React.Component<ModalDonorPersonalDataProps,ModalDonorPersonalDataState>
{
    constructor(props:ModalDonorPersonalDataProps){
        super(props);
        this.state={
            open:true
        }
    }

    onOpenModal =()=>{
        this.setState({open:true});
    };

    onCloseModal=()=>{
        this.setState({open:false});
        this.props.onClose();
    };

    render(){
        const {open}=this.state;
        return(
            <div style={styles}>
            <Helmet>
            <link href="https://fonts.googleapis.com/css?family=Raleway:400,300,600,800,900" rel="stylesheet" type="text/css"/>
            </Helmet>    
            
            <Modal open={open} onClose={this.onCloseModal} large>
              <h2>Detalii cerere</h2>
              
              <div className="hboxWithSpace">
                <div className="labels">
                    <Label bsClass="info-label" bsStyle="info">Nume: {this.props.row.lastname}</Label>
                    <Label bsClass="info-label" bsStyle="info">Prenume: {this.props.row.firstname}</Label>
                    <Label bsClass="info-label" bsStyle="info">CNP: {this.props.row.cnp}</Label>
                    
                </div>
            
                <div>
                    <Label bsClass="info-label" bsStyle="info">Oras: {this.props.row.city}</Label>
                    <Label bsClass="info-label" bsStyle="info">Judet: {this.props.row.county}</Label>
                    <Label bsClass="info-label" bsStyle="info">Strada: {this.props.row.street}</Label>
                    <Label bsClass="info-label" bsStyle="info">Numar: {this.props.row.number}</Label>
                </div>
              
             </div>
              
            </Modal>
    
          </div>
            
        );
    }
}

