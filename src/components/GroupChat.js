import React from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import RoomList from './RoomList'
import NewRoomForm from './NewRoomForm'
import UserContext from '../context/user-context';
import TypingIndicator from './TypingIndicator'
import './style.css'

import { tokenUrl, instanceLocator } from './config'

class GroupChat extends React.Component {

    static contextType = UserContext;

    constructor() {
        super()
        this.state = {
            roomId: null,
            messages: [],
            joinableRooms: [],
            joinedRooms: [],
            usersWhoAreTyping: []
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
        this.createRoom = this.createRoom.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
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
                userStartedTyping: user => {
                    this.setState({
                        usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.id],
                    })
                },
                userStoppedTyping: user => {
                    this.setState({
                        usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                            username => username !== user.id
                        ),
                    })
                },
                // onUserCameOnline: () => this.forceUpdate(),
                // onUserWentOffline: () => this.forceUpdate(),
                // onUserJoined: () => this.forceUpdate(),
            }
        })
            .then(room => {
                this.setState({
                    roomId: room.id
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

    createRoom(name) {
        this.currentUser.createRoom({
            name
        })
            .then(room => this.subscribeToRoom(room.id))
            .catch(err => console.log('error with createRoom: ', err))
    }

    render() {
        return (
            <div className="app">
                <RoomList
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    roomId={this.state.roomId} />

                <MessageList
                    roomId={this.state.roomId}
                    messages={this.state.messages} />
                <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                <SendMessageForm
                    disabled={!this.state.roomId}
                    sendMessage={this.sendMessage}
                    onChange={this.sendTypingEvent} />
                <NewRoomForm createRoom={this.createRoom} />

            </div>
        );
    }
}

export default GroupChat;