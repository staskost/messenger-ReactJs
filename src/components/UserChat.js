import React, { Component } from 'react';

class UserRow extends Component {
    render() {
        return (
            <div class="chat_list">
                <div class="chat_people">
                    <div class="chat_ib">
                        <h5>{this.props.user.username}</h5>
                        <button onClick = {this.props.fetchMsgs.bind(this, this.props.user.username)}>chat</button>
                        <p>Test, which is a new approach to have all solutions
                    astrology under one roof.</p>
                    </div>
                </div>
            </div>
          
        )
    }
}

export default UserRow