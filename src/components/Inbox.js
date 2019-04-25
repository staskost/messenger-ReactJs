import React, { Component } from 'react';
import Msg from './Msg';


class Inbox extends Component {
    render() {
        return (
            <Msg folderType='INBOX' />
        );
    }
}

export default Inbox;