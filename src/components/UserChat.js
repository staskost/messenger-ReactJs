import React, { Component } from 'react';
import UserContext from '../context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UserRow extends Component {

    static contextType = UserContext;

    render() {
        return (
            <div className="chat_list">
                <div className="chat_people">
                    <div className="chat_ib">
                        <h5> {this.props.user.photoLink == '' || this.props.user.photoLink == null ? <FontAwesomeIcon icon={["far", "user-circle"]} size="4x" /> : <img src={this.props.user.photoLink} className="avatar"></img>} {this.props.user.username}</h5>
                        <button type="button" onClick={this.props.fetchMsgs.bind(this, this.props.user.username)}>chat</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserRow;