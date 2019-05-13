import React, { Component } from 'react';

class UserSelection extends Component{

render(){
    return(
    <div>
        <label htmlFor='receiver' className="col-form-label">Choose user to chat with</label>
        <input  type="receiver" id="receiver" assName="form-control" />
    </div>
)}   
}

export default UserSelection;