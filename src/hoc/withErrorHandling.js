import React , {Component} from 'react';
import axios from '../axios-orders';
import Modal from '../components/UI/Modal/Modal';
import Aux from './Auxiliary';
const withErrorHandling=(WrappedComponent,axios)=>{

    return class extends Component{
        state={
            error:null
        }
        componentWillMount(){
            axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });
            axios.interceptors.response.use(res=>res,err=>{
                this.setState({error:err});
            });      
        }
        errorConfirmedHandler=()=>{
            this.setState({error:null});
        }
        render(){
            return(
                <Aux>
                <Modal
                 show={this.state.error}
                 Clicked={this.errorConfirmedHandler}
                 >
                {this.state.error?this.state.error.message:null}
                </Modal>
                <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandling;