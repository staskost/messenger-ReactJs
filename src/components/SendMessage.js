import React, { Component } from 'react';
import UserContext from '../context/user-context';

class SendMessage extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.message = React.createRef();
        this.receiver = React.createRef();
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.state = {
            users: []
        }
    }

    handleSendMessage =() =>{
        if (this.receiver.current.value === "") {
            alert("Receiver is mandatory");
        } else {
            console.log('Inside handleSendMessage');
            console.log('MessageRef:', this.message.current.value);
            const url = 'http://localhost:8080/messages/save/' + this.receiver.current.value;

            fetch(url, {
                method: 'POST',
                headers: {
                    'X-MSG-AUTH': this.context.token,
                    'Accept': 'application/json'
                },
                body: this.message.current.value
            }).then(response => {
                console.log('Response status:', response.status);
                if (response.status === 200) {
                    console.log('Message sent.');
                } else {
                    response.json().then(data => {
                        alert(data.message);
                    })
                }
            }).catch(error => console.error('Error:', error));
        };
    }

    fetchUsers() {
        const url = 'http://localhost:8080/find/users-starts-with/' + this.receiver.current.value;
        fetch(url, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': this.context.token,
                'Accept': 'application/json'
            },
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                response.json().then(data => {
                    this.setState({
                        users: data
                    });
                    console.log(data);
                })
            } else {
                console.log(response.status);
            }
        }).catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <React.Fragment>
                <div className="modal fade" id='newMessageModal' tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id='newMessageModalLabel'>New message</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor='receiver' className="col-form-label">Receiver:</label>
                                        <input list="users" type="receiver" className="form-control" id="receiver" name="receiver"
                                            ref={this.receiver} required onChange={this.fetchUsers} />
                                        <datalist id="users">
                                            {this.state.users.map((user, index) => {
                                                return <option key={index} value={user.username} />;
                                            })}
                                        </datalist>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor='message-text_' className="col-form-label">Message:</label>
                                        <textarea className="form-control" id='message-text_' ref={this.message} required ></textarea>
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

export default SendMessage;