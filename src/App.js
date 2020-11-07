import './App.css';
import React from 'react'
import Home from './screens/home/Home' 
import FavPage from './screens/fav/FavPage'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
     <Switch>
         <Route exact path='/'>
             <Home/>
         </Route>
         <Route path='/fav'>
           <FavPage/>
         </Route>
     </Switch>
    </BrowserRouter>
  );
}

export default App;
