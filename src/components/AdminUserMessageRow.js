import React, { Component } from 'react';
import ReplyModalButton from './ReplyModalButton';
import DeleteModalButton from './DeleteModalButton';
import ForwardModalButton from './ForwardModalButton';

class AdminUserMessageRow extends Component {

    render() {
        const msgDate = new Date(this.props.msg.date);
        return (
            <tr>
                <th scope="row">{this.props.i}</th>
                <td>{this.props.folderType === 'INBOX' ? this.props.msg.sender.firstName +' '+ this.props.msg.sender.lastName : this.props.msg.receiver.firstName +' '+ this.props.msg.receiver.lastName}</td>
                <td>{this.props.msg.text}</td>
                <td>{msgDate.toDateString()} {msgDate.toLocaleTimeString()}</td>
            </tr>
        );
    }
}

export default AdminUserMessageRow;