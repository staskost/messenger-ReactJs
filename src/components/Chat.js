import React, { Component } from 'react';
import UserChat from './UserChat';
import ChatMsgs from './ChatMsgs';
import './Chat.css'
import UserContext from '../context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Chat extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.text = React.createRef()
        this.state = {
            users: [],
            messages: [],
            currentUser: ''
        }
        // this.sendMessage = this.sendMessage.bind(this);
        this.fetchMessages = this.fetchMessages.bind(this);
        
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser() {
        const url = 'http://localhost:8080/find/all?start=0&size=25'

        fetch(url, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': this.context.token
            },
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                response.json().then(data => {
                    this.setState({
                        users: data.results
                    });
                })
            }
        }).catch(error => console.error('Error:', error));
    }

    sendMessage(username) {
        console.log('Inside SendMessage');
        // console.log('MessageRef:', this.text.current.value);
        const url = 'http://localhost:8080/messages/save/' + username;

        fetch(url, {
            method: 'POST',
            headers: {
                'X-MSG-AUTH': this.context.token
            },
            body: this.text.current.value
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                console.log('Message sent.');
            }
        }).catch(error => console.error('Error:', error));
    }

    fetchMessages(username) {
        setInterval( () =>{
            fetch('http://localhost:8080/messages/UsersMsg/' + this.context.userInfo.username + '/' + username + '?start=0&size=40', {
                method: 'GET',
                headers: {
                    'X-MSG-AUTH': this.context.token
                },
            }).then(response => {
                console.log('Response status:', response.status);
                if (response.status === 200) {
                    response.json().then(data => {
                        this.setState({
                            messages: data.results,
                            currentUser: username
                        });
                    })
                }
            }).catch(error => console.error('Error:', error))},1000
        );
     


    }


    

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h3 className=" text-center">Messaging</h3>
                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="inbox_people">
                                <div className="headind_srch">
                                    <div className="recent_heading">
                                        <h4>Users</h4>
                                    </div>
                                    <div className="srch_bar">
                                        <div className="stylish-input-group">
                                            <input type="text" className="search-bar" placeholder="Search" />
                                            <span className="input-group-addon">
                                                <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="inbox_chat">
                                    {this.state.users.map(u => {
                                        return <UserChat key={u.id} user={u} fetchMsgs={this.fetchMessages}></UserChat>
                                    })}
                                </div>
                            </div>
                            <div className="mesgs">
                                <div className="msg_history">
                                    {this.state.messages.map(m => {
                                        return <ChatMsgs key={m.id} msg={m}></ChatMsgs>
                                    })}
                                </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <input type="text" className="write_msg" placeholder="Type a message" ref={this.text} />
                                        <button className="msg_send_btn" type="button" onClick={this.sendMessage.bind(this, this.state.currentUser)}><span><FontAwesomeIcon icon="angle-right" /></span></button>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}
export default Chat;