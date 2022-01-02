import React, {useState, useEffect, useContext, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase/index';
import PlatoMenu from '../ui/PlatoMenu';
import ModificarPlato from './ModificarPlato';

//import  Fragment  from 'react';





const Menu = () =>{

    const {firebase} = useContext(FirebaseContext);

    const [platos, setPlatos] = useState([])

    const [modificar, setModificar] = useState(false)

    const [idModificar, setIdModificar] = useState('')

    const [infoModificar, setInfoModificar] = useState({})

    const [buscar, setBuscar] = useState('f')

    const [autosParaMostar, setautosParaMostar] = useState({})

    
    useEffect(() => {

       const obtenerPlato = () => {
          firebase.db.collection('autos').onSnapshot(handleSnapshot); 

        }
        obtenerPlato();
    }, []);

// Snapshot permite manejar la base de datos en real time  
  
    const handleSnapshot = (snapshot) =>{
        const platos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        setPlatos(platos)
    }
 

 
    return(
        <>
        
        
        
        {modificar ? <ModificarPlato
                    setModificar={setModificar}
                    modificar={modificar}
                    idModificar={idModificar}
                    infoModificar={infoModificar}/> :  
         
         
         <>
        <h1 className="text-3xl font-light mb-4 text-center "> Stock de Autos </h1>
        <Link to='/nuevo-platillo' className=" bg-gray-800 hover:bg-gray-700 hover:text-yellow-500 inline-block mb-5 p-2 text-white uppercase font-bold"> Agregar Auto </Link>

        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Buscar Auto</label>

                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-300 focus:shadow-none"
                        id="buscar"
                        type="text"
                        placeholder="buscar"

                        onChange={e => setBuscar(e.target.value)} 
                        
                        />

                    </div>


        {
        
       
        
        platos.map((plato) => {          
           return( <PlatoMenu
            key={plato.id}
            plato={plato}
            setModificar={setModificar}
            modificar={modificar}
            setIdModificar={setIdModificar}
            setInfoModificar={setInfoModificar}/> )
        })} </> } 

       
        
        </>
    );

};

export default Menu;