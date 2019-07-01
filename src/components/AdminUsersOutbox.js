import React, { Component } from 'react';
import AdminUsersMessages from './AdminUsersInbox';


class AdminUsersOutbox extends Component {
    render() {
        return (
            <AdminUsersMessages folderType ='OUTBOX' id = { this.props.match.params.id } />
        );
    }
}

export default AdminUsersOutbox;