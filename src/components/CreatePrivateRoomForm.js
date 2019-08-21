import React from 'react'
import UserContext from '../context/user-context';

//not used
class CreatePrivateRoomForm extends React.Component {

    static contextType = UserContext;

    constructor() {
        super()
        this.state = {
            userName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e) {
        this.setState({
            userName: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        this.props.createPrivateRoom(this.context.userInfo.username, this.state.userName)
        this.setState({userName: ''})
    }

    render () {
        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.userName}
                        onChange={this.handleChange}
                        type="text" 
                        placeholder="Create a private chat" 
                        required />
                    <button id="create-private-room-btn" type="submit">+</button>
            </form>
        </div>
        )
    }
}
export  default CreatePrivateRoomForm