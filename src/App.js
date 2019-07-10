import React, { Component } from 'react';
import UserContext from './context/user-context';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import UserNav from './components/UserNav'
import { LoginModalBody } from './components/Auth';
import { LogoutModalBody } from './components/LogoutModalBody';
import Inbox from './components/Inbox';
import Outbox from './components/Outbox'
import Main from './components/Main';
import Register from './components/Register';
import SendMessage from './components/SendMessage';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Chat from './components/Chat';
import GroupChat from './components/GroupChat';
import AdminUsersInbox from './components/AdminUsersInbox';
import AdminUsersOutbox from './components/AdminUsersOutbox';
import AdminInboxMessages from './components/AdminInboxMessages';
import AdminOutboxMessages from './components/AdminOutboxMessages'
import MyAccount from './components/MyAccount';


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
      updateUserContext: this.updateUserContext,
      users:[]
    };
  }


  renderProtectedComponent(ProtectedComponent) {
    if (this.state.isLoggedIn) {
        return  (props) => <ProtectedComponent {...props}/>;
    }
    else {
        return (props) => <Redirect to='/' />;
    }
}
  
  render() {
    return (
      <Router>
        <UserContext.Provider value={this.state}>
          <UserNav history={this.history}/>
          <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/messages"  exact render={this.renderProtectedComponent(Inbox)} />
          <Route path="/messages/out" exact render={this.renderProtectedComponent(Outbox)} />
          <Route path="/chat"  exact render={this.renderProtectedComponent(Chat)} />
          <Route path="/group-chat"  exact render={this.renderProtectedComponent(GroupChat)} />
          <Route path="/admin"  exact render={this.renderProtectedComponent(Admin)} />
          <Route path="/admin/user/inbox/:id" exact render={this.renderProtectedComponent(AdminInboxMessages)} />
          <Route path="/admin/user/outbox/:id" exact render={this.renderProtectedComponent(AdminOutboxMessages)} /> 
          <Route path="/profile" exact render={this.renderProtectedComponent(MyAccount)} />
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
