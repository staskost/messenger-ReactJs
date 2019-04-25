import React, { Component } from 'react';
import UserContext from '../context/user-context';


class ForwardModaButton extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.receiver = React.createRef();
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.state = {
            users: []
        }
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

    handleSendMessage = () => {
        console.log('Inside handleSendMessage');
        if (this.receiver.current.value === "") {
            alert("Receiver is mandatory");
        } else {
            const url = 'http://localhost:8080/messages/save/' + this.receiver.current.value;
            fetch(url, {
                method: 'POST',
                headers: {
                    'X-MSG-AUTH': this.context.token
                },
                body: this.props.msg.text
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

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target={'#forwardMessageModal' + this.props.msg.id}>Forward</button>
                <div className="modal fade" id={'forwardMessageModal' + this.props.msg.id} tabIndex="-1" role="dialog" aria-labelledby={'forwardMessageModal' + this.props.msg.id} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={'rmLabel_' + this.props.msg.id}>Forward Message</h5>
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
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSendMessage}>Forward message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default ForwardModaButton;