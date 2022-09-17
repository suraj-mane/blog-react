import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import Login from "./Login";
import NoMatch from "./NoMatch";
import Signup from "./Signup";
import SingleArticle from "./SingleArticle";
import { localstoragkey,userVerifyURL } from "../utils/Constant";
import FullPageSpener from "./FullPageSpener";
import NewPost from "./NewPost";
import Profile from "./Profile";
import Settings from "./Settings";
import { withRouter } from 'react-router';


class App extends React.Component {
  state = {
    isLoggedIn:false,
    user:null,
    isVerifying: true,
    isAuthor:true,
  }
  
  componentDidMount(){
    let storagekey = localStorage[localstoragkey];
    if(storagekey){
      fetch(userVerifyURL, {
        method:'GET',
        headers: {
          Authorization: `Token ${storagekey}`,
        },
      }).then((res) => {
        if(res.ok){ 
          return res.json();
        }
        return res.json().then(({ errors }) => {
          return Promise.reject(errors);
        })
      })
      .then(({user}) => this.updateUser(user))
      .catch((errors) => console.log(errors))
    } else {
      this.setState({isVerifying:false});
    }
  }

  updateUser = (user) => {
    this.setState({isLoggedIn:true, user, isVerifying:false});
    localStorage.setItem(localstoragkey,user.token);
  }

  logout = () => {
    localStorage.clear();
    this.setState({isLoggedIn:false});
    this.props.history.push('/');
  }

  changeTab = () => {
    this.setState({isAuthor:false})
  }

  render(){
    let {isLoggedIn, user,isVerifying,isAuthor} = this.state;
    if(isVerifying) {
      <FullPageSpener/>
    } else {
      return (
        <>
          <Header isLoggedIn={isLoggedIn} user={user}/>
          {
            isLoggedIn 
              ? <AuthenticatedApp user={user} isAuthor={isAuthor} logout={this.logout} changeTab={this.changeTab}/> 
              : <UnauthenticatedApp user={user} updateUser={this.updateUser}/>
          }
        </>
      )
    }
  }
}

function AuthenticatedApp(props){
  return(
    <Switch>
      <Route path="/" exact>
          <Hero/>
      </Route>
      <Route path="/new-post" exact>
        <NewPost/>
      </Route> 
      <Route path="/new-post/:slug">
        <NewPost/>
      </Route>
      <Route path="/profile" exact>
        <Profile user={props.user}/>
      </Route>
      <Route path="/profile/:username">
        <Profile user={props.user}/>
      </Route>
      <Route path="/setting">
        <Settings user={props.user} logout={props.logout} isAuthor={props.isAuthor} changeTab={props.changeTab}/>
      </Route>
      <Route path="/article/:slug">
        <SingleArticle user={props.user}/>
      </Route>
      <Route path="*">
          <NoMatch/>
      </Route>
    </Switch>
  )
}

function UnauthenticatedApp(props){
  return (
    <Switch>
      <Route path="/" exact>
          <Hero/>
      </Route> 
      <Route path="/login">
          <Login updateUser={props.updateUser}/>
      </Route>
      <Route path="/signup">
          <Signup updateUser={props.updateUser}/>
      </Route>
      <Route path="/article/:slug">
        <SingleArticle/>
      </Route>
      <Route path="*">
          <NoMatch/>
      </Route>
    </Switch>
  )
}

export default withRouter(App);
