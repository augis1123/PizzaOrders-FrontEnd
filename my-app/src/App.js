import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import OrderList from './Pages/OrderList';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/">
        <Route inded element={<Home></Home>}/>
        <Route path="home" element={<Home />} />
        <Route path="home/orderlist" element={<OrderList />} />
      </Route>

      </Routes>
    </Router>
  );
}

export default App;
