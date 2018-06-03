import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './home-page.css';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import cookie from 'react-cookies';

=======
import {Redirect} from 'react-router'
>>>>>>> development
export interface CarouselPageProps {
    image: string;
    legend: string;
}

export class CarouselPage extends React.Component<CarouselPageProps, any> {
    constructor(props: CarouselPageProps) {
        super(props);

    }


    render() {
<<<<<<< HEAD
        //console.log(this.props.image);
        let loggedIn = cookie.load('.AspNetCore.Identity.Application');
        let role = localStorage.getItem("role");
        

=======
        console.log(this.props.image);
>>>>>>> development
        return (
            <div className="carousel-page">   
                <img src={this.props.image} alt="image not found"/>
                
<<<<<<< HEAD
                {!(loggedIn && role) ? <Link to="/register" id="register-button">Vreau să donez!</Link> : null}
=======
                <Link to="/donationform" id="register-button">Vreau sa donez!</Link>
>>>>>>> development
                <p className="legend">{ this.props.legend }</p>
            </div>
        );
    }
}