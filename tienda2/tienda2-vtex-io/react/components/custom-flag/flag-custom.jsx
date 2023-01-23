import React from 'react'
import { useQuery } from 'react-apollo'
import useProduct from 'vtex.product-context/useProduct'
import customFlag from './customFlag.graphql'
import styles from './flag.css'
import ImagenDescuento from './assets/logo-2-pdp-descuento.png'

const CustomFlag = () => {

  const { product } = useProduct()

  const { data } = useQuery(customFlag, {
    variables: {
      slug: product.linkText,
    },
    ssr: false,
  })

  if (!product) {
    return (
      <div>
        <span>There is no product context.</span>
      </div>
    )
  }

  if ( data ) {

    const collectionProduct = data.product.productClusters;
    console.log(data);

    // FLAG
       const collectionFlag = collectionProduct.map( coleccion => (
       (coleccion.id == 348 || coleccion.id == 427 || coleccion.id == 436 || coleccion.id == 437) ? <div className={styles.flagDescuento}><img src={ImagenDescuento} alt="flag-descuento" /></div> : ''
    ))



    return (
      <>
       {/*   <div>{collectionFlag}</div> */}
      </>
    )
  }


  return (
    <>

    </>

  )
}

export default CustomFlag
