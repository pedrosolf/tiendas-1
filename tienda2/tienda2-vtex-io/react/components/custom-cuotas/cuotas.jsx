import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import useProduct from 'vtex.product-context/useProduct'
import productInfo from './productInfo.gql'
import styles from './styles.css'
import {paymentMethodGroups, defaultValues, paymentOptionsIcons, paymentMethodIcons} from './data.js'



const CalculadorCuotas = () => {
  const [paymentMethodGroupActive, setPaymentMethodGroupActive] = useState('creditCardPaymentGroup');
  const [checkedOption, setCheckedOption] = useState(defaultValues[paymentMethodGroupActive])


  const { product } = useProduct()

  const { data, loading, error } = useQuery(productInfo, {
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
  if (loading) {
    return (
      <div>
        <div className={styles.spinner}></div>
      </div>
    )
  }
  if (data){
    const info = data.product.items[0].sellers[0].commertialOffer.Installments;


    const paymentMethods = info.reduce((acc,item)=>{
      if(!acc.includes(item.PaymentSystemGroupName)){
      	acc.push(item.PaymentSystemGroupName);
      }
      return acc;
    },[])

    const handlePayment = (e) => {
      setPaymentMethodGroupActive(e.target.value)
      setCheckedOption(defaultValues[e.target.value])



    }

  return(
      <div className={styles.paymentContainer}>
        <div className={styles.container}>
          <ul className={styles.list} onChange={handlePayment}>
            {
            paymentMethods.map( (paymentMethod, i) => {
              console.log("Acá", paymentMethod)
              if(paymentMethod !== "promissoryPaymentGroup"){
                return(
                  <li key={i} className={paymentMethod === paymentMethodGroupActive ? styles.paymentMethodActive :  styles.paymentMethodInactive}>
                    <label className={styles.metodoPago}>
                      <img src={paymentMethodIcons[paymentMethod]} />
                      <input type='radio' className="o-0" name='paymentMethodGroup' value={paymentMethod} defaultChecked={paymentMethod === paymentMethodGroupActive ? true : false} />
                    {paymentMethodGroups[paymentMethod]}
                    </label>
                  </li>
                )

              }
             
            })}
          </ul>
          <div className={styles.tarjetasCuotas}>
              <PaymentMethodInfo info={info} paymentMethodGroupActive={paymentMethodGroupActive}  checkedOption={checkedOption} setCheckedOption={setCheckedOption}/>
          </div>
        </div>
      </div>
  )

  }
}

const PaymentMethodInfo = ({paymentMethodGroupActive, info, checkedOption, setCheckedOption}) => {

  let paymentOptions = []
  info.forEach(i => {
    if(i.PaymentSystemGroupName === paymentMethodGroupActive){
      paymentOptions =[...paymentOptions, i.PaymentSystemName]
    }
  })

  const paymentOptionsClean = paymentOptions.reduce((acc,item)=>{
    if(!acc.includes(item)){
      acc.push(item);
    }
    return acc;
  },[])

  const handleOptions = (e) => {
    setCheckedOption(e.target.value)
  }

  if(paymentMethodGroupActive === 'custom201PaymentGroupPaymentGroup' ){
    return(
      <p class="pago">Pagá el importe total a través de una transferencia bancaria.</p>
    )
  }
  else if(paymentMethodGroupActive === 'custom202PaymentGroupPaymentGroup' ){
    return(
      <p>Pagá el importe total en nuestras sucursales.</p>
    )
  }

  return(
    <div className={styles.paymentOptionsContainer}>
      <ul className="list pl0 flex flex-wrap" onChange={handleOptions}>
      {paymentOptionsClean.map((paymentOption, i) => {
        return(
          <li key={i} className={paymentOption === checkedOption ? styles.paymentOptionActive :  styles.paymentOptionInactive}>
            <label className={styles.opcionTarjeta}>
              <img src={paymentOptionsIcons[paymentOption] ? paymentOptionsIcons[paymentOption] : 'https://nhorizontesa.vteximg.com.br/arquivos/icono-ejemplo-modal.png' } alt={paymentOption} className={styles.cardIcon}/>
              <input type='radio' className="o-0" name='paymentOption' value={paymentOption} checked={paymentOption === checkedOption &&  true } onChange={handleOptions} />
              <p className={styles.paymentOption}>{paymentOption}</p>
            </label>
          </li>
        )
      })}
      </ul>
      <Installments checkedOption={checkedOption} info={info}/>
    </div>
  )
}

const Installments = ({checkedOption, info}) => {
  return(
    <div className={styles.tablaDiv}>
      <h2>Valor de cuotas - {checkedOption}</h2>
      <table className={styles.tablaCuotas} >
          <thead className={styles.tablaHead}>
            <tr className={styles.tableHeaders}>
              <td>CUOTAS</td>
              <td>% Interés</td>
              <td>Valor Total</td>
            </tr>
          </thead>
          <tbody className={styles.tablaBody}>          
          {info.map(({InterestRate, PaymentSystemName, NumberOfInstallments, Value, TotalValuePlusInterestRate}, i) => {
            if( PaymentSystemName === checkedOption){
              return(
                <tr key={i} className="pa1 pv6">
                  <td>{NumberOfInstallments}</td>
                  <td>{InterestRate === 0 || InterestRate === null  ? ' 0%' : InterestRate + '%' }</td>
                  <td>${TotalValuePlusInterestRate.toLocaleString()}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </div>
  )
}


export default CalculadorCuotas

