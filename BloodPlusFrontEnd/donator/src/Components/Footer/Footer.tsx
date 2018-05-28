import * as React from 'react'
import './footer.css';
import {Link, Router} from 'react-router-dom';

export class Footer extends React.Component {
    //calculates the margin necessary to placa the footer at the bottom of the page
    placeAtBottom() {
        // console.log(window.outerHeight);
        // console.log(window.innerHeight);
    }

    scrollUp() { // scroll animation
        let scroll = window.setInterval(function() {
            var pos = window.pageYOffset;
            if (pos > 90) {
                window.scrollTo(0, pos - 30); // how far to scroll on each step
            } else if (pos > 0) {
                window.scrollTo(0, pos - 10);
            } else {
                window.clearInterval(scroll);
            }
        }, 16);
    }

    render() {
        this.placeAtBottom();
        return(
            <div id="footer">
                <button onClick={this.scrollUp} className="footer-button up-button" id="up-button">
                    <div><i className="fa fa-caret-up" /></div>
                </button>
                
                <a href="/" className="footer-button" id="up-button">
                    Acasă
                </a>
            
                

                <div id="contact">
                    <div id="contact-title">
                        Contact         
                    </div>
                    <div>
                        e-mail: bloodplus.contact@gmail.com
                    </div>
                </div>

                <div id="copyright-text">
                    Blood+ copyright © 2018 Universitatea Babeș Bolyai Cluj-Napoca.
                </div>
            </div>
        );
    }
}