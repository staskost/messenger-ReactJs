import React, { Component } from 'react';
import AdminUsersMessages from './AdminUsersMessages';

//not used
class AdminUsersInbox extends Component {
    render() {
        return (
            <AdminUsersMessages folderType ='INBOX' id = { this.props.match.params.id } />
        );
    }
}

export default AdminUsersInbox;