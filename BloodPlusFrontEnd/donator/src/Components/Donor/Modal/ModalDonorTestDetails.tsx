import * as React from 'react'
import Modal from "react-responsive-modal";
import '../../Doctor/DoctorRequest/Modal/ModalDoctorRequestView.css';
import {Helmet} from 'react-helmet'
import {Label} from 'react-bootstrap'
import { IMedicalTestDetails } from '../../../Models/IMedicalTestDetails';
import { DonorService } from '../../../Services/DonorService';
import Alert from 'react-s-alert';


const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
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
      <div style={styles}>
        <Helmet>
            <link href="https://fonts.googleapis.com/css?family=Raleway:400,300,600,800,900" rel="stylesheet" type="text/css"/>
        </Helmet>    
        
        <Modal open={open} onClose={this.onCloseModal} large>
          <h2>Detalii analiză</h2>
          <hr className="invisibleHr"/>
          <div>
            <div>
                <Label className="infoLabel" bsStyle="default">Data analiza: {date+" "+time}</Label>
                <Label className="infoLabel" bsStyle="default">Nivel ALT: {this.props.currentTest.altLevel}</Label>
                <Label className="infoLabel" bsStyle="default">HTLV: {this.props.currentTest.HTLV}</Label>
                <Label className="infoLabel" bsStyle="default">Hepatita B: {this.props.currentTest.hepatitisB}</Label>
                <Label className="infoLabel" bsStyle="default">Hepatita C: {this.props.currentTest.hepatitisC}</Label>
                <Label className="infoLabel" bsStyle="default">HIV: {this.props.currentTest.hiv}</Label>
                <Label className="infoLabel" bsStyle="default">Sifilis: {this.props.currentTest.Sifilis}</Label>
                <Label className="infoLabel" bsStyle="default">Respins din alte cauze:{this.props.currentTest.rejectedOtherCauses}</Label>
                <Label className="infoLabel" bsStyle="default">Observatii:{this.props.currentTest.observations}</Label>
            </div>
         </div>
          
        </Modal>

      </div>
    );
  }
}

