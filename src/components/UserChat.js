import React, { Component } from 'react';

class UserRow extends Component {
    render() {
        return (
            <div className="chat_list">
                <div className="chat_people">
                    <div className="chat_ib">
                        <h5>{this.props.user.username}</h5>
                        <button type="button" onClick={this.props.fetchMsgs.bind(this, this.props.user.username)}>chat</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserRow;