import React from 'react';
import classes from './OrderSummary.module.css';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
const OrderSummary=(props)=>{

    const ingredientsSummary=Object.keys(props.ingredients).map(
        igKey=>
            (<li key={igKey}> <span style={{textTransform:'capitalize'}}>{igKey} :</span>{props.ingredients[igKey]}</li>)
        
    );

    return (
        <Aux>
            <h3>Your Order Summary</h3>
            <ul>
            {ingredientsSummary}
            </ul>
            <Button type="Danger" Clicked={props.cancelClicked}>CANCEL</Button>
            <Button type="Success" Clicked={props.continueCliked}>CONTIUE</Button>
        </Aux>
    );


};

export default OrderSummary;