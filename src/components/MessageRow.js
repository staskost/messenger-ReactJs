import React, { Component } from 'react';
import ReplyModalButton from './ReplyModalButton';
import DeleteModalButton from './DeleteModalButton';
import ForwardModalButton from './ForwardModalButton';

class MessageRow extends Component {

    render() {
        const msgDate = new Date(this.props.msg.date);
        return (
            <tr>
                <th scope="row">{this.props.i}</th>
                <td>{this.props.folderType === 'INBOX' ? this.props.msg.sender.firstName +' '+ this.props.msg.sender.lastName : this.props.msg.receiver.firstName +' '+ this.props.msg.receiver.lastName}</td>
                <td>{this.props.msg.text}</td>
                <td>{msgDate.toDateString()} {msgDate.toLocaleTimeString()}</td>
                <td><ReplyModalButton msg={this.props.msg} folderType={this.props.folderType} /></td>
                <td><DeleteModalButton msg={this.props.msg} onDelete={this.props.onDelete}/></td>
                <td><ForwardModalButton msg={this.props.msg}/></td>
            </tr>
        );
    }
}

export default MessageRow;