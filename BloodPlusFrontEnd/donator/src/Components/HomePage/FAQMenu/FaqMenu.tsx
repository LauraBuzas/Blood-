import * as React from 'react';
import './faq-menu.css';
import {QuestionContainer} from '../QuestionContainer/QuestionContainer';

export class FaqMenu extends React.Component {

    render() {
        return(
            <div id="faq-menu">
                <h2>Intrebari frecvente</h2>
                <QuestionContainer question="Cum pot sa donez sange?"
                answer={"Prima data accesezi link-ul din partea de sus a paginii. "+
                "Dupa ce ai cont, te prezinti la un centru de donare unde vei primi mai multe informatii."}/>

                <QuestionContainer question="De ce sa donez sange?" 
                answer={"In Romania, foarte multi oameni (#stats) au nevoie de sange si un procent "+
                "foarte mic din populatie doneaza sange regular. La o donare primiti tichete de masa in valoare de "+
                "70 de lei, bani pe care ii puteti pastra sau dona. In plus, exista si beneficii de sanatate pe care le puteti " +
                "gasi aici: <link>. Puteti sa donati si pentru o persoana anume care are nevoie."}/>

                <QuestionContainer question="Ce riscuri exista in donarea de sange?" 
                answer={"Orice risc va fi prevenit de personalul centrului de donare unde doriti sa mergeti. " + 
                "Acestia se vor asigura ca nu va pun in pericol si ca procesul decurge bine."}/>

                <QuestionContainer question="Pot sa donez daca sunt racit/racita sau am febra?" 
                answer="Cand donezi trebuie sa nu ai febra sau sa suferi de vreo boala."/>
                
                <QuestionContainer question="Cat de des pot sa donez sange?" 
                answer="Barbatii pot dona de 4-5 ori pe an iar femeile de 3 ori pe an."/>


            </div>
        );
    }
}