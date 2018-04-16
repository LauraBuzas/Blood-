import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './home-page.css';

export interface CarouselPageProps {
    image: string;
    legend: string;
    type: string;
}

export class CarouselPage extends React.Component<CarouselPageProps, any> {
    constructor(props: CarouselPageProps) {
        super(props);

    }

    render() {
        console.log(this.props.image);
        return (
            <div>   
                <img src={this.props.image} alt="image not found"/>
                { this.props.type === "register" ? 
                    <input type="button" id="register-button" value="Inscrie-te acum!" /> : null
                }
                <p className="legend">{ this.props.legend }</p>
            </div>
        );
    }
}