import './App.css';
import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import AboutMe from './components/About/AboutMe';
import { body } from 'express-validator';


class App extends React.Component {
  state = {
    data: null, 
    token: null,
    user: null,
  }

  componentDidMount(){
    axios.get('http://localhost:5000').then((response) => {
      this.setState({
        data: response.data
      })
    })

    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
    })

    this.authenticateUser();
  }

  authenticateUser = () => {
    const token = localStorage.getItem('token');

    if(!token) {
      localStorage.removeItem('user');
      this.setState({ user: null });
    }

    if (token) {
      const config = {
        headers: {
          'x-auth-token': token
        }
      }

      axios.get('http://localhost:5000/api/auth', config)
            .then((response) => 
            {
            localStorage.setItem('user', response.data.name)
            this.setState({user: response.data.name})
            })
      .catch ( (error) => {
        localStorage.removeItem('user');
        this.setState({user: null});
        console.error(`Error logging in: ${error}`);
      })

    }
  }

  logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({ user: null, token: null });
  }
  

  render(){

    let { user, data } = this.state;
    const authProps = {
      authenticateUser: this.authenticateUser
    }

    return (
      <Router>
          <div className = "App" >
            
            <header className = "App-header">
              <div class = "title5">
                  <h1 class = "reg2"> Cool Cover Art For Albums 2021 </h1>
              </div>
            <ul>
              <li> <Link class = "home" to = "/"> Home</Link></li>
              <li><Link class = "register" to = "/register">  Register</Link></li>
              <li> 
                { user ?
                <Link class = "logout" to = "" onClick = {this.logOut}> Log out</Link> :
                <Link class = "login" to = "/login"> Login</Link>
                }
              </li>
              <li><Link class = "aboutme" to = "/about">About Me</Link></li>
            </ul>
            </header>

            <main>
              <Route exact path = "/"> 
              {user ?
                <React.Fragment>
                  <div class = "hello"> <h1 class = "helloo"> Hello {user}! </h1> </div>
                  

                  <div class="sign">
                        <h3 class="fast-flicker">Co</h3>ve<h3 class="flicker">r_</h3>Art
                  </div>
                  <br></br>
                     <>
                  
                        {Object.entries(cache).map(module => {
                            const image = module[1].default;
                            const name = module[0].replace("./","");
                            return (
                                <div style={{float: 'left', padding: 10, margin: 10, border: '2px solid white' }}>
                                    <img style={{width: 100, margin: 'auto', display: 'block'}} src={image}/>
                                    <p>{name}</p>
                                </div>
                            )
                        })}
                    </>
                 
                  <body id = "LoggedIn"></body>
                </React.Fragment> :
                <React.Fragment>
                  <div class = "title">
                      <h1 class = "reg">Please Register or login</h1>
                  </div>
                  <body id = "Home"></body>
                </React.Fragment>}
              </Route>

              <body id = "backall"></body>

              <Switch>
                <Route exact path = "/register" 
                render = {() => <Register {...authProps} />} />

                <Route exact path = "/login" 
                render = {() => <Login {...authProps} />} />

                <Route exact path = "/about" 
                render = {() => <AboutMe {...authProps} />} />
              </Switch>

            </main>
          </div>  
      </Router>
    );
  }
}

const cache = {};

function importAll(r) {
    r.keys().forEach((key) => (cache[key] = r(key)));
}

importAll(require.context("./Home Images", false, /\.(png|jpe?g|svg)$/));

const images = Object.entries(cache).map(module => module[1].default);

export default App;
