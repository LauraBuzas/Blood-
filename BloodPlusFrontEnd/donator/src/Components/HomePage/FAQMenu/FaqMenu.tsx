import * as React from 'react';
import './faq-menu.css';
import {QuestionContainer} from '../QuestionContainer/QuestionContainer';

export class FaqMenu extends React.Component {

    render() {
        return(
            <div id="faq-menu">
                <h2>Intrebari frecvente</h2>
                <QuestionContainer question="Cum pot să donez sânge?"
                answer={"Prima dată accesați link-ul din partea de sus a paginii. "+
                "După ce aveți cont, vă prezentați la un centru de donare unde veți primi mai multe informații."}/>

                <QuestionContainer question="De ce să donez sânge?" 
                answer={"În România, mii de oameni au nevoie de sânge și un procent "+
                "foarte mic din populație donează sânge regular. La o donare primiți tichete de masă în valoare de "+
                "70 de lei, bani pe care îi puteți păstra sau dona. În plus, există și beneficii de sănătate " +
                "cum ar fi creșterea duratei de viață sau creșterea imunității. Puteți să donați și pentru o persoană anume care are nevoie."}/>

                <QuestionContainer question="Ce riscuri există în donarea de sânge?" 
                answer={"Orice risc va fi prevenit de personalul centrului de donare unde doriți să mergeți. " + 
                "Aceștia se vor asigura că nu vă pun în pericol și că procesul decurge bine."}/>

                <QuestionContainer question="Pot să donez dacă sunt racit/racită sau am febră?" 
                answer="Când donați trebuie să nu aveți febră sau să suferiți de vreo boală."/>
                
                <QuestionContainer question="Cât de des pot să donez sânge?" 
                answer="Bărbații pot dona de 4-5 ori pe an iar femeile de 3 ori pe an."/>


            </div>
        );
    }
}