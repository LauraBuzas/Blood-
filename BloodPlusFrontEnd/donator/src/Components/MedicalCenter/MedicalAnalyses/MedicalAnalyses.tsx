import * as React from 'react'
import { VBox } from 'react-stylesheet';
import { TextField } from '../../../utils/TextField'
import { IAddMedicalTest } from '../../../Models/IAddMedicalTest';
import update from 'react-addons-update';
import { Button1 } from '../../../utils/Button1';
import { AccountService } from '../../../Services/AccountServices';
import { EmployeeService } from '../../../Services/EmployeeService';
import Select from 'react-select';
import { ISelection } from '../../../Models/ISelection';
import Alert from 'react-s-alert';
import { DonorService } from '../../../Services/DonorService';
import { IDonorView } from '../../../Models/IDonorView';

import './medical-analyses.css';

interface MedicalAnalysesProps{}
interface MedicalAnalysesState {
    analysis:IAddMedicalTest
    selectedDonor:ISelection;
    optionsDonors:ISelection[];
    analysisAdded:boolean;
}
export class CenterMedicalAnalyses extends React.Component<MedicalAnalysesProps, MedicalAnalysesState>
{
    constructor(props:MedicalAnalysesProps){
        super(props);
        
        this.state=
        {
            analysis:{
                CNP:"",
                Sifilis:false,
                RejectedOtherCauses:false,
                Observations:"",
                HTLV:false,
                HIV:false,
                HepatitisB:false,
                HepatitisC:false,
                ALTLevel:false
            },
            selectedDonor:undefined,
            optionsDonors:[],
            analysisAdded:false

        }
    }

    componentWillMount()
{
    EmployeeService.getDonors().then((donors:IDonorView[]) => {
        if(donors!=null)
        {
            let optionsDonors:ISelection[];
            optionsDonors=[]
            donors.forEach(element => {
                let option:ISelection;
                option={
                    value:element.cnp,
                    label:element.cnp+" ( "+element.firstname+" "+ element.lastname+ ")"
                }
                optionsDonors.push(option);
                
            });
            this.setState({
                optionsDonors:optionsDonors
            })    
        }  
    },
        (error) => {
            Alert.error("A apărut o eroare la aducerea donatorilor", {
                position: 'top-right',
                effect: 'jelly'
              });
        });

}

    // handleCnpChange(event: any) {
    //     this.setState({
    //         analysis: update(this.state.analysis, { CNP: { $set: event.target.value } })
    //     });
    // }

    handleHIVCheckboxClick(event:any){
        this.setState({
            analysis: update(this.state.analysis, { HIV: { $set: event.target.checked } })
        });
    }

    handleHepatitisBCheckboxClick(event:any){
        this.setState({
            analysis: update(this.state.analysis, { Sifilis: { $set: event.target.checked } })
        });
    }

    handleHepatitisCCheckboxClick(event:any){
        this.setState({
            analysis: update(this.state.analysis, { Sifilis: { $set: event.target.checked } })
        });
    }

    handleSifilisCheckboxClick(event:any){
        this.setState({
            analysis: update(this.state.analysis, { Sifilis: { $set: event.target.checked } })
        });
    }

    handleHTLVCheckboxClick(event:any){
        this.setState({
            analysis: update(this.state.analysis, { Sifilis: { $set: event.target.checked } })
        });
    }

    handleALTLevelCheckboxClick(event:any){
        this.setState({
            analysis: update(this.state.analysis, { ALTLevel: { $set: event.target.checked } })
        });
    }

    handleRejectedCheckboxClick(event:any){
        this.setState({
            analysis: update(this.state.analysis, { RejectedOtherCauses: { $set: event.target.checked } })
        });
    }

    handleChangeDonor = (selectedDonor) => {
       
        if(selectedDonor!=null)
        {
            this.setState({ selectedDonor , analysis: update(this.state.analysis, { CNP: { $set: selectedDonor.value } })});
        }
        else
        {
            this.setState({selectedDonor:{value:undefined,label:''} , analysis: update(this.state.analysis, { CNP: { $set: "" } })})
        }
      }

    addAnalyses(){
        this.setState({
            analysis: update(this.state.analysis, { Observations: { $set: (this.refs.observationTextArea as HTMLTextAreaElement).value } })
        },()=>{
            EmployeeService.addAnalysis(this.state.analysis).then((resp:any)=>{ 
                Alert.success("Analize adaugate cu succes.", {
                position: 'top-right',
                effect: 'jelly'
              });
              this.clearFields();
            }).catch((resp:any)=>{
                Alert.error(resp.data, {
                    position: 'top-right',
                    effect: 'jelly'
                  });
                  this.clearFields();
            });
        });
    }

    clearFields(){
        (this.refs.HIV as HTMLInputElement).checked = false;
        (this.refs.HepatitisB as HTMLInputElement).checked = false;
        (this.refs.HepatitisC as HTMLInputElement).checked = false;
        (this.refs.Sifilis as HTMLInputElement).checked = false;
        (this.refs.HTLV as HTMLInputElement).checked = false;
        (this.refs.ALTLevel as HTMLInputElement).checked = false;
        (this.refs.Rejected as HTMLInputElement).checked = false;
        (this.refs.observationTextArea as HTMLTextAreaElement).value = "";
        this.setState({selectedDonor:undefined, analysis:{
            CNP:"",
            Sifilis:false,
            RejectedOtherCauses:false,
            Observations:"",
            HTLV:false,
            HIV:false,
            HepatitisB:false,
            HepatitisC:false,
            ALTLevel:false
        }});
        
    }

    render(){
        const { selectedDonor } = this.state;
        const valuePacient = selectedDonor && selectedDonor.value;

        return(
            <VBox className="analyses-container">
                
                {/* <TextField text="CNP" type="text" onChangeFunction={(event) => this.handleCnpChange(event)} /> */}
                <Select
                    name="dropdown-pacient"
                    creatable={false}
                    placeholder='Nume sau CNP donator...'
                    onChange={this.handleChangeDonor}
                    options={this.state.optionsDonors}
                    value={selectedDonor}
                    
                />

                <label>
                    <div className="nice-check-box">
                        <input ref="HIV" id="nice-check-1" type="checkbox" value="HIV" onChange={(event) => this.handleHIVCheckboxClick(event)}/>
                        <label htmlFor="nice-check-1"></label>
                    </div>
                    SIDA
                </label>

                <label>
                    <div className="nice-check-box">
                        <input ref="HepatitisB" id="nice-check-2" type="checkbox" value="HepatitisB" onChange={(event) => this.handleHepatitisBCheckboxClick(event)}/>
                        <label htmlFor="nice-check-2"></label>
                    </div>
                    Hepatita B
                </label>

                <label>
                    <div className="nice-check-box">
                        <input ref="HepatitisC" id="nice-check-3" type="checkbox" value="HepatitisC" onChange={(event) => this.handleHepatitisCCheckboxClick(event)}/>
                        <label htmlFor="nice-check-3"></label>
                    </div>
                    Hepatita C
                </label>

                <label>
                    <div className="nice-check-box">
                        <input ref="Sifilis" id="nice-check-4" type="checkbox" value="Sifilis" onChange={(event) => this.handleSifilisCheckboxClick(event)}/>
                        <label htmlFor="nice-check-4"></label>
                    </div>
                    Sifilis
                </label>

                <label>
                    <div className="nice-check-box">
                        <input ref="HTLV" id="nice-check-5" type="checkbox" value="HTLV" onChange={(event) => this.handleHTLVCheckboxClick(event)}/>
                        <label htmlFor="nice-check-5"></label>
                    </div>
                    HTLV
                </label>

                <label>
                    <div className="nice-check-box">
                        <input ref="ALTLevel" id="nice-check-6" type="checkbox" value="ALTLevel" onChange={(event) => this.handleALTLevelCheckboxClick(event)}/>
                        <label htmlFor="nice-check-6"></label>
                    </div>
                    Nivel ALT
                </label>

                <label>
                    <div className="nice-check-box">
                        <input ref="Rejected" id="nice-check-7" type="checkbox" value="Rejected" onChange={(event) => this.handleSifilisCheckboxClick(event)}/>
                        <label htmlFor="nice-check-7"></label>
                    </div>
                    Respins din alte cauze
                </label>
                
                {/* <label><input type="checkbox" value="HIV" onChange={(event) => this.handleHIVCheckboxClick(event)}/>SIDA</label>
                <label><input type="checkbox" value="HepatitisB" onChange={(event) => this.handleHepatitisBCheckboxClick(event)}/>Hepatita B</label>
                <label><input type="checkbox" value="HepatitisC" onChange={(event) => this.handleHepatitisCCheckboxClick(event)}/>Hepatita C</label>
                <label><input type="checkbox" value="Sifilis" onChange={(event) => this.handleSifilisCheckboxClick(event)}/>Sifilis</label>
                <label><input type="checkbox" value="HTLV" onChange={(event) => this.handleHTLVCheckboxClick(event)}/>HTLV</label>
                <label><input type="checkbox" value="ALTLevel" onChange={(event) => this.handleALTLevelCheckboxClick(event)}/>Nivel ALT</label>
                <label><input type="checkbox" value="Rejected" onChange={(event) => this.handleSifilisCheckboxClick(event)}/>Respins din alte cauze</label> */}
                <textarea  rows={4} ref="observationTextArea"/>
                <button className="generic-button" onClick={()=>this.addAnalyses()}>Salvati analizele</button>
                <Alert stack={true} timeout={5000}/>
            
            </VBox>
        );
    }
}