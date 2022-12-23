import React from 'react';
import { BrowserRouter, Route, Routes as Rout } from 'react-router-dom';
import Carros from './pages/Carros';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Painel from './pages/Painel';

export default function Routes() {
  return (
    <BrowserRouter>
      <Rout>
        <Route path="/" exact element={<Carros/>} />
        <Route path="/login" exact element={<Logon/>} />
        <Route path="/register" exact element={<Register/>} />
        <Route path="/painel" exact element={<Painel/>} />
      </Rout>
    </BrowserRouter>
  );
}