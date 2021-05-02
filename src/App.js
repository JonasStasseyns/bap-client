import React from 'react'
import './App.css';
import Header from "./components/Header";
import Home from "./pages/Home"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import TechnicianList from "./pages/Technicians/TechnicianList";
import TechnicianDetail from "./pages/Technicians/TechnicianDetail";
import ProductList from "./pages/Products/ProductList";
import ProductDetail from "./pages/Products/ProductDetail";
import Login from "./pages/auth/Login";
import Account from "./pages/auth/Account";
import {adminJWT, verifyJWT} from "./utils/JWT";
import Redirect from "./utils/Redirect";
import SocketLogin from "./pages/auth/SocketLogin";
import Wizard from './pages/Wizard'
import Messages from "./pages/Messages";
import Register from "./pages/auth/Register";
import TechnicianManagement from "./pages/Technicians/TechnicianManagement";
import AddProduct from "./pages/admin/addProduct";
import CatchAll from "./pages/404";
import Logout from "./pages/auth/Logout";
import Cart from "./pages/Products/Cart";
import Payment from "./pages/Payment"
import PasswordReset from "./pages/auth/PasswordReset";
import Advice from "./pages/auth/Advice"
import EditProduct from "./pages/admin/editProduct";
import {socket, SocketContext} from './context/socket';


function App() {
    return (
        <SocketContext.Provider value={socket}>
            <div className="App">
                <Header/>
                <Router>
                    <Switch>
                        <Route path='/' exact component={Home}/>

                        <Route path='/products' exact component={ProductList}/>
                        <Route path='/products/advice' exact component={ProductList}/>
                        <Route path='/products/:id' exact component={ProductDetail}/>
                        <Route path='/cart' exact component={Cart}/>

                        <Route path='/techs' exact component={TechnicianList}/>
                        <Route path='/techs/:id' exact component={TechnicianDetail}/>
                        <Route path='/techs/manage' exact component={TechnicianManagement}/>

                        <Route path='/auth/register' exact component={Register}/>
                        <Route path='/auth/login' exact component={Login}/>
                        <Route path='/auth/logout' exact component={Logout}/>
                        <Route path='/auth/login/:destination' exact component={Login}/>
                        <Route path='/auth/socket-login/:sid' exact component={SocketLogin}/>
                        <Route path='/auth/reset-password/:token' exact component={PasswordReset}/>
                        <Route path='/auth/account' exact render={() => (verifyJWT() ? (<Account/>) : (
                            <Redirect to="/auth/login" destination='auth/account'/>))}/>
                        <Route path='/auth/account/advice' exact render={() => (verifyJWT() ? (<Advice/>) : (
                            <Redirect to="/auth/login" destination='auth/account'/>))}/>

                        <Route path='/admin/add-product' exact render={() => (verifyJWT() ? (<AddProduct/>) : (
                            <Redirect to="/auth/login" destination='admin/add-product'/>))}/>
                        <Route path='/admin/edit-product/:id' exact render={() => (verifyJWT() ? (<EditProduct/>) : (
                            <Redirect to="/auth/login" destination='admin/add-product'/>))}/>

                        <Route path='/wizard' exact component={Wizard}/>

                        <Route path='/messages' exact
                               render={() => (adminJWT() ? (<Messages/>) : (<Home/>))}/>
                        <Route path='/messages/:correspondant' exact
                               render={() => (adminJWT() ? (<Messages/>) : (<Home/>))}/>

                        <Route path='/payment' exact render={Payment}/>))} />

                        <Route component={CatchAll}/>
                    </Switch>
                </Router>
            </div>
        </SocketContext.Provider>
    )
}

export default App;
