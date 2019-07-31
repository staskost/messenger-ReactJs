import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserChat from './UserChat';
import ChatMsgs from './ChatMsgs';
import './Chat.css'
import UserContext from '../context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Chat extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.text = React.createRef();
        this.inputSearch = React.createRef();
        this.state = {
            users: [],
            usernames: [],
            autocompleteUsers: [],
            messages: [],
            currentUser: "",
            start: 0,
            size: 15
        }
        this.fetchMessages = this.fetchMessages.bind(this);
        this.fetchAutoCompleteUsers = this.fetchAutoCompleteUsers.bind(this);

    }

    componentDidMount() {
        this.fetchUsers();

    }


    fetchUsernames = () => {
        const url = 'http://localhost:8080/users/chat-usernames?start=' + this.state.start + '&size=' + this.state.size

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
                        usernames: data.results
                    });
                })
            }
        }).catch(error => console.error('Error:', error));
    }

    fetchNewUsernames = () => {
        const { start, size } = this.state;
        this.setState({ start: start + size })
        fetch('http://localhost:8080/users/chat-usernames?start=' + this.state.start + '&size=' + this.state.size, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': this.context.token
            },
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                response.json().then(data => {
                    this.setState({
                        usernames: this.state.usernames.concat(data.results),

                    });
                })
            }
        }).catch(error => console.error('Error:', error))
    }
    fetchUsers = () => {
        const url = 'http://localhost:8080/users/getAllForChat?start=' + this.state.start + '&size=' + this.state.size

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

    fetchNewUsers = () => {
        const { start, size } = this.state;
        this.setState({ start: start + size })
        fetch('http://localhost:8080/users/getAllForChat?start=' + this.state.start + '&size=' + this.state.size, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': this.context.token
            },
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                response.json().then(data => {
                    this.setState({
                        users: this.state.users.concat(data.results),

                    });
                })
            }
        }).catch(error => console.error('Error:', error))
    }

    fetchAutoCompleteUsers() {
        const url = 'http://localhost:8080/users/users-starts-with/' + this.inputSearch.current.value;
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
                        autocompleteUsers: data
                    });
                    console.log(data);
                })
            } else {
                console.log(response.status);
            }
        }).catch(error => console.error('Error:', error));
    }

    sendMessage(username) {
        console.log('Inside SendMessage');
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
        this.setState({
            currentUser: username
        });
        setInterval(() => {

            fetch('http://localhost:8080/messages/UsersMsg/' + this.context.userInfo.username + '/' + this.state.currentUser, {
                method: 'GET',
                headers: {
                    'X-MSG-AUTH': this.context.token
                },
            }).then(response => {
                console.log('Response status:', response.status);
                if (response.status === 200) {
                    response.json().then(data => {
                        this.setState({
                            messages: data,
                            // currentUser: username
                        });
                        console.log(this.state.currentUser);
                    })
                }
            }).catch(error => console.error('Error:', error))
        }, 1000
        );
    }



    sendClick(username) {
        this.sendMessage(username);
        document.getElementById("text").value = '';
    }

    userSearch(input) {
        const url = 'http://localhost:8080/users/validate-user/' + input

        fetch(url, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': this.context.token
            },
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                this.fetchMessages(input)
            } else {
                response.json().then(data => {
                    alert(data.message);
                })
            }
        }).catch(error => console.error('Error:', error))
    }


    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h3 className=" text-center">Messaging with {this.state.currentUser === "" ? "none yet" : this.state.currentUser}</h3>
                    <small className=" text-center">
                        {this.state.messages.length === 0 && <h5>Start a conversation</h5>}
                    </small>
                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="inbox_people">
                                <div className="headind_srch">
                                    <div className="recent_heading">
                                        <h4>Chat Users</h4>
                                    </div>
                                    <div className="srch_bar">
                                        <div className="stylish-input-group">
                                            <input list="users2" type="text" id="inputSearch" name="inputSearch" className="search-bar" placeholder="Search"
                                                ref={this.inputSearch} required onChange={this.fetchAutoCompleteUsers} />
                                            <datalist id="users2">
                                                {this.state.autocompleteUsers.map((user, index) => {
                                                    return <option key={index} value={user.username} />;
                                                })}
                                            </datalist>
                                            <button type="button" onClick={() => this.userSearch(this.inputSearch.current.value)}> chat </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="inbox_chat">
                                    <InfiniteScroll
                                        dataLength={this.state.users.length}
                                        next={this.fetchNewUsers}
                                        hasMore={true}
                                        loader={<h4>...</h4>}>
                                        {this.state.users.map(u => {
                                            return <UserChat key={u.id} user={u} fetchMsgs={this.fetchMessages}></UserChat>
                                        })}
                                    </InfiniteScroll>
                                </div>
                            </div>
                            <div className="mesgs">
                                <div className="msg_history" id="messageList">
                                    {this.state.messages.map(m => {
                                        return <ChatMsgs key={m.id} msg={m}></ChatMsgs>
                                    })}
                                </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <input type="text" id="text" className="write_msg" placeholder="Type a message" ref={this.text} required />
                                        <button className="msg_send_btn" type="button" onClick={this.sendClick.bind(this, this.state.currentUser)}><span><FontAwesomeIcon icon="angle-right" /></span></button>
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