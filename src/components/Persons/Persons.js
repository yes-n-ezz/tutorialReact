import React from 'react';
import Person from './Person/Person';


const Persons = (props)=>(
    props.persons.map((person,index)=>{
        return(
          <Person
   delete={()=>props.deleteClicked(person.id)}       
   key={person.id}        
  name={person.name} 
  surname={person.surname}
  age={person.age}
  click={()=>props.switchClicked(person.id)}
  changed={(e)=>props.ageChanged(e,person.id)}
  situation={person.situation}
  >
    {person.score}
    </Person>
        )
      })
);

export default Persons;
