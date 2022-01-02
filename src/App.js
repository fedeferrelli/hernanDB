import React from 'react';
import { Routes, Route} from 'react-router';

import firebase, { FirebaseContext } from './firebase/index'; 


import Menu from "./components/paginas/Menu";
import NuevoPlatillo from "./components/paginas/NuevoPlatillo";
import ModificarPlato from "./components/paginas/ModificarPlato"

import Sidebar from './components/ui/Sidebar'

function App() {

  return (
    
    <FirebaseContext.Provider
    value={{firebase}}
    >
      
    <div className="md:flex">

      <Sidebar className="" />

      <div className="md:w-3/5 xl:w-4/5 p-6">

      <Routes>

        <Route exact strict path='/menu' element={<Menu/>}/>
        <Route exact strict path='/nuevo-platillo' element={<NuevoPlatillo/>}/>
        <Route exact strict path='/modificar-plato' element={<ModificarPlato/>}/>
      </Routes>

      </div>
    </div>
    </FirebaseContext.Provider>
  );
}

export default App;
