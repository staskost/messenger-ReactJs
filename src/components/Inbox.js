import React, { Component } from 'react';
import Messages from './Messages';
;


class Inbox extends Component {
    render() {
        return (
            <Messages folderType='INBOX' />
        );
    }
}

export default Inbox;