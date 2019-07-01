import React, { Component } from 'react';
import AdminUsersMessages from './AdminUsersMessages';


class AdminUsersInbox extends Component {
    render() {
        return (
            <AdminUsersMessages folderType ='INBOX' id = { this.props.match.params.id } />
        );
    }
}

export default AdminUsersInbox;