import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import AllCats from "./components/AllCats";
import FavoriteCats from "./components/FavoriteCats";
import { Context } from "./context/context";
import React, { useState, useEffect } from "react";
import { dataFromServer } from './api/api'
import {getItemFromLocalStorage,setItemToLocalStorage} from './utils/utils'
function App() {
  const [isActive, setIsActive] = useState(true)
  const [favoriteCats, setFavoriteCats] = useState(
    getItemFromLocalStorage("favoriteCats") || []
    )
  const [cats, setCats] = useState([])
  const getCats = async () => {
    
    let result = await dataFromServer();
    setCats(prev => [...prev, ...result])
  }

  useEffect(() => {
    getCats()
    if (favoriteCats.length === 0) {
      setItemToLocalStorage("favoriteCats",[])
    }
  }, []);
  const getFavoriteCats= (cat) => {

    if (favoriteCats.find((item) => item.id === cat.id)) {
      setFavoriteCats(favoriteCats.filter((item) => item.id !== cat.id))
    } else {
      setFavoriteCats(prev => [...prev, cat])
    }

  }
  setItemToLocalStorage("favoriteCats",favoriteCats)

  return (
    <div className="App">
      <Context.Provider value={{ getFavoriteCats, favoriteCats, cats, getCats }}>

        <header className="header">
          <NavLink className={isActive ? "header-item header-item_active" : "header-item"}
           to="/frontend-challenge" onClick={() => { setIsActive(true) }}>Все Котики </NavLink>
          <NavLink className={!isActive ? "header-item header-item_active" : "header-item"}
           to="favoriteCats" onClick={() => { setIsActive(false) }} >Любимые котики </NavLink>
        </header>

        <Routes>
          <Route path="/frontend-challenge" element={<AllCats />} />
          <Route path="favoriteCats" element={<FavoriteCats />} />
        </Routes>
      </Context.Provider>
      
    </div>
  );
}

export default App;
