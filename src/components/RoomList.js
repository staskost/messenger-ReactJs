import React from 'react'
import UserContext from '../context/user-context';
import $ from "jquery";
import PrivateRoomModal from './PrivateRoomModal';

class RoomList extends React.Component {

    static contextType = UserContext;

    renderUsers() {
        console.log(this.props.users)
        return (
            <ul>
                <h3>Users:</h3>
                {this.props.users.map((user, index) => {
                    if (user === this.context.userInfo.username) {
                        return (
                            <WhosOnlineListItem key={index} presenceState="online">
                                {user} (You)
                            </WhosOnlineListItem>
                        )
                    }
                    return (
                        <WhosOnlineListItem key={index} presenceState={this.props.presence}>
                            {user}
                        </WhosOnlineListItem>
                    )
                })}
            </ul>
        )
    }



    render() {
        const orderedRooms = [...this.props.rooms].sort((a, b) => a.id > b.id)
        return (
            <React.Fragment>
                <div className="rooms-list">
                    <ul>
                        <h3>Your rooms:</h3>
                        {orderedRooms.map(room => {
                            const roomIcon = !room.isPrivate ? '🌐' : '🔒';
                            const active = room.id === this.props.roomId ? 'active' : '';
                            return (
                                <li key={room.id} className={"room " + active}>
                                    <a
                                        onClick={() => this.props.subscribeToRoom(room.id)}
                                        href="#">
                                        {roomIcon}{room.name}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                    {this.props.users ? this.renderUsers() : <p>Loading...</p>}

                </div>
            </React.Fragment>
        )
    }
}
class WhosOnlineListItem extends React.Component {
    render() {
        const styles = {
            li: {
                display: 'flex',
                alignItems: 'center',
                marginTop: 5,
                marginBottom: 5,
                paddingTop: 2,
                paddingBottom: 2,
            },
            div: {
                borderRadius: '50%',
                width: 11,
                height: 11,
                marginRight: 10,
            },
        }
        return (
            <li style={{ color: 'white' }} >
                <div
                    style={{
                        ...styles.div,
                        backgroundColor:
                            this.props.presence === 'online' ? '#539eff' : '#414756',
                    }}
                />
                {this.props.children}
            </li>
        )
    }
}

export default RoomList