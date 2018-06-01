import * as React from 'react';
import {match,RouteComponentProps} from 'react-router';
export interface DonorHistoryProps extends RouteComponentProps<any>{

}
interface DonorHistoryState{

}
export class DonorHistory extends React.Component<DonorHistoryProps,DonorHistoryState>
{
    constructor(props:DonorHistoryProps){
        super(props);
    }

    componentDidMount(){
        const {match: {params}} = this.props;
        console.log(params.cnp);
    }
    render(){
        return(
            <div>
                Sunt in istoric
            </div>    
        );
    }
}