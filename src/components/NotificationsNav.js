import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContext from '../context/user-context';

class NotificationsNav extends Component {

    static contextType = UserContext;


    state = {
        newMessagesCount: 0,
        visible: false
    }
    componentDidMount() {
        this.getNewMessages();
    }

    checkNewNotificationsExist = () => {
        if (this.state.newMessagesCount === 0) {
            this.setState({ visible: false });
        } else this.setState({ visible: true });
    }

    getNewMessages = () => {
        // $.ajax({
        //     type: "GET",
        //     url: 'http://localhost:8080/messages/unread',
        //     headers: { "X-MSG-AUTH": this.context.token },
        //     dataType: "json",
        //     async: true,
        //     success: result => {
        //         this.setState({
        //             newMessagesCount: result.count
        //         }, () => this.checkNewNotificationsExist());
        //     },
        //     error: () => { }
        // });

        const url = 'http://localhost:8080/messages/unread';

        fetch(url, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': this.context.token
            },
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                response.json().then( result => {
                    this.setState({
                        newMessagesCount: result.count
                    }, () => this.checkNewNotificationsExist());
                })
            }
        }).catch(error => console.error('Error:', error));
    }


setMessagesSeen = () => {
    const url = 'http://localhost:8080/messages/setAllMessagesRead'
    fetch(url, {
        method: 'POST',
        headers: {
            'X-MSG-AUTH': this.context.token
        },
    }).then(response => {
        console.log('Response status:', response.status);
        if (response.status === 200) {
            this.setState({
                newMessagesCount: 0
            }, () => this.checkNewNotificationsExist());
        }

    }).catch(error => console.error('Error:', error));
}
//     $.ajax({
//         type: "POST",
//         url: `http://localhost:8080/messages/setAllMessagesRead`,
//         headers: { "X-MSG-AUTH": this.context.token },
//         async: true,
//         success: () => {
//             this.setState({
//                 newMessagesCount: 0
//             }, () => this.checkNewNotificationsExist());
//         },
//         error: () => { }
//     });
// }

render() {
    if (!this.state.visible) return null;
    return (
        <React.Fragment>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle active" id="navbarProfileDropdownMenuLink" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" style={{ color: 'yellow' }}>
                    <FontAwesomeIcon icon="bell" />
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarProfileDropdownMenuLink" >

                    <Link onClick={this.setMessagesSeen.bind(this)} class="dropdown-item" to="/messages">
                        {"New Messages: " + this.state.newMessagesCount}
                    </Link>
                </div>
            </li>
        </React.Fragment>
    );
}
}

export default NotificationsNav;