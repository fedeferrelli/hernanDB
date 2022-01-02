import React from 'react';
import { NavLink} from 'react-router-dom';

import "../../css/styles.css";


const  Sidebar = () => {
    return ( 
       <div className="bg-gray-800 md:w-2/5  md:min-h-screen xl:w-1/5">
           <div className="p-6 sticky top-0">
                <p className="text-center text-2xl text-white uppercase font-bold tracking-wide">Hola, Hernan</p>
                <p className="text-slate-400 text-center mt-3 ">Administrá el stock de autos</p>

                <nav className="mt-4  flex md:flex-col md:mt-10  justify-evenly ">

                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" end to="/menu">Listado de Autos</NavLink>

                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" end to='/nuevo-platillo'>Agregar Autos</NavLink>
                </nav>
           
           </div>
       </div>
     );
}
 
export default Sidebar ;