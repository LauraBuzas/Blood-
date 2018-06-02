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
            this.setState({selectedDonor:{value:undefined,label:''} , analysis: update(this.state.analysis, { CNP: { $set: selectedDonor.value } })})
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
            <div>
                <VBox className="vboxPosition">
                    {/* <TextField text="CNP" type="text" onChangeFunction={(event) => this.handleCnpChange(event)} /> */}
                    <Select
                        name="dropdown-pacient"
                        creatable={false}
                        placeholder='Nume sau CNP donator...'
                        onChange={this.handleChangeDonor}
                        options={this.state.optionsDonors}
                        value={selectedDonor}
                        
                    />

                    <label><input ref="HIV" type="checkbox" value="HIV" onChange={(event) => this.handleHIVCheckboxClick(event)}/>SIDA</label>
                    <label><input ref="HepatitisB" type="checkbox" value="HepatitisB" onChange={(event) => this.handleHepatitisBCheckboxClick(event)}/>Hepatita B</label>
                    <label><input ref="HepatitisC" type="checkbox" value="HepatitisC" onChange={(event) => this.handleHepatitisCCheckboxClick(event)}/>Hepatita C</label>
                    <label><input ref="Sifilis" type="checkbox" value="Sifilis" onChange={(event) => this.handleSifilisCheckboxClick(event)}/>Sifilis</label>
                    <label><input ref="HTLV" type="checkbox" value="HTLV" onChange={(event) => this.handleHTLVCheckboxClick(event)}/>HTLV</label>
                    <label><input ref="ALTLevel" type="checkbox" value="ALTLevel" onChange={(event) => this.handleALTLevelCheckboxClick(event)}/>Nivel ALT</label>
                    <label><input ref="Rejected" type="checkbox" value="Rejected" onChange={(event) => this.handleRejectedCheckboxClick(event)}/>Respins din alte cauze</label>
                    <textarea ref="observationTextArea"/>
                    <Button1 text="Salvati analizele" onClickFunction={()=>this.addAnalyses()}> </Button1>
                </VBox>
                <Alert stack={true} timeout={5000} />
            </div>
        );
    }
}