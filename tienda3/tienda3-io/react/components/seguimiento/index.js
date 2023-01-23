import React, { useEffect, useState } from 'react'

const Seguimiento = () => {
  const [data, setData] = useState({data: []});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [input, setInput] = useState("");


  const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJleHAiOjE2NTk2MzYwNjIsInVzZXJuYW1lIjoiNmY0N2QzYTI4YzBiMzNlNTQ4ZDI0ZGJmM2NhODA2YTAxM2Y5N2QwNCIsImlhdCI6IjE2NTk2MjE2NjIifQ.WfXi5_elM9_QpwUOne7J59XcbT4BN3nZ161yAsPtJTbJ2o4TMFnk8BkJy3Z-dCnTKZcw3qq1f-vfW5QO-8pXdjvScSPavIZriz5P4lU6xcky8cfrraN2QsmHwUpb7OUcuhO2aYPvbJ0gnTP5ww6xKPnlSj3S5r0Fz-u6z0_yw4RSs2IfWLTb4B4dqAsSsyN86ig4vfJRO-rg7C-DtJE1ZId4tD8pK05g8BbNjk2hFrCRWz7wz5A9D1rn6FYc8AB5pbcGOXn5UwRu8ewubLPyjrwPrzh0XKg8oMBD0uzEXcWNomGSRD-89AZ50LSOaSMZp3gw6ye-scfiVJPYbtE2AyorP_zSykiXGMnPeKBOmXxIffibIwbgSjnljc39WcQSU4I5ftSmvbmTddYjL8tKXLRWschdA69V-ppyaXRCdqqrMJPZpfGQpLcpbGZPsCQikUKpEwkAJkW74cNpJbAeGBB3fcxiy0IWhBhhWEWltQkB4LCnlEFUTNSyhuGxxYXyEIqjbN5BRS49jZ2sA83WnEtO445yr-XZbEPIokipDIWGiLWia5knN7AFKdlyVZ4fXgvMxo7s7w1n2BOHEZjjQdSokV9vMM8qllo8iYTlmrBknPRUFWsyN2W6Q7Dtf_a7jHfoXbVDB6zgKIwd8h3jC4n122viIUKI6mRrF6K9YwE";




  const handleInput = (e)=>{
    setInput(e.target.value);
  }
  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`https://api.enviopack.com/envios/${input}/tracking?access_token=${token}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin':'*'
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  console.log(data);

  };



 
  return (
    <div className='vtex-form-seguimiento-container'>
    <div className='vtex-form-seguimiento'>
        <h5 className='vtex-form-seguimiento-title'>SEGUIMIENTO DE PEDIDOS</h5>
        <form>
            <input className='vtex-form-seguimiento-input' placeholder="Número de orden" type="text" onChange={handleInput}/>
            <button className='vtex-form-seguimiento-button' onClick={handleClick}>
              <svg className='vtex-form-seguimiento-svg' width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4268 10.3063H0.171265V7.96362H22.4268V10.3063Z" fill="#222426"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M21.9416 9.13509L14.5704 1.76395L16.227 0.107422L24.4264 8.30682C24.8838 8.76426 24.8838 9.50591 24.4264 9.96335L16.227 18.1628L14.5704 16.5062L21.9416 9.13509Z" fill="#222426"/>
              </svg>
            </button>
          
        </form>

    </div>
    </div>
  )
}

export default Seguimiento