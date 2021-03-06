import React ,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandling from '../../hoc/withErrorHandling';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state={
        ingredients:{
            salad:0,
            bacon:0,
            meat:0,
            cheese:0, 
        },
        totalPrice: 4,
        purchasable: false,
        purchasing:false,
        loading:false
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }
    purchasingHanlder=()=>{
        this.setState({purchasing:true});
    }
    removeBackdropHandler=()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
        this.setState({loading:true});
        const orders={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice
        }
        axios.post("./orders",orders)
        .then(
            this.setState({loading:false,purchasing:false})
        )
        .catch(err=>console.log(err));
    }
    render (){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary=<OrderSummary 
        ingredients={this.state.ingredients}
        cancelClicked={this.removeBackdropHandler}
        continueCliked={this.purchaseContinueHandler}
        />
        if(this.state.loading){
            orderSummary=<Spinner/>;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} Clicked={this.removeBackdropHandler}>
          {orderSummary}
          </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchasingHanlder}
                     />
            </Aux>
        );
    }
}



export default withErrorHandling(BurgerBuilder,axios);
