import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import Home from './Home';
import About from './About';
import NotFound from './NotFound';
import ContactUs from './ContactUs';
import NavBar from './NavBar';
import Header from './Header';
import Footer from './Footer';


function App() {
  return (
    <>
   <NavBar />
   <div className="container">
     <Switch>
       <Route path="/" component={Home} exact />
       <Route path="/about" component={About} />
       <Route path="/contactus" component={ContactUs} />
       <Route component={NotFound} />
     </Switch>
   </div>
   <Footer />
   </>
  );
}

export default App;
