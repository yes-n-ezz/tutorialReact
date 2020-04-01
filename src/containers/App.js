import React ,{Component} from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
class App extends Component {
  state={
    persons:[
      {id:1,gender:"Male",name:'Yassine',surname:'Ezzaghouani',age:12,score:0,situation:''},
      {id:2,gender:"Male",name:'Elias',surname:'Ben Allal',age:23,score:0,situation:''},
      {id:3,gender:"Male",name:'Hamza',surname:'Serroukh',age:15,score:0,situation:''},
      {id:4,gender:"Female",name:'Alexia',surname:'Yamil',age:24,score:0,situation:''}
    ],
    count:0,
    showBlocks:true,
  }
  score=0;
  switchNameHander=(newName)=>{
    const persons=[...this.state.persons];
    persons.map(person=>person.name=newName);
    this.setState({persons:persons});
  }

  switchScoreHandler=(id)=>{
    const personIndex=this.state.persons.findIndex(p=>{
      return p.id===id;
    });
//Comment
   const persons=[...this.state.persons];
   persons[personIndex].score++;
   this.setState({persons:persons});
  }
  ageChanged=(e,id)=>{
    const personIndex=this.state.persons.findIndex(p=>{
      return p.id===id;
    });

   const persons=[...this.state.persons];
    persons[personIndex].age=e.target.value;
    persons[personIndex].situation=parseInt(persons[personIndex].age)>18?"Major":"Minor";
    this.setState({persons:persons});
  }
  hideBlocksHander=()=>{
   const showBlocks=this.state.showBlocks;
   this.setState({showBlocks:!showBlocks});
  }
  deletePersonHandler=(id)=>{
    const personIndex=this.state.persons.findIndex(p=>{
      return p.id===id;
    });

   const persons=[...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons});
  }
  
  render(){
    let persons=null;
    if(this.state.showBlocks){
      persons=(
        <Persons
        persons={this.state.persons}
        deleteClicked={this.deletePersonHandler}
        switchClicked={this.switchScoreHandler}
        ageChanged={this.ageChanged}
        />
              );
    }

  return (
    <div className={classes.App}>
      {persons}
      <Cockpit
      switchClicked={()=>this.switchNameHander("*****")}
      hideClicked={()=>this.hideBlocksHander()}
      showBlocks={this.state.showBlocks}
      />
    </div>
    //React.createElement("div",{className:'Person'},React.createElement(Person,{name:'Yassine',surname:'Ezzaghouani',age:'26'},null))
  
  );
}
}

export default App;
