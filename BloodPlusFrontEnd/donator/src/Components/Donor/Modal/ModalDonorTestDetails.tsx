import * as React from 'react'
import Modal from "react-responsive-modal";
import {Helmet} from 'react-helmet'
import {Label} from 'react-bootstrap'
import { IMedicalTestDetails } from '../../../Models/IMedicalTestDetails';
import { DonorService } from '../../../Services/DonorService';
import Alert from 'react-s-alert';
import './modal-tests.css';

const styles = {
  fontFamily: "sans-serif"
};

export interface ModalDonorTestDetailsProps
{
    onClose:any
    currentTest:IMedicalTestDetails
}
interface ModalDonorTestDetailsState
{
    open:boolean,

}
export class ModalDonorTestDetails extends React.Component<ModalDonorTestDetailsProps,ModalDonorTestDetailsState>
{
    constructor(props:ModalDonorTestDetailsProps)
    {
        super(props);
        this.state=
            {
                open:true,
            }
    }

    // componentWillMount(){
    //     DonorService.getMedicalAnalysesById(this.props.id).then((analyse:IMedicalTestDetails) => {
    //         this.setState({
    //             currentTest:analyse
    //         });    
    //     },
    //         (error) => {
    //             Alert.error("A apărut o eroare la aducerea detalillor pentru analiza", {
    //                 position: 'top-right',
    //                 effect: 'jelly'
    //               });
    //         });
       
    // }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

 
  render() {
    const { open } = this.state;
    var dateTime=this.props.currentTest.date.split('T')
    var date = dateTime[0];
    var time = dateTime[1].split('.')[0];


    return (
      <div id="modal-medical-tests" style={styles}>
        <Helmet>
            <link href="https://fonts.googleapis.com/css?family=Raleway:400,300,600,800,900" rel="stylesheet" type="text/css"/>
        </Helmet>    
        
        <Modal dialogClassName="tests-modal" open={open} onClose={this.onCloseModal} large>
          <h2>Detalii analiză</h2>
          {/* <hr className="invisibleHr"/> */}
          <div>
            <div>
                <Label bsClass="info-label" bsStyle="info">Data analiza: {date+" "+time}</Label>
                <Label bsClass="info-label" bsStyle="info">Nivel ALT: {this.props.currentTest.altLevel}</Label>
                <Label bsClass="info-label" bsStyle="info">HTLV: {this.props.currentTest.HTLV}</Label>
                <Label bsClass="info-label" bsStyle="info">Hepatita B: {this.props.currentTest.hepatitisB}</Label>
                <Label bsClass="info-label" bsStyle="info">Hepatita C: {this.props.currentTest.hepatitisC}</Label>
                <Label bsClass="info-label" bsStyle="info">HIV: {this.props.currentTest.hiv}</Label>
                <Label bsClass="info-label" bsStyle="info">Sifilis: {this.props.currentTest.Sifilis}</Label>
                <Label bsClass="info-label" bsStyle="info">Respins din alte cauze:{this.props.currentTest.rejectedOtherCauses}</Label>
                <Label bsClass="info-label" bsStyle="info">Observatii:{this.props.currentTest.observations}</Label>
            </div>
         </div>
          
        </Modal>

      </div>
    );
  }
}

