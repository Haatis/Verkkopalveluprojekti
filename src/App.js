import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
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
import Add from "./Add";
import Cart from "./Cart";
import Edit from "./Edit";
import Ask from "./Ask";
import Account from "./Account";
import { useHistory } from "react-router-dom";

const URL = "http://localhost/verkkokauppa/";

function App() {
  const [cart, setCart] = useState([])
  const [newCartArr, setNewCartArr] = useState([])
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)
  let history = useHistory();
  //hakee ostoskorin tiedot localsoragesta
  const localCart = localStorage.getItem("cart");
  let arr = JSON.parse(localCart);

  //poistaa cartin localstoragesta jos se on tyhjä, muuten näyttää virhettä fetchissä
  if ("cart" in localStorage) {
    if (arr.length === 0) {
      localStorage.removeItem("cart");
    }
  }

  //lisää uusi tuote ostoskoriin
  function addToCart(item) {
    const newCart = [...cart, item];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  //lataa ostoskorin localstoragesta sivun uudelleen lataamisen jälkeen
  useEffect(() => {
    if ("cart" in localStorage) {
      setCart(JSON.parse(localStorage.getItem("cart")))
    }
  }, [])



  //lisää yhden valitut tuotteen ostoskorista
  function addItem(item) {
    localStorage.removeItem("cart")
    arr.push(item)
    localStorage.setItem("cart", JSON.stringify(arr))
    setNewCartArr(arr);
    setCart(arr)
  }

  //poistaa yhden valitut tuotteen ostoskorista
  function removeItem(item) {
    localStorage.removeItem("cart")
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === item) {
        arr.splice(i, 1)
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(arr))
    setNewCartArr(arr);
    setCart(arr)
  }

//tyhjentää ostoskorin
  function emptyCart(e) {
    setCart([])
    localStorage.removeItem("cart")
  }


  //poistaa kaikki valitut tuotteet ostoskorista
  function clearItem(item) {
    localStorage.removeItem("cart")
    for (let i = 0; i < arr.length; i++) {
      //console.log(arr[i])
      if (arr[i] === item) {
        arr.splice(i, 1)
        i--
      }
    }
    localStorage.setItem("cart", JSON.stringify(arr))
    setNewCartArr(arr);
    setCart(arr)
  }

  useEffect(() => {
    if (user!=null){
      setAdmin(user.oikeudet)
    } 
  }, [user])

useEffect(() => {
  let status = 0;
      const config = {
      method: 'POST',
      credentials: 'include',
          headers: {
        'Accept' : 'application/json'
      }}
  fetch(URL + "getUser.php", config)
      .then((response) => {
          status = parseInt(response.status);
          return response.json();
      })
      .then(
          (response) => {
              if (status === 200) {
                setUser(response);
                setAdmin(response.oikeudet)
              }
          }
      );
}, []);


  
  return (

    <>
      <div className="container">
        <NavBar URL={URL} myCart={cart} emptyCart={emptyCart} setCart={setCart} user={user} setUser={setUser} admin={admin} setAdmin={setAdmin}/>
        <Switch>
          <Route path="/"
            render={() => <Home
              URL={URL}
              addToCart={addToCart} />}
            exact />
          <Route path="/search"
            render={() => <Search
              URL={URL}
              addToCart={addToCart} />} exact />
          <Route path="/category/:it"
            render={() => <Category
              URL={URL}
              addToCart={addToCart} />} exact />
          <Route path="/Cart"
            render={() => <Cart
              URL={URL}
              clearItem={clearItem}
              addItem={addItem}
              removeItem={removeItem}
              myCart={cart} />} />
          <Route path="/about" component={About} />
          <Route path="/contactus"
            render={() => <ContactUs
              URL={URL}
              user={user}/>} />
          <Route path="/product/:it"
            render={() => <Product
              URL={URL}
              addToCart={addToCart}
              user={user}
              admin={admin} />} />
          <Route path="/order"
          render={() => <Order
            URL={URL}
            user={user}
            setUser={setUser}
            emptyCart={emptyCart}
            />}  />
          <Route path="/class/:it"
            render={() => <Class
              URL={URL}
              addToCart={addToCart} />} exact />
          <Route path="/login" 
          render={() => <Login
            URL={URL}
            setUser={setUser}
            />}  />
          <Route path="/register"
                    render={() => <Register
                      URL={URL}
                      />}  />
          <Route path="/add"
            render={() => <Add
              URL={URL}
              admin={admin} 
              user={user}
              setUser={setUser}
              setAdmin={setAdmin}
              />} exact />
          <Route path="/edit/:it"
            render={() => <Edit
              URL={URL} 
              admin={admin}
              setUser={setUser} />} exact />
              <Route path="/ask/:it"
            render={() => <Ask
              URL={URL} />} exact />
               <Route path="/Account/:it"
            render={() => <Account
              URL={URL}
              user={user}
              setUser={setUser}
              />} exact />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
