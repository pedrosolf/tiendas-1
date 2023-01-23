import React, { useEffect, useState } from "react";
import styles from './estilos.css';

const listaReclamos = () => {

  const [lista, setLista] = useState([]);
 
  useEffect(()=>{
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    //const data = await fetch('https://jsonplaceholder.typicode.com/users');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'REST-Range': 'resources=0-60'
      }
    };
    
    const data = await fetch('/api/dataentities/SF/search?_fields=ide,subject,description,respuesta,fecha&_where=ide between 0 AND 60', options);
    const dataLista = await data.json();
    const listaOrd = dataLista.sort((a, b) => (a.ide < b.ide ? 1 : a.ide > b.ide ? -1 : 0))
    console.log("Lista ordenada----->", listaOrd);
    setLista(listaOrd);

  };

  return (
      <div className={styles.sugerencias}>
        {
          lista.map((item, index) =>(
            <div className={styles.sugerencia} key={index}>
              <div className={styles.sugerenciafecha}>
                {item.fecha}
              </div>
              <div className={styles.sugerenciasubject}>
                <b>{item.subject}</b>
              </div>
              <div className={styles.sugerenciadescription}>
                {item.description}  
              </div>
              
              <div className={styles.sugerencarespuesta}>
                  Respuesta: <b>{item.respuesta}</b>  
              </div>
            </div>
          ))
        }
      </div>

  )
}

export default listaReclamos
