import React, { useEffect } from 'react'
import './App.css';
import Header from "./components/Header";
import Home from "./pages/Home"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ProductList from "./pages/ProductList";
import openSocket from 'socket.io-client'


function App() {

    // const socket = openSocket('https://bap-express-js-nmd-2020-2021.glitch.me');
    const socket = openSocket('https://ad141a8d1e5e.ngrok.io');
    console.log(socket.connected)
    socket.on('connect', () => {
        console.log(socket.id)
        socket.emit('new-message', 'test')
    })

    return (
        <div className="App">
            <Header/>
            <Router>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/products' exact component={ProductList}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
