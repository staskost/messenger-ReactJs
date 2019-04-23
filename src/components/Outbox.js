import React, { Component } from 'react';
import Messages from './Messages';
;


class Outbox extends Component {
    render() {
        return (
            <Messages folderType='OUTBOX' />
        );
    }
}

export default Outbox;