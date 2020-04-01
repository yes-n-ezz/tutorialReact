import React from 'react';


const Cockpit = (props)=>{
    return (
        <div>
        <button  onClick={props.switchClicked}>Hide Names</button>
        <button  onClick={props.hideClicked}>{props.showBlocks? "Hide Blocks":"Show Blocks"}</button>
        </div>
        );
}
export default Cockpit;