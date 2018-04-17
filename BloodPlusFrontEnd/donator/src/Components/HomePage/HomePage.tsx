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
                        infiniteLoop={true}
                        autoPlay={true}
                        dynamicHeight={true}
                        showThumbs={false}
                        showStatus={false}
                >

                    <CarouselPage 
                                image="assets/homePage/carousel/carousel1.jpg" 
                                legend="Dati mai jos pentru a afla cum puteti dona" type="register"/>
                    <CarouselPage 
                                image="assets/homePage/carousel/carousel2.jpg" 
                                legend="Donati acum" type="info"/>
                    <CarouselPage 
                                image="assets/homePage/carousel/carousel3.jpg" 
                                legend="Peste un miliard de oameni doneaza in fiecare zi" type="info"/>
                </Carousel>
                
                <div id="welcome-container">
                    <img id="logo" src="assets/logo/logo.png"></img>
                    <div  id="blood-description">
                        <h1 id="welcome-title">Bine ati venit la <span id="logo-text">Blood+</span></h1>
                        <p><span className="indent"></span>
                            Blood+ este o aplicatie superba facuta de niste studenti si mai superbi
                            bla bla bla bla bla bla bla bla bla blabla blabla bla 
                        </p>
                    </div>
                </div>
                <WhyPage />
                <FaqMenu />
            

            </div>
            
        );
    }
}