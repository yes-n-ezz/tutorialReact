import React from 'react';
import classes from './Person.module.css';
const Person =(props)=>{
return(
    <div className={classes.Person}>
  <h1 onClick={props.delete}>Name : {props.name}</h1>
  <h1>Surname : {props.surname}</h1>
  <h2>Age : <input type="number" className={classes.AgeInput} min="0" max="60" defaultValue={props.age} onChange ={props.changed}/></h2> 
  <h3>Situation : {props.situation}</h3>
  <h3>Score : {(props.children)?props.children:0}</h3>
  <button  onClick={props.click} >+</button>
</div>
);
}
export default Person;