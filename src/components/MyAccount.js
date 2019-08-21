import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from "jquery";
import UserContext from '../context/user-context';


class MyAccount extends Component {

    constructor(props) {
        super(props);
        // this.inputUsername = React.createRef();
        this.inputEmail = React.createRef();
        this.inputFirstName = React.createRef();
        this.inputLastName = React.createRef();
        this.state = {
            // username: '',
            email: '',
            firstName: '',
            lastName: '',
            photoLink: '',

        };
    }

    static contextType = UserContext;

    componentDidMount() {
        let user = this.context.userInfo;
        this.setState({
            photoLink: user.photoLink
        })
    }

    uploadPic = () => {
        let profilePicInput = document.getElementById("profilePicInput");
        let files = profilePicInput.files;
        if (files.length === 0) {
            alert("Please select a file");
        } else {
            var formData = new FormData();
            formData.append("file", files[0]);
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "http://localhost:8080/files/uploadFile",
                data: formData,
                processData: false,
                contentType: false,
                success: (response) => {
                    this.savePhotoLink(response.fileDownloadUri);
                },
                error: (error) => {
                    console.log(error);
                    // process error
                }
            });
        }

    }

    savePhotoLink = (link) => {
        let user = this.context.userInfo;
        $.ajax({
            type: "POST",
            contentType: "text/plain",
            url: `http://localhost:8080/files/savePhotoLink/${user.id}`,
            // headers: { "X-MSG-AUTH": token },
            data: link,
            async: true,
            success: () => {
                user.photoLink = link;
                localStorage.setItem("userInfo", JSON.stringify(user));
                this.context.updateUserContext();
                this.setState({
                    photoLink: link
                })
                alert("SUCCESFULLY UPLOADED");
            },
            error: () => { }
        });
    };

    // handleUpdateUsername = () =>{
    //     const newUsername = this.inputUsername.current.value;
    //     if ((newUsername !== "") && (newUsername !== this.context.userInfo.username)) {
    //         const url = 'http://localhost:8080/users/update-username/' + newUsername;
    //         fetch(url, {
    //             method: 'PUT',
    //             headers: {
    //                 'X-MSG-AUTH': this.context.token
    //             }
    //         }).then(response => {
    //             if (response.status === 200) {
    //                 let updatedUser = this.context.userInfo;
    //                 updatedUser.username = newUsername;
    //                 localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    //                 this.context.updateUserContext();
    //                 this.setState({ username: newUsername });
    //                 alert("Username updated successfully")
    //             } else {
    //                 response.json().then(data => {
    //                     alert(data.message );
    //                 })
    //             }
    //         }).catch(error => console.error('Error:', error));
    //     }
    // }

    handleUpdateEmail = () => {
        const newEmail = this.inputEmail.current.value;
        if ((newEmail !== "") && (newEmail !== this.context.userInfo.username)) {
            const url = 'http://localhost:8080/users/update-email/' + newEmail;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'X-MSG-AUTH': this.context.token
                }
            }).then(response => {
                if (response.status === 200) {
                    let updatedUser = this.context.userInfo;
                    updatedUser.email = newEmail;
                    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
                    this.context.updateUserContext();
                    this.setState({ email: newEmail });
                    alert("Email updated successfully")
                } else {
                    response.json().then(data => {
                        alert(data.message);
                    })
                }
            }).catch(error => console.error('Error:', error));
        }
    }

    handleUpdateFirstName = () => {
        const newFirstName = this.inputFirstName.current.value;
        if ((newFirstName !== "") && (newFirstName !== this.context.userInfo.firstName)) {
            const url = 'http://localhost:8080/users/update-email/' + newFirstName;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'X-MSG-AUTH': this.context.token
                }
            }).then(response => {
                if (response.status === 200) {
                    let updatedUser = this.context.userInfo;
                    updatedUser.firstName = newFirstName;
                    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
                    this.context.updateUserContext();
                    this.setState({ firstName: newFirstName });
                    alert("First name updated successfully")
                } else {
                    response.json().then(data => {
                        alert(data.message);
                    })
                }
            }).catch(error => console.error('Error:', error));
        }
    }

    handleUpdateLastName = () => {
        const newLastName = this.inputLastName.current.value;
        if ((newLastName !== "") && (newLastName !== this.context.userInfo.lastName)) {
            const url = 'http://localhost:8080/users/update-email/' + newLastName;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'X-MSG-AUTH': this.context.token
                }
            }).then(response => {
                if (response.status === 200) {
                    let updatedUser = this.context.userInfo;
                    updatedUser.lastName = newLastName;
                    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
                    this.context.updateUserContext();
                    this.setState({ lastName: newLastName });
                    alert("Last name updated successfully")
                } else {
                    response.json().then(data => {
                        alert(data.message);
                    })
                }
            }).catch(error => console.error('Error:', error));
        }
    }
    render() {
        return (
            <div className="container py-3 my-3">
                <div className="form-row">

                    {/* <!-- Left Section --> */}
                    <div className="col-8">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputUsername">Username</label>
                                <input type="text" className="form-control" id="inputUsername" placeholder="Username" readOnly value={this.context.userInfo.username} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail">Email</label>
                                <input type="email" className="form-control" id="inputEmail" placeholder="Email" placeholder={this.context.userInfo.email} ref={this.inputEmail} />
                                <button type="button" className="btn btn-primary" onClick={this.handleUpdateEmail}>Update</button>

                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputFirstName">First Name</label>
                                <input type="text" className="form-control" id="inputLastName" placeholder="First name" placeholder={this.context.userInfo.firstName} ref={this.inputFirstName} />
                                <button type="button" className="btn btn-primary" onClick={this.handleUpdateFirstName}>Update</button>

                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputLastName">Last Name</label>
                                <input type="text" className="form-control" id="inputLastName" placeholder="Last name" placeholder={this.context.userInfo.lastName} ref={this.inputLastName} />
                                <button type="button" className="btn btn-primary" onClick={this.handleUpdateLastName}>Update</button>

                            </div>
                        </div>
                    </div>

                    {/* <!-- Right Section --> */}
                    <div className="container col-md-4 text-center p-5">
                        <div>
                            {this.context.userInfo.photoLink == '' || this.context.userInfo.photoLink == null ? <FontAwesomeIcon icon={["far", "user-circle"]} size="8x" /> : <img src={this.context.userInfo.photoLink} alt="Profile" style={{ width: "200px" }} />}
                        </div>
                        <div className="my-2">{this.context.userInfo.firstName + ' ' + this.context.userInfo.lastName}</div>
                        <div className="custom-file text-left">
                            <input type="file" className="custom-file-input" id="profilePicInput" accept=".jpg, .png, .gif, .jpeg" />
                            <label className="custom-file-label" htmlFor="profilePicInput">Upload Picture</label>
                        </div>
                        <button type="button" className="btn btn-primary btn-block my-3" onClick={this.uploadPic}>Save Picture</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default MyAccount;