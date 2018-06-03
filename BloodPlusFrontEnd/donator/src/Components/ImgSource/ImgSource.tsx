import * as React from 'react'
import './img-source.css';

interface ImgSrcProps {
    source: string;
    white: boolean;
}

export class ImgSource extends React.Component<ImgSrcProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={"img-src" + (this.props.white? " img-white": "")}>
                {"sursa imagine: " + this.props.source}
            </div>
        );
    }
}