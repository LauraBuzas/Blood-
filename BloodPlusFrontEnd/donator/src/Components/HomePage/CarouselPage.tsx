import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './home-page.css';
import { Link } from 'react-router-dom';

export interface CarouselPageProps {
    image: string;
    legend: string;
}

export class CarouselPage extends React.Component<CarouselPageProps, any> {
    constructor(props: CarouselPageProps) {
        super(props);

    }


    render() {
        //console.log(this.props.image);
        return (
            <div className="carousel-page">   
                <img src={this.props.image} alt="nu există imagine"/>
                
                <Link to="/register" id="register-button">Vreau să donez!</Link>
                <p className="legend">{ this.props.legend }</p>
            </div>
        );
    }
}