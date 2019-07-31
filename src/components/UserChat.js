import React, { Component } from 'react';
import UserContext from '../context/user-context';

class UserRow extends Component {

    static contextType = UserContext;

    render() {
        return (
            <div className="chat_list">
                <div className="chat_people">
                    <div className="chat_ib">
                        <h5><img src={this.props.user.photoLink} className="avatar"></img> {this.props.user.username}</h5>
                        <button type="button" onClick={this.props.fetchMsgs.bind(this, this.props.user.username)}>chat</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserRow;