import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
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
import ErrorBoundary from "./ErrorBoundry";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn:false,
      user:null,
      isVerifying: true,
      isAuthor:true,
    }
  }
  
  componentDidMount(){
    const storagekey = localStorage[localstoragkey];

    if(storagekey){
      fetch(userVerifyURL, {
        method :'GET',
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
      .then(({user}) => this.updateUser(user));
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
    const {isLoggedIn, user,isVerifying,isAuthor} = this.state;
    if(isVerifying) {
      <FullPageSpener/>
    } else {
      return (
        <>
          <ErrorBoundary>
            <Header isLoggedIn={isLoggedIn} user={user}/>
            {
              isLoggedIn 
                ? <AuthenticatedApp changeTab={this.changeTab} isAuthor={isAuthor} logout={this.logout}  user={user}   /> 
                : <UnauthenticatedApp updateUser={this.updateUser} user={user} />
            }
          </ErrorBoundary>
        </>
      )
    }
  }
}

function AuthenticatedApp (props) {

  return 
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
}

function UnauthenticatedApp (props) {
  return 
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
}

export default withRouter(App);
