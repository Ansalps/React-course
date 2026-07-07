import axios from 'axios';
import {Routes,Route} from 'react-router';
import { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackPackage } from './pages/TrackPackage';
import { NotFound } from './pages/Not Found';
import './App.css'

function App() {
  
const [cart, setCart] = useState([]);
useEffect(()=>{
  axios.get('http://localhost:3000/api/cart-items?expand=product')
            .then((response)=>{
                setCart(response.data);
            })
            .catch((error) => {
              console.error("Error fetching cart data:", error);
            });
},[])
  return (
    <>
        <Routes>
          <Route index element={<HomePage cart={cart}/>} />
          <Route path='checkout' element={<CheckoutPage cart={cart}/>} />
          <Route path='orders' element={<OrdersPage/>}/>
          <Route path='/tracking' element={<TrackPackage/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
    </>
  )
}

export default App
