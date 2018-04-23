import * as React from 'react';
import './question-container.css';

interface QuestionContainerState {
    shown: boolean;
}

interface QuestionContainerProps {
    question: string;
    answer: string;
}

export class QuestionContainer extends React.Component<QuestionContainerProps, QuestionContainerState> {
    constructor(props) {
        super(props);
        this.state = {
            shown: false
        }
    }

    showAnswer = () => {
        this.setState(
            {shown: !this.state.shown}
        );
        
    }
    
    render() {
        return (
            <div className="question-container">
                {/* <i className={this.state.shown? "caret-square-down" : "minus-square"} /> */}
                <button onClick={this.showAnswer} className="question">
                    <i className={this.state.shown? "fa fa-caret-down" : "fa fa-minus"} />
                    {this.props.question}
                </button>
                <div className={this.state.shown? "answer-visible" : "answer-hidden"}>
                    <p>{this.props.answer}</p>
                </div>
                
            </div>
        );
    }
}