import React, { useState } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import Home from './Home';
import About from './About';
import NotFound from './NotFound';
import ContactUs from './ContactUs';
import NavBar from './NavBar';
import Footer from './Footer';
import Search from "./Search";
import Product from "./Product";
import Category from "./Category";
import Order from "./Order";
import Class from "./Class";
import Login from "./Login";
import Register from "./Register";




function App() {

 

  return (
    <>
    <div className="container">
   <NavBar />
     <Switch>
       <Route path="/" component={Home} exact />
       <Route path="/search" component={Search} exact />
       <Route path="/category/:it" component={Category} exact />
       <Route path="/about" component={About} />
       <Route path="/contactus" component={ContactUs} />
       <Route path="/product/:it" component={Product} />
       <Route path="/order" component={Order} />
       <Route path="/class/:it" component={Class} />
       <Route path="/login" component={Login} />
       <Route path="/register" component={Register} />
       <Route component={NotFound} />
     </Switch>
   <Footer />
   </div>
   </>
  );
}

export default App;
