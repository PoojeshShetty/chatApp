import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './page/login/Login';
import Signup from './page/signup/Signup';
import Home from './page/home/Home';
import ViewChat from './page/viewchat/ViewChat';
import NewChat from './page/newChat/NewChat';
import Profile from './page/profile/Profile';
import ViewProfile from './page/viewprofile/ViewProfile';
import { useAuth } from './hooks/useAuth';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {

  const {user, isAuthReady } = useAuth()

  if(!isAuthReady)
  return(
      <div className="App">
        <div className='loading--page'>
          <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
        </div>
      </div>
  )


  return (
    <div className="App">
        <div className="app__container">
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact>
            {user ? 
              <Redirect to="/home" /> :
              <Login />
            }
            </Route>

            <Route path="/signup" exact>
            {user ? 
              <Redirect to="/home" /> :
              <Signup />
            }
            </Route>

            <Route path="/home" exact>
            {user ? 
               <Home /> :
               <Redirect to="/login" />
            }
            </Route>

            <Route path="/viewchat/:chatid" >
            {user ? 
               <ViewChat /> :
               <Redirect to="/login" />
            }
            </Route>

            <Route path="/newchat" >
            {user ? 
               <NewChat /> :
               <Redirect to="/login" />
            }
            </Route>

            <Route path="/profile" >
            {user ? 
               <Profile /> :
               <Redirect to="/login" />
            }
            </Route>

            <Route path="/viewprofile/:id" >
            {user ? 
               <ViewProfile /> :
               <Redirect to="/login" />
            }
            </Route>

            <Route path="/" >
            {user ? 
               <Redirect to="/home" /> :
               <Redirect to="/login" />
            }
            </Route>

          </Switch>

        </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
