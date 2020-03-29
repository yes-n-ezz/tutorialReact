import React ,{Component} from 'react';
import './App.css';
import Person from './Person/Person'


class App extends Component {
  state={
    persons:[
      {id:1,gender:"Male",name:'Yassine',surname:'Ezzaghouani',age:12,score:0,situation:''},
      {id:2,gender:"Male",name:'Elias',surname:'Ben Allal',age:23,score:0,situation:''},
      {id:3,gender:"Male",name:'Hamza',surname:'Serroukh',age:15,score:0,situation:''}
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
    let persons=(
    <div>
    {this.state.persons.map((person,index)=>{
            return(
              <Person
       delete={()=>this.deletePersonHandler(person.id)}       
       key={person.id}        
      name={person.name} 
      surname={person.surname}
      age={person.age}
      click={()=>this.switchScoreHandler(person.id)}
      changed={(e)=>this.ageChanged(e,person.id)}
      situation={person.situation}
      >
        {person.score}
        </Person>
            )
          })}
    </div>
          );
          
  return (
    <div className="App">
      {this.state.showBlocks?persons:null}
      <div>
      <button  onClick={this.switchNameHander.bind(this,"********")}>Hide Names</button>
      <button  onClick={this.hideBlocksHander}>{this.state.showBlocks? "Hide Blocks":"Show Blocks"}</button>
      </div>
    </div>
    //React.createElement("div",{className:'Person'},React.createElement(Person,{name:'Yassine',surname:'Ezzaghouani',age:'26'},null))
  
  );
}
}

export default App;
