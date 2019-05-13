import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserContext from '../context/user-context';
import NotificationsNav from './NotificationsNav';

// const NavLink = props => {
//     const link = <Link className="nav-link" to={props.to}>{props.label}</Link>;
//     if (props.to === props.location) {
//         return <li className="nav-item active">{link}</li>
//     }
//     else {
//         return <li className="nav-item">{link}</li>
//     }
// }

class NavMenu extends Component {

    static contextType = UserContext;

    render() {
        if (this.context.isLoggedIn) {
            if (this.context.userInfo.role.id === 3) {
                return (<React.Fragment>
                    <div className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle active" id="navbarProfileDropdownMenuLink" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <span style={{ color: "white" }}>{this.context.userInfo.username}</span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarProfileDropdownMenuLink">
                            <Link className="dropdown-item" to="/messages/">My Inbox Messages</Link>
                            <Link className="dropdown-item" to="/messages/out">My Outbox Messages</Link>
                            <a className="dropdown-item" data-toggle="modal" data-target="#newMessageModal" href="#newMessageModal">Send New Message</a>
                            <Link className="dropdown-item" to="/admin">Admin Page</Link>
                            <Link className="dropdown-item" to="/chat">Chat</Link>
                            <a className="dropdown-item" data-toggle="modal" data-target="#logoutModal" href="#logoutModal">Logout</a>
                        </div>
                    </div>
                    <NotificationsNav />
                </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle active" id="navbarProfileDropdownMenuLink" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <span style={{ color: "white" }}>{this.context.userInfo.username}</span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarProfileDropdownMenuLink">
                                <Link className="dropdown-item" to="/messages/">My Inbox Messages</Link>
                                <Link className="dropdown-item" to="/messages/out">My Outbox Messages</Link>
                                <a className="dropdown-item" data-toggle="modal" data-target="#newMessageModal" href="#newMessageModal">Send New Message</a>
                                <Link className="dropdown-item" to="/chat">Chat</Link>

                                <a className="dropdown-item" data-toggle="modal" data-target="#logoutModal" href="#logoutModal">Logout</a>
                            </div>
                        </li>
                        <NotificationsNav />
                    </React.Fragment>
                );
            }
        }
        else {
            return (
                <React.Fragment>
                    <div className="nav-item">
                        <a className="nav-link" data-toggle="modal" data-target="#loginModal" href="#loginModal">Login</a>
                    </div>
                    <div className="nav-item">
                        <a className="nav-link" href="/register">Register</a>
                    </div>
                </React.Fragment>
            );
        }
    }
}
export default withRouter(NavMenu);