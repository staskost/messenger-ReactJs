import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { default as Chatkit } from '@pusher/chatkit-server';


const chatkit = new Chatkit({
    instanceLocator: "v1:us1:c69e97bb-eef9-4f5c-810f-951156e74f79",
    key: "cdeb1880-05fb-4130-8ec2-283082b425c8:XQ45JxNvzSfR3LFtsPgFOHQz33UXeztWtH8v+3XdWV4="
  })
  
class Register extends Component {

    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.username = React.createRef();
        this.password = React.createRef();
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            regError: false
        }
    }
    createChatkitUser(){
        const username = this.username.current.value;
        chatkit.createUser({
            id: username,
            name: username,
            }).catch((err) => {
                console.log(err.status);
              
            });
    }

    handleSubmit = (event) => {
        const url = 'http://localhost:8080/register/save';
        const formData = {
            "username": this.username.current.value,
            "password": this.password.current.value,
            "email": this.email.current.value,
            "firstName": this.firstName.current.value,
            "lastName": this.lastName.current.value,
            "role": {
                "id": 1
            }
        };

        console.log('Submitting...', formData);

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            if (response.status === 200) {
                alert("Register Successful");
                this.createChatkitUser();
                this.props.history.push('/');
            } else if (response.status === 400) {
                response.json().then(data => {
                    this.setState({ regError: data.message });
                })
            } else {
                alert("Unknown Error...");
            }
        }).catch(error => console.error('Error:', error));

        event.preventDefault();
    }
    render() {
        return (
            <React.Fragment>
                <div className="container col-8">
                    <div className="text-center"><h1 className="mx-auto">Register</h1>
                    {this.state.regError && <h4 style={{ color: 'red' }}>{this.state.regError}</h4>}
                    </div>
                    <form onSubmit={this.handleSubmit} className="pt-3 pb-2">
                        <div className="form-group row justify-content-center">
                            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-4">
                                <input type="email" className="form-control" id="email" name="email" placeholder="email@mail.com"
                                    required ref={this.email} />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label htmlFor="email" className="col-sm-3 col-form-label">Username</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="username" name="username" required ref={this.username} />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Password</label>
                            <div className="col-sm-4 ">
                                <input type="password" className="form-control" id="inputPassword" name="password" minLength="8"
                                    aria-describedby="passwordHelpBlock" required ref={this.password} />
                                <small id="passwordHelpBlock" className="form-text text-muted">
                                    At least 8 characters long
                            </small>
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                        </div>
                        <div className="form-group row justify-content-center">
                            <label htmlFor="firstName" className="col-sm-3 col-form-label">First Name</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="firstName" name="firstName" required ref={this.firstName} />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label htmlFor="lastName" className="col-sm-3 col-form-label">Last Name</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="lastName" name="lastName" required ref={this.lastName} />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-3">
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Register);

