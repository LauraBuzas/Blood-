import * as React from 'react';
import Modal from 'react-responsive-modal';
import {Helmet} from 'react-helmet';
import {Label} from 'react-bootstrap';
import { IDonorAnalisys } from '../../../Models/IDonorAnalysis';

const styles={
    fontFamily:'sans-serif',
    textAlign:'center'
};

export interface ModalDonorRegistrationForDonationProps{
    onClose:any,
    row:IDonorAnalisys
}
interface ModalDonorRegistrationForDonationState{
    open:boolean
}
export class ModalDonorRegistrationForDonation extends React.Component<ModalDonorRegistrationForDonationProps,ModalDonorRegistrationForDonationState>
{
    constructor(props:ModalDonorRegistrationForDonationProps){
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
              <h2>Detalii despre înregistrarea pentru donare</h2>
              
              <div className="hboxWithSpace">
                <div className="labels">
                    <Label bsClass="info-label" bsStyle="info">Nume: {this.props.row.name}</Label>
                    <Label bsClass="info-label" bsStyle="info">Prenume: {this.props.row.surname}</Label>
                    <Label bsClass="info-label" bsStyle="info">CNP: {this.props.row.cnp}</Label>
                    <Label bsClass="info-label" bsStyle="info">Data nașterii: {this.props.row.birthDate}</Label>
                    <Label bsClass="info-label" bsStyle="info">Orașul nașterii: {this.props.row.cityOfBirth}</Label>
                    <Label bsClass="info-label" bsStyle="info">Județul nașterii: {this.props.row.countyOfBirth}</Label>
                    <Label bsClass="info-label" bsStyle="info">Orașul de reședință: {this.props.row.currentCity}</Label>
                    <Label bsClass="info-label" bsStyle="info">Județul de reședință : {this.props.row.currentCounty}</Label>
                    <Label bsClass="info-label" bsStyle="info">Număr de telefon : {this.props.row.phoneNumber}</Label>
                    <Label bsClass="info-label" bsStyle="info">Email: {this.props.row.email}</Label>
                </div>
            
                <div>
                    <Label bsClass="info-label" bsStyle="info">Vârstă: {this.props.row.age}</Label>
                    <Label bsClass="info-label" bsStyle="info">Greutate: {this.props.row.weight}</Label>
                    <Label bsClass="info-label" bsStyle="info">Puls: {this.props.row.beatsPerMinute}</Label>
                    <Label bsClass="info-label" bsStyle="info">Tensiune arterială sistolică: {this.props.row.bloodPressure}</Label>
                    <Label bsClass="info-label" bsStyle="info">Intervenții chirugicale: {this.props.row.hadSurgery}</Label>
                    <Label bsClass="info-label" bsStyle="info">Puls: {this.props.row.beatsPerMinute}</Label>
                    <Label bsClass="info-label" bsStyle="info">Sex: {this.props.row.personSex}</Label>
                    <Label bsClass="info-label" bsStyle="info">Sarcină: {this.props.row.pregnancyStatus}</Label>
                    <Label bsClass="info-label" bsStyle="info">În perioada menstruală: {this.props.row.period.toString()}</Label>
                </div>
              
                <div>
                    <Label bsClass="info-label" bsStyle="info">Hipertensiune: {this.props.row.hypertension.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">Boli de inimă: {this.props.row.heartDisease.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">Boli renale: {this.props.row.kidneyDisease.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">Boli psihice: {this.props.row.mentalIlness.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">Boli hepatice: {this.props.row.liverDisease.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">Boli endocrine: {this.props.row.endocrineDisease.toString()}</Label>
                </div>

                <div>
                    <Label bsClass="info-label" bsStyle="info">Hepatita: {this.props.row.hepatitis.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">TBC: {this.props.row.tuberculosis.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">Epilepsie și alte boli neurologice: {this.props.row.epilepsy.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">Bruceloză: {this.props.row.brucellosis.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">Ulcer: {this.props.row.ulcer.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">Diabet zaharat: {this.props.row.diabetes.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">Boli de inimă: {this.props.row.heartDiseases.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">Boli de piele: {this.props.row.skinDiseases.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">Miopie: {this.props.row.myopia.toString()}</Label>
                    <Label bsClass="info-label" bsStyle="info">Cancer: {this.props.row.cancer.toString()}</Label>

                </div>

                <div>
                    <Label bsClass="info-label" bsStyle="info">Numele personei pentru care se donează: {this.props.row.otherPersonSurname}</Label>
                    <Label bsClass="info-label" bsStyle="info">Prenumele persoanei pentru care se donează: {this.props.row.otherPersonName}</Label>
                </div>
             </div>
            </Modal>
    
          </div>
            
        );
    }
}
