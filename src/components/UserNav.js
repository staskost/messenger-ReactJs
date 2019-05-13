import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavMenu from './NavMenu';
import { LoginModalBody } from './Auth';
import { LogoutModalBody } from './LogoutModalBody';
import SendMessage from './SendMessage';
import Header from './Header';
import Register from './Register'

// const NavLink = props => {
//     const link = <Link className="nav-link" to={props.to}>{props.label}</Link>;
//     if (props.to === props.location) {
//         return <li className="nav-item active">{link}</li>
//     }
//     else {
//         return <li className="nav-item">{link}</li>
//     }
// }

class Nav extends Component {

    render() {
        return (
            <React.Fragment>
                < Header>
                    <NavMenu />
                </Header>
                    <LogoutModalBody history={this.props.history} />
                    <LoginModalBody history={this.props.history} />
                    <SendMessage users={this.props.users} />
            </React.Fragment>
        );
    }

}

export default withRouter(Nav);