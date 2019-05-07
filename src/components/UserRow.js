import React, { Component } from 'react';
import AdminReplyModalButton from './AdminReplyModalButton';
class UserRow extends Component {
render() {
    const { user } = this.props;
    return (
        <tr>
            <td>{this.props.i}</td>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td><AdminReplyModalButton user={this.props.user}/></td>
            {/* {user.bannedStatus == 0 ?
                (<td class="text-center">
                    <button type="button" class="btn btn-danger" onClick={this.banUser.bind(this)}> Ban</button>
                    <button type="button" class="btn btn-secondary btn-xs" onClick={this.props.openModal.bind(this, user)}> <FontAwesomeIcon icon="envelope" /></button>
                </td>)
                :
                (<td class="text-center">
                    <button type="button" class="btn btn-primary" onClick={this.unbanUser.bind(this)}> Unban</button>
                    <button type="button" class="btn btn-secondary btn-xs" onClick={this.props.openModal.bind(this, user)}> <FontAwesomeIcon icon="envelope" /></button>
                </td>)
            } */}

        </tr>
    )
}
}

export default UserRow
