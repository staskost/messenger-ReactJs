import React, { Component } from 'react';
import UserContext from './context/user-context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserNav from './components/UserNav'
import { LoginModalBody } from './components/Auth';
import { LogoutModalBody } from './components/LogoutModalBody';
import Inbox from './components/Inbox';
import Outbox from './components/Outbox'
import Main from './components/Main';
import Register from './components/Register';
import SendMessage from './components/SendMessage';
import Footer from './components/Footer';

class App extends Component {

  constructor(props) {
    super(props);
    this.updateUserContext = () => {
      this.setState(() => ({
        isLoggedIn: localStorage.getItem('token') ? true : false,
        token: localStorage.getItem('token') && localStorage.getItem('token'),
        userInfo: localStorage.getItem('token') && JSON.parse(localStorage.getItem('userInfo')),
      }));
    };
    this.state = {
      isLoggedIn: this.props.userProps ? true : false,
      token: this.props.userProps ? this.props.userProps.token : '',
      userInfo: this.props.userProps ? this.props.userProps.userInfo : {},
      updateUserContext: this.updateUserContext
    };
  }
  
  render() {
    return (
      <Router>
        <UserContext.Provider value={this.state}>
          <UserNav history={this.history}/>
          <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/messages"  exact component={Inbox} />
          <Route path="/messages/out" exact component={Outbox} />
          <Route path="/send" exact component={SendMessage} />
          <Route path="/login" exact component={LoginModalBody} />
          <Route path="/logout"  exact component={LogoutModalBody} />
          <Route path="/register" exact component={Register} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </Router>
    );
  }
}


export default App;
