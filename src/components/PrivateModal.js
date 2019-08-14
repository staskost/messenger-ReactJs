import React from 'react'


class PrivateModal extends React.Component {

    constructor() {
        super()
        this.state = {
            roomName: '',
            userName: '',
            isCreated: false,
            roomId: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeForUser = this.handleChangeForUser.bind(this)
        this.addUser = this.addUser.bind(this)
        this.done = this.done.bind(this)
        this.fetchUsers = this.fetchUsers.bind(this)
    }

    handleChange(e) {
        this.setState({
            roomName: e.target.value
        })
    }

    addUser() {
        this.props.addUserToRoom(this.state.userName, this.props.roomId)
        this.setState({ userName: '' })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.createPrivate(this.state.roomName, this.props.roomId)
        this.setState({
            userName: '',
            roomId: this.props.roomId,
            isCreated: true
        })
    }

    handleChangeForUser(e) {
        e.preventDefault()
        this.setState({
            userName: e.target.value
        })

    }

    done() {
        this.setState({
            isCreated: false,
            roomName: ''
        })
    }

    fetchUsers = () => {
        const url = 'http://localhost:8080/users/users-starts-with/' + this.user.current.value;
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
                <button type="button" className="btn btn-secondary btn block" data-toggle="modal" data-target={"#PrivateRoomModal"}>Create Private Room</button>
                <div className="modal fade" id="PrivateRoomModal" tabIndex="-1" role="dialog" aria-labelledby="addUsers">
                    <div div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="PrivateRoomModalLabel">Create Private Room</h5>
                                <button className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                {/* <form onSubmit={() =>this.create(this.name.current.value, this.state.groupUsers)}> */}
                                <div >
                                    <form onSubmit={this.handleSubmit}>
                                        <input
                                            className="form-control"
                                            value={this.state.roomName}
                                            onChange={this.handleChange}
                                            type="text"
                                            placeholder="Create a private group chat"
                                            required />
                                        <button id="create-private-room-group-btn" type="submit">+</button>

                                    </form>
                                    {this.state.isCreated === true && <div>
                                        <input
                                            value={this.state.userName}
                                            onChange={this.handleChangeForUser}
                                            type="text"
                                            placeholder="Add a user"
                                            required />
                                        <button id="add" onClick={this.addUser}>+</button>
                                        <button id="done" onClick={this.done} data-dismiss="modal" >Done</button>

                                    </div>}

                                </div>
                                {/* </form> */}
                            </div>

                        </div>
                    </div>
                </div >
            </React.Fragment>
        );
    }
} export default PrivateModal;