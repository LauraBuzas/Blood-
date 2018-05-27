import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './home-page.css';
import { CarouselPage } from './CarouselPage';
import { FaqMenu } from './FAQMenu/FaqMenu';
import { WhyPage } from './WhyPage/WhyPage';
import { Footer } from '../Footer/Footer';

export class HomePage extends React.Component {
    render() {
        return (
            <div className="homePage">
                <Carousel 
                        className="main-carousel"
                        infiniteLoop={true}
                        autoPlay={true}
                        dynamicHeight={true}
                        showThumbs={false}
                        showStatus={false}
                >

                    <CarouselPage 
                                image="assets/homePage/carousel/carousel1.jpg" 
                                legend="Dati mai jos pentru a afla cum puteti dona"/>
                    <CarouselPage 
                                image="assets/homePage/carousel/donare-sange-1.jpg" 
                                legend="Donati acum"/>
                    <CarouselPage 
                                image="assets/homePage/carousel/carousel3.jpg" 
                                legend="Romania are nevoie de un numar dublu de donatori!"/>
                </Carousel>
                
                <div id="welcome-container">
                    <img id="logo" src="assets/logo/logo.png"></img>
                    <div  id="blood-description">
                        <h1 id="welcome-title">Bine ati venit la <span id="logo-text">Blood+</span></h1>
                        <p><span className="indent"></span>
                            Blood+ este o aplicatie realizata de o echipa de studenti din anul 2 de la Facultatea
                            de Matematica si Informatica, Universitatea Babes Bolyai Cluj-Napoca.
                        </p>
                    </div>
                </div>
                <WhyPage />
                <FaqMenu />
            
            </div>
            
        );
    }
}