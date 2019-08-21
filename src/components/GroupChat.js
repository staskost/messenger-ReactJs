import React from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import RoomList from './RoomList'
import UserContext from '../context/user-context';
import TypingIndicator from './TypingIndicator'
import './style.css'
import { tokenUrl, instanceLocator } from './config'
import PrivateRoomModal from './PrivateRoomModal';


class GroupChat extends React.Component {

    static contextType = UserContext;

    constructor() {
        super()
        this.state = {
            roomId: null,
            messages: [],
            joinableRooms: [],
            joinedRooms: [],
            usersWhoAreTyping: [],
            roomUsers: [],
        }

        this.sendMessage = this.sendMessage.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
        this.createRoom = this.createRoom.bind(this)
        this.createPrivateRoom = this.createPrivateRoom.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
        this.createPrivateRoomForGroupChat = this.createPrivateRoomForGroupChat.bind(this);
        this.addUserToRoom = this.addUserToRoom.bind(this)
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: this.context.userInfo.username,
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })

        })


        chatManager.connect()
            .then(currentUser => {
                console.log("Connected as user ", currentUser);
                this.currentUser = currentUser
                this.getRooms()
            })
            .catch(err => console.log('error on connecting: ', err.message))
    }


    getRooms() {
        this.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
            })
            .catch(err => console.log('error on joinableRooms: ', err))
    }

    subscribeToRoom(roomId) {
        this.setState({ messages: [] })
        this.currentUser.subscribeToRoom({
            roomId: roomId,

            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                },
                onUserStartedTyping: user => {
                    this.setState({
                        usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.id],
                    })
                },
                onUserStoppedTyping: user => {
                    this.setState({
                        usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                            username => username !== user.id
                        ),
                    })
                },
                onUserCameOnline: () => this.forceUpdate(),
                onUserWentOffline: () => this.forceUpdate(),
                onUserJoined: () => this.forceUpdate(),
            }
        })
            .then(room => {
                this.setState({
                    roomId: room.id,
                    roomUsers: room.userIds
                })
                this.getRooms()
            })
            .catch(err => console.log('error on subscribing to room: ', err))
    }

    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        })
    }

    sendTypingEvent() {
        this.currentUser
            .isTypingIn({ roomId: this.state.roomId })
            .catch(error => console.error('error', error))
    }

    //not used
    createPrivateRoom(username, username2) {
        this.currentUser.createRoom({
            name: `${username}-${username2}`,
            private: true,
            addUserIds: [username, username2]
        })
            .then(room => this.subscribeToRoom(room.id)
            )
            .catch(err => console.log('error with createRoom: ', err))
    }


    createPrivateRoomForGroupChat = (name, groupUsers) => {
        this.currentUser.createRoom({
            name,
            private: true,
            addUserIds: groupUsers
        })
            .then(room => this.subscribeToRoom(room.id))
            .catch(err => console.log('error with createRoom: ', err))
    }

    createRoom(name) {
        this.currentUser.createRoom({
            name
        })
            .then(room => this.subscribeToRoom(room.id))
            .catch(err => console.log('error with createRoom: ', err))
    }

    //not used
    addUserToRoom = (username, roomId) => {
        this.currentUser.addUserToRoom({
            userId: username,
            roomId: roomId
        })
            .then(() => {
                console.log('Added ' + username + ' to room ' + roomId)
            })
            .catch(err => {
                console.log(`Error : ${err.message}`)
            })
    }


    render() {
        const styles = {
            chatListContainer: {
                display: 'block',
                width: '100vw'
            },
        }
        return (
            <div className="app">
                <RoomList
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    roomId={this.state.roomId}
                    users={this.state.roomUsers} />
                <MessageList
                    roomId={this.state.roomId}
                    messages={this.state.messages} />
                <section style={styles.chatListContainer}>
                    <SendMessageForm
                        disabled={!this.state.roomId}
                        sendMessage={this.sendMessage}
                        onChange={this.sendTypingEvent}
                    />
                    <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                </section>
                <PrivateRoomModal
                    createPrivate={this.createPrivateRoomForGroupChat}
                    createRoom={this.createRoom}
                    getRooms={this.getRooms} />
            </div>
        );
    }
}

export default GroupChat;