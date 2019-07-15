import React from 'react'
import UserContext from '../context/user-context';

//Not used yet
class RoomUsersList extends React.Component {

    static contextType = UserContext;

    renderUsers() {
        return (
            // <div className="users-list">
            //     <h3>Users</h3>
            <ul>
                {this.props.users.map((user, index) => {
                    if (user.id === this.context.userInfo.username) {
                        return (
                            <WhosOnlineListItem key={index} presenceState="online">
                                {user.name} (You)
                            </WhosOnlineListItem>
                        )
                    }
                    return (
                        <WhosOnlineListItem key={index}>
                            {user.name}
                        </WhosOnlineListItem>
                    )
                })}
            </ul>

        )
        // </div>
    }
    render() {
        if (this.props.users) {
            return this.renderUsers()
        } else {
            return <p>Loading...</p>
        }
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
            <li style={styles.li}>
                {/* <div
                    style={{
                        ...styles.div,
                        backgroundColor:
                            this.props.presenceState === 'online' ? '#539eff' : '#414756',
                    }}
                /> */}

            </li>
        )
    }
}
export default RoomUsersList