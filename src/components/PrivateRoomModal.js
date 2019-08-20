import React, { Component } from 'react';
import UserContext from '../context/user-context';


class PrivateRoomModal extends Component {

    static contextType = UserContext;


    constructor(props) {
        super(props);
        this.name = React.createRef();
        this.user = React.createRef();
        this.state = {
            users: [],
            groupUsers: [],
        }
        this.addUser = this.addUser.bind(this);
        this.create = this.create.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
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

    addUser = ( groupUser) => {
        this.setState({
            groupUsers: [...this.state.groupUsers, groupUser]
        })
        console.log(this.name.current.value)
        document.getElementById("addUser").value = '';
    }

    create = (name, groupUsers) => {
        this.props.createPrivate(name, groupUsers);
        this.setState({
            groupUsers: []
        })
        document.getElementById("name").value = '';
        console.log("yeah")
        console.log(name)
        console.log(groupUsers)
    }

    //to be fixed
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
                                <div className="text-center">
                                    <div >
                                        <label htmlFor='name' className="col-form-label">Name:</label>
                                        <input type="text" className="form-control" id='name' ref={this.name} required ></input>
                                    </div>
                                    <div >
                                        <label htmlFor='addUsers' className="col-form-label">Add Users</label>
                                        <input list="prv_users" type="addUser" className="form-control" id="addUser" name="addUser"
                                            ref={this.user} onChange={this.fetchUsers} />
                                        <datalist id="prv_users">
                                            {this.state.users.map((user, index) => {
                                                return <option key={index} value={user.username} />;
                                            })}
                                        </datalist>
                                    </div>
                                </div>
                                <div>
                                    <button type="button" onClick={() => this.addUser(this.user.current.value)}>Add</button>
                                </div>
                                <div className=" modal-footer justify-content-center">
                                        {/* <button  type="submit" className="btn btn-danger btn-block col-sm-4" data-dismiss="modal" >Submit</button> */}
                                       <button  type="button" onClick={() =>this.create(this.name.current.value, this.state.groupUsers)} data-dismiss="modal" >Submit</button>
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

export default PrivateRoomModal;