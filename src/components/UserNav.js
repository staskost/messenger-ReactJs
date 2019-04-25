import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavMenu from './NavMenu';
import { LoginModalBody } from './Auth';
import { LogoutModalBody } from './LogoutModalBody';
import SendMessage from './SendMessage';


// const NavLink = props => {
//     const link = <Link className="nav-link" to={props.to}>{props.label}</Link>;
//     if (props.to === props.location) {
//         return <li className="nav-item active">{link}</li>
//     }
//     else {
//         return <li className="nav-item">{link}</li>
//     }
// }
const css = {
    fullWidth: {
        width: '100%'
    }
}

class Nav extends Component {

    render() {
        return (
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={css.fullWidth}>
                    <h3 style={{ color: "white" }}>Messenger</h3>
                        <NavMenu />
                        <LoginModalBody history={this.props.history}/>
                        <LogoutModalBody history={this.props.history}/>
                        <SendMessage users={this.props.users} fetchUsers={this.props.fetchUsers}/>
                </nav>
            </div>
        );
    }

}

export default withRouter(Nav);