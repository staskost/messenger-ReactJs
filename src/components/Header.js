import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Header extends Component {

    
    render() {
        
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top py-4">
                <div className="container">
                <Link className="navbar-brand" to="/"><strong>Messenger</strong></Link>
                    <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                        {this.props.children}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;