import * as React from 'react';

export class Pane extends React.Component
{   
    constructor (props){
        super(props);
        console.log(props);
        this.state = {
            label: props.label,
            children: props.children,
        };
    }

    render()
    {
        return(
            <div>
                {this.state.children}
            </div>
        )
    }
}
import * as React from 'react';

export class Pane extends React.Component
{   
    constructor (props){
        super(props);
        console.log('Pane props:', props);
        this.state = {
            label: props.label,
            children: props.children,
        };
    }

    render()
    {
        return(
            <div>
                {this.state.children}
            </div>
        )
    }
}
