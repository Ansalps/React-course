import {Routes,Route} from 'react-router';
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackPackage } from './pages/TrackPackage';
import { NotFound } from './pages/Not Found';
import './App.css'

function App() {
  

  return (
    <>
        <Routes>
          <Route index element={<HomePage/>} />
          <Route path='checkout' element={<CheckoutPage/>} />
          <Route path='orders' element={<OrdersPage/>}/>
          <Route path='/tracking' element={<TrackPackage/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
    </>
  )
}

export default App
