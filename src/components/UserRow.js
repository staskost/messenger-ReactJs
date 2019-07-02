import React, { Component } from 'react';
import AdminReplyModalButton from './AdminReplyModalButton';
import { Link } from 'react-router-dom';
import UserContext from '../context/user-context';

class UserRow extends Component {

    static contextType = UserContext;

    state = {
        user: this.props.user
    }

 

    banUser = () => {
        const url = `http://localhost:8080/admin/bann-user/${this.state.user.id}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'X-MSG-AUTH': this.context.token,
                'Accept': 'application/json'
            },
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                let user = this.state.user;
                user.bannedStatus = 1;
                this.setState({
                    user: user
                })
                alert("User Banned");
            } else {
                console.log(response.status);
            }
        }).catch(error => console.error('Error:', error));
    }

    unbanUser = () => {
        const url = `http://localhost:8080/admin/unbann-user/${this.state.user.id}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'X-MSG-AUTH': this.context.token,
                'Accept': 'application/json'
            },
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                let user = this.state.user;
                user.bannedStatus = 0;
                this.setState({
                    user: user
                })
                alert("User unbanned");
            } else {
                console.log(response.status);
            }
        }).catch(error => console.error('Error:', error));
    }

    render() {
        const { user } = this.props;
        return (
            <tr>
                <td>{this.props.i}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td><AdminReplyModalButton user={user} /></td>
                <td>
                    <Link to={`/admin/user/inbox/${user.id}`} >
                        <button className="btn btn-outline-primary" >
                            Inbox
                    </button>
                    </Link>
                </td>
                <td>
                    <Link to={`/admin/user/outbox/${user.id}`} >
                        <button className="btn btn-outline-primary"  >
                            Outbox
                    </button>
                    </Link>
                </td>
                {user.bannedStatus == 0 ?
                (<td class="text-center">
                    <button type="button" class="btn btn-danger" onClick={this.banUser.bind(this)}> Ban</button>
                    {/* <button type="button" class="btn btn-secondary btn-xs" onClick={this.props.openModal.bind(this, user)}> <FontAwesomeIcon icon="envelope" /></button> */}
                </td>)
                :
                (<td class="text-center">
                    <button type="button" class="btn btn-primary" onClick={this.unbanUser.bind(this)}> Unban</button>
                    {/* <button type="button" class="btn btn-secondary btn-xs" onClick={this.props.openModal.bind(this, user)}> <FontAwesomeIcon icon="envelope" /></button> */}
                </td>)
            }

            </tr>
        )
    }
}

export default UserRow;
