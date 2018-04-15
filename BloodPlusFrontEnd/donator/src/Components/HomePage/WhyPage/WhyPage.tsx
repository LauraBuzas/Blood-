import * as React from 'react';
import './why-page.css';
import { VBox } from 'react-stylesheet'

export class WhyPage extends React.Component {
    render() {
        return(
            <div id="why-page">
                <h1>De ce <span id="why-logo">Blood+</span>?</h1>
                <table>
                    <thead>
                        <tr>
                            <td>
                                <VBox>
                                    <i className="fa fa-user-md"></i>
                                    <div className="outer">Cei mai buni medici din tara</div>
                                </VBox>
                                
                            </td>
                            <td>
                                <VBox>
                                    <i className="fa fa-bolt"></i>
                                    <div className="middle">Viteza si eficienta</div>
                                </VBox>
                            </td>
                            <td>
                                <VBox>
                                    <i className="fa fa-check-circle"></i>
                                    <div className="outer">Aprobat de guvernul roman</div>
                                </VBox>
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}