import React, { Component } from 'react';
import UserContext from '../context/user-context';
import { Route , withRouter} from 'react-router-dom';

import { default as Chatkit } from '@pusher/chatkit-server';

const chatkit = new Chatkit({
  instanceLocator: "v1:us1:c69e97bb-eef9-4f5c-810f-951156e74f79",
  key: "cdeb1880-05fb-4130-8ec2-283082b425c8:XQ45JxNvzSfR3LFtsPgFOHQz33UXeztWtH8v+3XdWV4="
})

export class LoginModalBody extends Component {

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.handleLogin = this.handleLogin.bind(this);
    }

    static contextType = UserContext;

    createChatkitUser(){
        const username = this.context.userInfo.username;
        chatkit.createUser({
            id: username,
            name: username,
            }).catch((err) => {
                console.log(err.status);
              
            });
    }

    handleLogin(event) {
        console.log('Context value in handleLogin()', this.context);

        const url = 'http://localhost:8080/login/user';
        const loginData = {
            "username": this.username.current.value,
            "password": this.password.current.value
        }

        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(loginData), // data can be `string` or {object}!
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    localStorage.setItem('token', data.alphanumeric);
                    localStorage.setItem('userInfo', JSON.stringify(data.user));
                    this.context.updateUserContext();
                    this.createChatkitUser();
                    this.props.history.push('/');
                })
            } else {
                response.json().then(data => {
                    alert(data.message );
                })
            }
        }).catch(error => console.error('Error:', error));

        event.preventDefault();
    }

    render() {
        return (
            <div className="modal fade" id="loginModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">Login</h5>
                            <button className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <form action="" method="POST">
                            <div className="modal-body">
                                <div className="form-group col-sm-7 mx-auto text-center">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" name="username" ref={this.username} required />
                                </div>
                                <div className="form-group col-sm-7 mx-auto text-center">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" ref={this.password} required />
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="submit" className="btn btn-primary btn-block col-sm-4" data-dismiss="modal" onClick={this.handleLogin}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}




