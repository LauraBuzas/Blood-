import * as React from 'react'
import Modal from "react-responsive-modal";
import { IDoctorRequestView } from '../../../../Models/IDoctorRequestView';
import './ModalDoctorRequestView.css'
import {Helmet} from 'react-helmet'
import {Label} from 'react-bootstrap'


const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export interface ModalDoctorRequestViewProps
{
    onClose:any
    row:IDoctorRequestView
}
interface ModalDoctorRequestViewState
{
    open:boolean,
   
}
export class ModalDoctorRequestView extends React.Component<ModalDoctorRequestViewProps,ModalDoctorRequestViewState>
{
    constructor(props:ModalDoctorRequestViewProps)
    {
        super(props);
        this.state=
            {
                open:true
            }

    }

    componentDidMount(){
        this.progressCircle()
    }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  progressCircle()
  {
    var ProgressBar = require('progressbar.js')
    var bar = new ProgressBar.Circle('#container', {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
          
        from: { color: '#2ecc58', width: 1 },
        to: { color: '#aa2508', width: 4 },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
      
          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('0%');
          } else {
            circle.setText(value+'%');
          }
      
        }
      });
      bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      bar.text.style.fontSize = '2rem';
      
      bar.animate(this.props.row.currentQuantity/this.props.row.requestedQuantity);
    
  }
 
  render() {
    const { open } = this.state;
    var currentQuantity=this.props.row.currentQuantity;
    var requiredQuantity=this.props.row.requestedQuantity;

    var style = "";
    if(this.props.row.emergencyLevel=="SCAZUT")
        style = "info";
    if(this.props.row.emergencyLevel=="MEDIU")
        style = "success";
    if(this.props.row.emergencyLevel=="RIDICAT")
        style = "warning";
    if(this.props.row.emergencyLevel=="CRITIC")
        style = "danger";

    var dateTime=this.props.row.dateOfRequest.split('T')
    var date = dateTime[0];
    var time = dateTime[1].split('.')[0];

    return (
      <div style={styles}>
        <Helmet>
            <link href="https://fonts.googleapis.com/css?family=Raleway:400,300,600,800,900" rel="stylesheet" type="text/css"/>
        </Helmet>    
        
        <Modal dialogClassName="request-modal" open={open} onClose={this.onCloseModal} large>
          <h2>Detalii cerere</h2>
          <hr className="invisibleHr"/>
          <div className="hboxWithSpace">
          <div className="labels">
            <Label className="infoLabel" bsStyle="default">Data cererii: {date + " " + time}</Label>
            <Label className="infoLabel" bsStyle="default">CNP: {this.props.row.CNP}</Label>
            <Label className="infoLabel" bsStyle="default">Nume pacient: {this.props.row.fullName}</Label>
            <Label className="infoLabel" bsStyle="default">Componenta ceruta: {this.props.row.requestedComponent}</Label>
            <Label className="infoLabel" bsStyle="default">Grupa sange: {this.props.row.bloodType}</Label>
            <Label className="infoLabel" bsStyle="default">Rh: {this.props.row.rh}</Label>
            <div>
            <Label className="emergencyLabel " bsStyle="default">Nivelul urgentei: </Label>
            <Label className="emergencyLevel" bsStyle={style}>{this.props.row.emergencyLevel}</Label>
            </div>
            </div>

         <div id="container"></div>
         </div>
          
        </Modal>

      </div>
    );
  }
}

