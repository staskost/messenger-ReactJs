import React, { Component } from 'react';
import UserChat from './UserChat';
import ChatMsgs from './ChatMsgs';
import './Chat.css'
import UserContext from '../context/user-context';



class Chat extends Component {
    static contextType = UserContext;


    constructor(props) {
        super(props)
        this.state = {
            users: [],
            messages: []
        }
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

    fetchMessages(username){
        const url = 'http://localhost:8080/messages/UsersMsg/' + this.context.userInfo.username + '/' + username + '?start=0&size=10'

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
                        messages: data.results
                    });
                })
            }
        }).catch(error => console.error('Error:', error));
    }

    render() {
        console.log("hey");
        return (
            <React.Fragment>
                <div class="container">
                    <h3 class=" text-center">Messaging</h3>
                    <div class="messaging">
                        <div class="inbox_msg">
                            <div class="inbox_people">
                                <div class="headind_srch">
                                    <div class="recent_heading">
                                        <h4>Recent</h4>
                                    </div>
                                    <div class="srch_bar">
                                        <div class="stylish-input-group">
                                            <input type="text" class="search-bar" placeholder="Search" />
                                            <span class="input-group-addon">
                                                <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="inbox_chat">
                                        {this.state.users.map(u => {
                                            return <UserChat key={u.id} user={u} fetchMsgs={this.fetchMessages}></UserChat>
                                        })}
                                    </div>
                                </div>
                                <div class="mesgs">
                                    <div class="msg_history">
                                    {this.state.messages.map(m => {
                                            return <ChatMsgs key={m.id} msg={m}></ChatMsgs>
                                        })}
                                    </div>
                                    <div class="type_msg">
                                        <div class="input_msg_write">
                                            <input type="text" class="write_msg" placeholder="Type a message" />
                                            <button class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
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