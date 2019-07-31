import React from 'react'
import UserContext from '../context/user-context';
import $ from "jquery";

class RoomList extends React.Component {
    static contextType = UserContext;

    hideModal = () => {
        $("#sessionModal").modal("hide");
    };

    showModal = () => {
        $("#sessionModal").modal("show");
    };

    renderUsers() {
        console.log("hi")
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
                        <WhosOnlineListItem key={index}>
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
                    <div><a
                        onClick={() => this.showModal}
                        href="#">
                        Create
                    </a> </div>
                    <ul>
                        <h3>Your rooms:</h3>
                        {orderedRooms.map(room => {
                            const active = room.id === this.props.roomId ? 'active' : '';
                            return (
                                <li key={room.id} className={"room " + active}>
                                    <a
                                        onClick={() => this.props.subscribeToRoom(room.id)}
                                        href="#">
                                        # {room.name}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                    {this.props.users ? this.renderUsers() : <p>Loading...</p>}

                </div>

                <div
                    className="modal fade"
                    id="sessionModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Training sessions
                  </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h6>Available hours for</h6>
                                <hr />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    Close
                  </button>
                            </div>
                        </div>
                    </div>
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
                {/* <div
                    style={{
                        ...styles.div,
                        backgroundColor:
                            this.props.presenceState === 'online' ? '#539eff' : '#414756',
                    }}
                /> */}
                {this.props.children}
            </li>
        )
    }
}

export default RoomList