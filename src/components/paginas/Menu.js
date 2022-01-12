import React, {useState, useEffect, useContext, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase/index';
import PlatoMenu from '../ui/PlatoMenu';
import ModificarPlato from './ModificarPlato';
import _ from 'lodash';

//import  Fragment  from 'react';





const Menu = () =>{

    const {firebase} = useContext(FirebaseContext);

    const [platos, setPlatos] = useState([])

    const [modificar, setModificar] = useState(false)

    const [idModificar, setIdModificar] = useState('')

    const [infoModificar, setInfoModificar] = useState({})

    const [filtro, setFiltro] = useState('')

    const [autosParaMostar, setautosParaMostar] = useState({})

    
    useEffect(() => {

       const obtenerPlato = () => {
          firebase.db.collection('autos').onSnapshot(handleSnapshot); 

        }
        obtenerPlato();
        
    }, [filtro]);

// Snapshot permite manejar la base de datos en real time  
  
    const handleSnapshot = (snapshot) =>{
        const platos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        const platos_filtrados = _.filter(platos, plato => _.includes(_.lowerCase([plato.marca, plato.modelo, plato.año]), _.lowerCase(filtro)));
        const platos_sorteados = _.sortBy(platos_filtrados, 'marca', 'modelo' ,'año');
        setPlatos(platos_sorteados)
    }
 

 
    return(
        <>
        
        
        
        {modificar ? <ModificarPlato
                    setModificar={setModificar}
                    modificar={modificar}
                    idModificar={idModificar}
                    infoModificar={infoModificar}/> :  
         
         
         <>
        <h1 className="text-3xl font-light mb-4 text-center "> Autos en el listado </h1>


        <div className="mb-4">

                        <input className="shadow italic appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-300 focus:shadow-none"
                        id="buscar"
                        type="text"
                        placeholder="Buscar"

                        onChange={e => setFiltro(e.target.value)} 
                        
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