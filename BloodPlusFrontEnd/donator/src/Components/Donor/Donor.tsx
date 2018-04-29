import * as React from 'react';
import '../StickyNote/Note.css'
import { DonorService } from '../../Services/DonorService';
import { StickyNote } from '../StickyNote/StickyNote';
import {Helmet} from "react-helmet";


export interface DonorProps {
   
}

interface DonorState {

}

export class Donor extends React.Component<DonorProps, DonorState>
{
    constructor(props: DonorProps) {
        super(props);

    }

    render() {    
        return (
            <div> 
                <Helmet>
                    <link rel="canonical" href="http://fonts.googleapis.com/css?family=Reenie+Beanie:regular" />
                </Helmet>         
                <ul className="sticky-notes">
                    <StickyNote/>
                </ul>   
            </div>      
        );
    }
}