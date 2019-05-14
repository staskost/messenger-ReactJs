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
        this.text = React.createRef()
        this.state = {
            users: [],
            messages: [],
            currentUser: "",
            start: 0,
            size: 15
        }
        this.fetchMessages = this.fetchMessages.bind(this);

    }

    componentDidMount() {
        this.fetchUser();
      
    }

    componentDidUpdate() {
        // There is a new message in the state, scroll to bottom of list
        // const objDiv = document.getElementById('messageList');
        // objDiv.scrollTop = objDiv.scrollHeight;
      }

    fetchUser() {
        const url = 'http://localhost:8080/find/all?start=' + this.state.start + '&size=' + this.state.size

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
                const objDiv = document.getElementById('messageList');
                objDiv.scrollTop = objDiv.scrollHeight;
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

    fetchNewUsers = () => {
        const { start, size } = this.state;
        this.setState({ start: start + size })
        fetch('http://localhost:8080/find/all?start=' + this.state.start + '&size=' + this.state.size, {
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

    onClick(username){
        this.sendMessage(username);
        document.getElementById("text").value='';
    }


    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h3 className=" text-center">Messaging with {this.state.currentUser===""?"none yet":this.state.currentUser}</h3>
                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="inbox_people">
                                <div className="headind_srch">
                                    <div className="recent_heading">
                                        <h4>Users</h4>
                                    </div>
                                    {/* <div className="srch_bar">
                                        <div className="stylish-input-group">
                                            <input type="text" className="search-bar" placeholder="Search" />
                                            <span className="input-group-addon">
                                                <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                            </span>
                                        </div>
                                    </div> */}
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
                                        <button className="msg_send_btn" type="button" onClick={this.onClick.bind(this, this.state.currentUser)}><span><FontAwesomeIcon icon="angle-right" /></span></button>
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