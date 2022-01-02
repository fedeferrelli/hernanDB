import React, { useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase/index';
import { MdDeleteForever, MdAppRegistration } from "react-icons/md";



const PlatoMenu = ({plato, setModificar, modificar, setIdModificar, setInfoModificar }) =>{

    const {marca, año, modelo, image, descripcion, existencia, id} = plato

    // existencia ref para acceder al valor directamente
    const existenciaref = useRef(plato.existencia) 

    //context de firbase para cambios en la bade de datos

    const {firebase} = useContext(FirebaseContext)
   

    // funcion pàra actualizar existencia en firebase
    const ActualizarStock = () =>{
        
        // pasando de un string ("true" o "false") a un booleano (true o false) porque así lo requiere la manera en que se construyó la BD
        const stock = existenciaref.current.value==="true"

        try {
            firebase.db.collection('autos').doc(id).update({
                existencia: stock
            });
        } catch (error) {
            console.log(error)    
        }

        
    }

    // funcion para eliminar plato
    const eliminarPlato=(id)=>{

        if(window.confirm(`¿estás seguro que queres elminar ${marca} ${modelo}?`) )
        
       { try {
            firebase.db.collection('autos').doc(id).delete().then(function() {
                // File deleted successfully
              });
        } catch (error) {
            console.log(error)    
        }} 
        

        
    }

    // funcion para modificar plato
    const modificarPlato = (id) => {
        setModificar(!modificar)
        setIdModificar(id)
        setInfoModificar({plato})
       
    }

   
    return(
        <div className="w-full px-3 mb-4">
            <div className="p-5 shadow-2xl shadow-slate-300 bg-white rounded-lg" >
                <div className="lg:flex">
                    <div className="lg:w-5/12 xl:w-3/12 h-42 grid place-items-center "> 
                    
                    <img src={image} alt="imagen del auto" className=" object-none object-center w-full h-36 "/>
                     
                    <div className={existencia===true ? "mt-2 bg-slate-500 " :  "mt-2 bg-green-200 " }>
                        <label className="mr-3 mt-2">
                            <span className="border-b-2 border-slate-700 mr-0.5" >En stock:</span>
                            <select 
                            value={existencia}
                            ref={existenciaref}
                            onChange={()=> ActualizarStock()}
                            >
                                <option value="true">Si</option>
                                <option value="false">No</option>    
                            </select>    
                        </label>    
                    </div>

                    </div>

                    <div className="lg:w-7/12 xl:w-9/12 px-4">

                        <div className="flex">

                                <p className="font-bold text-2xl text-yellow-600 mb-3 w-10/12">
                                    {marca}   {modelo}   
                                </p>
                                
                                <button className=" w-1/12 h-12 text-center justify-center flex"
                                
                                onClick={()=>eliminarPlato(id)}
                                ><MdDeleteForever className="w-8 h-8 text-red-400" /></button>

                                <button className=" w-1/12 h-12 text-center justify-center flex"
                                
                                onClick={()=>modificarPlato(id)}
                                ><MdAppRegistration className="w-8 h-8 text-blue-300" /></button>


                         </div>


                         <p className="text-gray-600 mb-4 mt-0 ">
                              <span className="font-bold text-gray-600 uppercase">{año}</span>                           
                         </p>

                         <p className="text-gray-600 mb-4  ">
                              {descripcion}                           
                         </p> 

                    
                    
                    </div>

               

                </div>
            
            </div>
           
        </div>
    )
};

export default PlatoMenu;