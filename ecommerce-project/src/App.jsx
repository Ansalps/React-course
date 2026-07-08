import axios from 'axios';
import {Routes,Route} from 'react-router';
import { useState, useEffect } from 'react';
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackPackage } from './pages/TrackPackage';
import { NotFoundPage } from './pages/Not FoundPage';
import './App.css'

function App() {
  
const [cart, setCart] = useState([]);
useEffect(()=>{
  const fetchAppData=async ()=>{
    const response = await axios.get('http://localhost:3000/api/cart-items?expand=product')
    
  setCart(response.data);
  }
  
  fetchAppData();          
},[])
  return (
    <>
        <Routes>
          <Route index element={<HomePage cart={cart}/>} />
          <Route path='checkout' element={<CheckoutPage cart={cart}/>} />
          <Route path='orders' element={<OrdersPage cart={cart}/>}/>
          <Route path='/tracking/:orderId/:productId' element={<TrackPackage cart={cart}/>}/>
          <Route path='*' element={<NotFoundPage cart={cart}/>}/>
        </Routes>
    </>
  )
}

export default App
