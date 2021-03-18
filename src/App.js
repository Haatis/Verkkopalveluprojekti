import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import Home from './Home';
import About from './About';
import NotFound from './NotFound';
import ContactUs from './ContactUs';
import NavBar from './NavBar';
import Footer from './Footer';
import Content from "./Content";


function App() {
  return (
    <>
    <div className="container">
   <NavBar />
     <Switch>
       <Route path="/" component={Home} exact />
       <Route path="/content" component={Content} exact />
       <Route path="/about" component={About} />
       <Route path="/contactus" component={ContactUs} />
       <Route component={NotFound} />
     </Switch>
   <Footer />
   </div>
   </>
  );
}

export default App;
