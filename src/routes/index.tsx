import React from 'react'
import { Route, Switch,BrowserRouter as Router, Redirect } from 'react-router-dom'
import Cart from '../pages/Cart'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Product from '../pages/Product'
import ProductList from '../pages/ProductList'
import Register from '../pages/Register'

const Index = () => {
  const user = true
  return (
    <Router>
      <Switch>
        <Route exact path="/">
           <Home />
        </Route>
        <Route path="/products/:category">
            <ProductList />
        </Route>
        <Route path="/product/:id">
            <Product />
        </Route>
        <Route path="/cart">
            <Cart />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
        <Route path="/login">
            {user ? <Redirect to='/' />: <Login />}
        </Route>
      </Switch>
    </Router>
  )
}

export default Index
