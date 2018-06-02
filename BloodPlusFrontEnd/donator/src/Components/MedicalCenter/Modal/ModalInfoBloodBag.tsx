import * as React from 'react'
import Modal from "react-responsive-modal";
import {Helmet} from 'react-helmet'
import {Label} from 'react-bootstrap'
import { IDonorBloodBagView } from '../../../Models/IDonorBloodBagView';
import './modal-info.css';

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };
export interface ModalInfoBloodBagProps
{
    onClose:any
    row:IDonorBloodBagView
}
interface ModalInfoBloodBagState
{
    open:boolean
}
export class ModalInfoBloodBag extends React.Component<ModalInfoBloodBagProps,ModalInfoBloodBagState>
{
    constructor(props:ModalInfoBloodBagProps)
    {
        super(props);
        this.state=
            {
                open:true
            }

    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

      onCloseModal = () => {
        this.setState({ open: false });
        this.props.onClose();
      };

      render() {
        const { open } = this.state;

    
        return (
          <div style={styles}>
            <Helmet>
                <link href="https://fonts.googleapis.com/css?family=Raleway:400,300,600,800,900" rel="stylesheet" type="text/css"/>
            </Helmet>    
            
            <Modal open={open} onClose={this.onCloseModal} large>
              <h2>Detalii cerere</h2>
              
              <div className="hboxWithSpace">
                <div className="labels">
                    <Label bsClass="info-label" bsStyle="info">CNP: {this.props.row.CNP}</Label>
                    <Label bsClass="info-label" bsStyle="info">Nume pacient: {this.props.row.fullName}</Label>
                    <Label bsClass="info-label" bsStyle="info">Grupa sange: {this.props.row.bloodType}</Label>
                    <Label bsClass="info-label" bsStyle="info">Rh: {this.props.row.rh}</Label>
                    
                </div>
            
                <div>
                    <Label bsClass="info-label bags" bsStyle="info">Pungi de sange:</Label>
                    <select className="selectLabel" multiple>
                        {this.props.row.bloodBags.map(bag =>(<option key={ bag.cnp } value={ bag.cnp }>{ bag.type+" "+bag.status+" "+bag.date}</option>)) }
                    </select>
                </div>
              
             </div>
              
            </Modal>
    
          </div>
        );
      }
}
