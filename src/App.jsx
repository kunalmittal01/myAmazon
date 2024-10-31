import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/navbar'
import Carousel from './components/carousel/carousel'
import Product from './components/products/product'
import Products from './components/products/Products'
import Footer from './components/footer/footer'
import Layout from './Layout'
import store from './store'
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={store} >
        <Layout />
      </Provider>
    </>
  )
}

export default App
