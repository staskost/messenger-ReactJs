import React from 'react'


class NewPrivateGroupChatForm extends React.Component {


    constructor() {
        super()
        this.state = {
            roomName: '',
            userName: '',
            isCreated: false,
            // roomId: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeForUser = this.handleChangeForUser.bind(this)
        this.addUser = this.addUser.bind(this)
        this.done = this.done.bind(this)
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
        this.props.createPrivateRoomForGroupChat(this.state.roomName, this.props.roomId)
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

    done(){
        this.setState({
            isCreated: false,
            roomName: ''
        })
    }



    render() {
        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                    <input
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
                    <button id="done" onClick={this.done}>Done</button>

                </div>}

            </div>
        )
    }
}
export default NewPrivateGroupChatForm