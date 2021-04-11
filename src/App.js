import React, { useEffect } from 'react'
import './App.css';
import Header from "./components/Header";
import Home from "./pages/Home"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import TechnicianList from "./pages/Technicians/TechnicianList";
import openSocket from 'socket.io-client'
import TechnicianDetail from "./pages/Technicians/TechnicianDetail";
import ProductList from "./pages/Products/ProductList";
import ProductDetail from "./pages/Products/ProductDetail";
import Login from "./pages/auth/Login";
import Profile from "./pages/auth/Profile";
import {decodeJWT, verifyJWT} from "./utils/JWT";
import Redirect from "./utils/Redirect";
import SocketLogin from "./pages/auth/SocketLogin";
import Wizard from './pages/Wizard'
import Messages from "./pages/Messages";
import Register from "./pages/auth/Register";
import TechnicianManagement from "./pages/Technicians/TechnicianManagement";

function App() {


    const socket = openSocket(process.env.REACT_APP_SOCKET)
    const userData = decodeJWT()
    socket.on('connect', () => {
        socket.emit('register-chat', userData.userId)
    })



    console.log(verifyJWT())
    return (
        <div className="App">
            <Header/>
            <Router>
                <Switch>
                    <Route path='/' exact component={Home} />

                    <Route path='/products' exact component={ProductList} />
                    <Route path='/products/:id' exact component={ProductDetail} />

                    <Route path='/techs' exact component={TechnicianList} />
                    <Route path='/techs/:id' exact component={TechnicianDetail} />
                    <Route path='/techs/manage' exact component={TechnicianManagement} />

                    <Route path='/auth/register' exact component={Register} />
                    <Route path='/auth/login' exact component={Login} />
                    <Route path='/auth/login/:destination' exact component={Login} />
                    <Route path='/auth/socket-login/:sid' exact component={SocketLogin} />
                    <Route path='/account' exact render={() => (verifyJWT() ? (<Profile />):(<Redirect to="/auth/login" destination='account'/>))} />

                    <Route path='/wizard' exact component={Wizard} />

                    <Route path='/messages' exact render={() => (verifyJWT() ? (<Messages socket={socket} />):(<Redirect to="/auth/login"/>))} />
                    <Route path='/messages/:correspondant' exact render={() => (verifyJWT() ? (<Messages socket={socket} />):(<Redirect to="/auth/login"/>))} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
