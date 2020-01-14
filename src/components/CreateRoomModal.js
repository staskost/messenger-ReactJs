import React, { Component } from 'react';
import UserContext from '../context/user-context';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

class CreateRoomModal extends Component {

    static contextType = UserContext;


    constructor(props) {
        super(props);
        this.name = React.createRef();
        this.user = React.createRef();
        this.state = {
            users: [],
            groupUsers: [],
            isPrivate: false,
            exists: false
        }
        this.addUser = this.addUser.bind(this);
        this.createPrivate = this.createPrivate.bind(this);
        this.createPublic = this.createPublic.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.cancelRoomCreation = this.cancelRoomCreation.bind(this);
    }

    onPrvChecked = (e) => {
        this.setState({
            isPrivate: true
        });
    }

    onPublicChecked = (e) => {
        this.setState({
            isPrivate: false
        });
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

    addUser = (groupUser) => {
        this.setState({
            groupUsers: [...this.state.groupUsers, groupUser]
        })
        console.log(this.name.current.value)
        document.getElementById("addUser").value = '';
    }

    createPrivate = (name, groupUsers) => {
        if (document.getElementById("name").value === '') {
            alert("Room name is mandatory")
        } else {
            this.props.createPrivate(name, groupUsers);
            this.setState({
                groupUsers: [],
                isPrivate: false
            })
            document.getElementById("name").value = '';
        }

    }

    createPublic = (name) => {
        if (document.getElementById("name").value === '') {
            alert("Room name is mandatory")
        } else {
            this.props.createRoom(name)
            document.getElementById("name").value = ''
        }
    }

    cancelRoomCreation = () => {
        this.setState({
            groupUsers: [],
            isPrivate: false
        })
        document.getElementById("name").value = '';
    }

    render() {
        const roomIcon = !this.state.isPrivate ? ' 🌐' : ' 🔒';
        const roomStatus = !this.state.isPrivate ? <strong>Public</strong> : <strong>Private</strong>;
        return (
            <React.Fragment>
                {/* <button type="button" className="btn btn-secondary btn-sm new-room-form button " data-toggle="modal" data-target={"#PrivateRoomModal"}>Create a Room</button> */}
                <a href="#PrivateRoomModal" className="btn btn-dark active new-room-form button col-sm-11 " data-toggle="modal" role="button" aria-pressed="true">Create a new room</a>
                <div className="modal fade" id="PrivateRoomModal" tabIndex="-1" role="dialog" aria-labelledby="addUsers">
                    <div div className="modal-dialog " role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="PrivateRoomModalLabel">Create Room</h5>
                                <button onClick={this.cancelRoomCreation} className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div><h6>RoomStatus Now:</h6>{roomStatus}{roomIcon}</div>
                            <div className="modal-body">
                                {/* <form onSubmit={() =>this.create(this.name.current.value, this.state.groupUsers)}> */}
                                <div className="text-center">
                                    <div >
                                        <label htmlFor='name' className="col-form-label" style={{ color: "black" }}><strong>Name:</strong></label>
                                        <input type="text" className="form-control" id='name' ref={this.name} required ></input>
                                    </div>
                                    <hr></hr>
                                    <div>
                                        <RadioGroup vertical>
                                            <RadioButton onChange={this.onPrvChecked} value="">
                                                <h6 style={{ color: "black" }}>Private</h6>
                                            </RadioButton>
                                            <RadioButton onChange={this.onPublicChecked} value="">
                                                <h6 style={{ color: "black" }}>Public</h6>
                                            </RadioButton>
                                        </RadioGroup>
                                    </div>
                                    {this.state.isPrivate && <div>
                                        <h6>Room Users:</h6>
                                        {/* <div> {this.state.groupUsers+', '} </div> */}
                                        <div><strong>{`${this.state.groupUsers
                                            .slice(0, 10)
                                            .join(', ')}`}</strong></div>

                                        <div>
                                            <label htmlFor='addUsers' className="col-form-label">Add User</label>
                                            <input list="prv_users" type="addUser" className="form-control" id="addUser" name="addUser"
                                                ref={this.user} onChange={this.fetchUsers} />
                                            <datalist id="prv_users">
                                                {this.state.users.map((user, index) => {
                                                    return <option key={index} value={user.username} />;
                                                })}
                                            </datalist>
                                        </div>
                                        <div>
                                            <button type="button" className="btn btn-primary" onClick={() => this.addUser(this.user.current.value)}>Add</button>
                                        </div>
                                    </div>}
                                </div>
                                <div className=" modal-footer justify-content-center">
                                    <button className="btn btn-danger" onClick={this.cancelRoomCreation} data-dismiss="modal">Cancel</button>
                                    {/* <button  type="submit" className="btn btn-danger btn-block col-sm-4" data-dismiss="modal" >Submit</button> */}
                                    <button type="button" className="btn btn-primary" onClick={this.state.isPrivate ? () => this.createPrivate(this.name.current.value, this.state.groupUsers)
                                        : () => this.createPublic(this.name.current.value)} data-dismiss="modal" >Create</button>
                                </div>
                                {/* </form> */}
                            </div>

                        </div>
                    </div>
                </div >
            </React.Fragment>
        );
    }
}

export default CreateRoomModal;