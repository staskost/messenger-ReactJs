import React, { Component } from 'react';
import UserContext from '../context/user-context';

class AdminReplyModalButton extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.message = React.createRef();
        this.receiver = this.props.user.username;
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    componentDidMount() {
        console.log('receiver:', this.receiver);
    }

    handleSendMessage() {
        console.log('Inside handleSendMessage');
        console.log('MessageRef:', this.message.current.value);
        const url = 'http://localhost:8080/messages/save/' + this.receiver;
        
        fetch(url, {
            method: 'POST',
            headers: {
                'X-MSG-AUTH': this.context.token
            },
            body: this.message.current.value
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                console.log('Message sent.');
            }
        }).catch(error => console.error('Error:', error));
    }
    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target={'#rm_' + this.props.user.id}>Contact</button>
                <div className="modal fade" id={'rm_' + this.props.user.id} tabIndex="-1" role="dialog" aria-labelledby={'rmLabel_' + this.props.user.id} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={'rmLabel_' + this.props.user.id}>New message to {this.receiver}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor={'message-text_' + this.props.user.id} className="col-form-label">Message:</label>
                                        <textarea className="form-control" id={'message-text_' + this.props.user.id} ref={this.message} required ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSendMessage}>Send message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AdminReplyModalButton;