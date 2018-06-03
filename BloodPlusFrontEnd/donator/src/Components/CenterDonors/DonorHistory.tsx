import * as React from 'react';
import {match,RouteComponentProps} from 'react-router';
import {Helmet} from 'react-helmet';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import { IDonorAnalisys } from '../../Models/IDonorAnalysis';
import { DonorsPersonalDataService } from '../../Services/DonorsPersonalDataService';

export interface DonorHistoryProps extends RouteComponentProps<any>{

}
interface DonorHistoryState{
    analysis:IDonorAnalisys[],
    showDetails:boolean,
    currentRow:IDonorAnalisys
}
export class DonorHistory extends React.Component<DonorHistoryProps,DonorHistoryState>
{
    constructor(props:DonorHistoryProps){
        super(props);
        this.state={
            analysis:[],
            showDetails:false,
            currentRow:{
                name:'',
                cnp:'',
                surname:'',
                birthDate:'',
                cityOfBirth:'',
                countyOfBirth:'',
                currentCity:'',
                currentCounty:'',
                age:0,
                weight:0,
                beatsPerMinute:0,
                bloodPressure:0,
                hadSurgery:'',
                personSex:'',
                pregnancyStatus:'',
                period:false,
                heartDisease:false,
                hypertension:false,
                kidneyDisease:false,
                mentalIlness:false,
                liverDisease:false,
                endocrineDisease:false,
                hepatitis:false,
                tuberculosis:false,
                pox:false,
                malaria:false,
                epilepsy:false,
                mindIlnesses:false,
                brucellosis:false,
                ulcer:false,
                diabetes:false,
                heartDiseases:false,
                skinDiseases:false,
                myopia:false,
                cancer:false,
                email:'',
                phoneNumber:'',
                otherPersonName:'',
                otherPersonSurname:'',
                registrationDate:''
            }
        }
    }

    componentDidMount(){
        const {match: {params}} = this.props;
        // console.log(params.cnp);
        DonorsPersonalDataService.getAnalysis(this.props.match.params.cnp).then((analysis:IDonorAnalisys[])=>{
            this.setState({
                analysis:analysis
            })
        })
    }

    onSelectRow(row){
        let analysisDetails:IDonorAnalisys={
            cnp:row.cnp,
            name:row.name,
            surname:row.surname,
            birthDate:row.birthDate,
            cityOfBirth:row.cityOfBirth,
            countyOfBirth:row.countyOfBirth,
            currentCity:row.currentCity,
            currentCounty:row.currentCounty,
            age:row.age,
            weight:row.weight,
            beatsPerMinute:row.beatsPerMinute,
            bloodPressure:row.blooPressure,
            hadSurgery:row.hadSurgery,
            personSex:row.personSex,
            pregnancyStatus:row.pregnancy,
            period:row.period,
            heartDisease:row.heartDisease,
            hypertension:row.hypertension,
            kidneyDisease:row.kidneyDisease,
            mentalIlness:row.mentalIlness,
            liverDisease:row.liverDisease,
            endocrineDisease:row.endocrineDisease,
            hepatitis:row.hepatitis,
            tuberculosis:row.tuberculosis,
            pox:row.pox,
            malaria:row.malaria,
            epilepsy:row.epilepsy,
            mindIlnesses:row.mindIlness,
            brucellosis:row.brucellosis,
            ulcer:row.ulcer,
            diabetes:row.diabetes,
            heartDiseases:row.heartDiseases,
            skinDiseases:row.skinDiseases,
            myopia:row.myopia,
            cancer:row.cancer,
            email:row.email,
            phoneNumber:row.phoneNumber,
            otherPersonName:row.otherPersonName,
            otherPersonSurname:row.otherPersonSurname,
            registrationDate:row.registrationDate
        }
        this.setState({currentRow:analysisDetails,showDetails:true});
    }
    closeDetailsInfo(){
        this.setState({showDetails:false})
    }
    render(){
        const options ={
            noDataText:"Nu exista analize",
            onRowDoubleClick:this.onSelectRow.bind(this),
        }
        return(
            <div id="stock-table">
                <Helmet>
                    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
                </Helmet> 
                <div><h3>Analizele donatorului cu CNP-ul: {this.props.match.params.cnp} </h3></div>
                <BootstrapTable
                    data={this.state.analysis}
                    striped
                    hover
                    search
                    options={options}
                    exportCSV
                >
                <TableHeaderColumn dataField="registrationdate" isKey={true}>Data analizei</TableHeaderColumn>
                </BootstrapTable>
            </div>    
        );
    }
}