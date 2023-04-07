import React from "react";
import './App.css'
import Header from "./components/common/Header";
import List from "./components/list/List";
import Details from "./components/details";
import NotFound from "./components/notFound";
import {BrowserRouter, Route, Routes} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <div>
    <Header/>
    <Routes>
      <Route exact path={'/'} element={<List/>}/>
      <Route path={'/currency/:id'} element={<Details/>}/>
      <Route path={'*'} element={<NotFound/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
