import React, { Component } from 'react';
import Msg from './Msg';
;


class Outbox extends Component {
    render() {
        return (
            <Msg folderType='OUTBOX' />
        );
    }
}

export default Outbox;