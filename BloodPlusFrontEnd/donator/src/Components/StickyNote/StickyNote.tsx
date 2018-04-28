import * as React from 'react';
import '../StickyNote/Note.css'
import { DonorService } from '../../Services/DonorService';
export interface StickyNoteProps {
   
}

interface StickyNoteState {
    text:string
}

export class StickyNote extends React.Component<StickyNoteProps, StickyNoteState>
{
    constructor(props: StickyNoteProps) {
        super(props);

        this.state =
            {         
                text:''
            }
        this.getNextDonation=this.getNextDonation.bind(this);
    }


    getNextDonation() {
        
        DonorService.getNextDonation().then((resp) => {
            this.setState({text:resp.data});
        },
            (error) => {
                this.setState({text:error.message});
            });
    }

    componentDidMount()
    {
        this.getNextDonation();
        
    }

    render() {    
        return (          
            <li className="note">                           
                <a className="link-note" href="#">
                    <p>{this.state.text}</p>
                </a>
            </li>         
        );
    }
}