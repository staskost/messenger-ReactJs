import React, { Component } from 'react';
import UserContext from '../context/user-context';


class ChatMsgs extends Component {
    static contextType = UserContext;

    componentDidMount(){
                const objDiv = document.getElementById('messageList');
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    render() {
        const msgDate = new Date(this.props.msg.date);
        return (
            <React.Fragment>
                {this.props.msg.sender.username === this.context.userInfo.username ?
                    <div className="outgoing_msg">
                        <div className="sent_msg">
                            <p>{this.props.msg.text}</p>
                            <span className="time_date">{msgDate.toDateString()} {msgDate.toLocaleTimeString()}</span>
                        </div>
                    </div>
                    : <div className="incoming_msg">
                        <div className="received_msg">
                            <div className="received_withd_msg">
                                <p>{this.props.msg.text}</p>
                                <span className="time_date">{msgDate.toDateString()} {msgDate.toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>}
            </React.Fragment>
        )
    }
}
export default ChatMsgs;