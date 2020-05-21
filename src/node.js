import React, {Component} from 'react';

// no state - could be function instead
class Node extends Component{

    handleClick = (e) =>{
        if (e.target.className.indexOf('-') !== -1){
            this.props.deactivateCell(Number(e.target.id))
        }else{
            this.props.activateCell(Number(e.target.id))
        }
    }

    render(){
        return (
            <div className={this.props.className} id={this.props.id} onClick={this.handleClick}></div>
        )
    }
}

export default Node;