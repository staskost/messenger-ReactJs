import React, { Component } from 'react';
import UserContext from '../context/user-context';


class ChatMsgs extends Component {
    static contextType = UserContext;

    render() {
        const msgDate = new Date(this.props.msg.date);
        return (
            <React.Fragment>
                {this.props.msg.sender.username === this.context.userInfo.username ?
                    <div class="outgoing_msg">
                        <div class="sent_msg">
                            <p>{this.props.msg.text}</p>
                            <span class="time_date">{msgDate.toDateString()} {msgDate.toLocaleTimeString()}</span>
                        </div>
                    </div>
                    : <div class="incoming_msg">
                        <div class="received_msg">
                            <div class="received_withd_msg">
                                <p>{this.props.msg.text}</p>
                                <span class="time_date">{msgDate.toDateString()} {msgDate.toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>}
            </React.Fragment>
        )
    }
}
export default ChatMsgs;