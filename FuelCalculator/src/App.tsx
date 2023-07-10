import { useState, FormEvent } from 'react'
import './App.css'

import logoImg from './assets/logo.png'

//Calculo é Alcool / Gasolina e se for menor que 0.7 compensa o alcool.

interface InfoProps{
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {

  const [gasolinaInput, setGasolinaInput] = useState(0)
  const [alcoolInput, setAlcoolInput] = useState(0)
  const [info, setInfo] = useState<InfoProps>()

  function calcular(event: FormEvent ){
    event.preventDefault();

    const calculo = (alcoolInput / gasolinaInput)
    if(calculo <= 0.7){
      setInfo({
        title: "It pays to use alcohol",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }
    else{
      setInfo({
        title: "It pays to use gasoline",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }

  }

  function formatarMoeda(valor: number){
    const valorFormatado = valor.toLocaleString("pt-br",{
      style: "currency",
      currency: "BRL"
    })

    return valorFormatado;
  }


  return (
    <div>
      <main className="container">
        <img className="logo" src={logoImg} alt="Logo Calculator"/>
        <h1 className="title">What is the best option ? </h1>

        <form className="form" onSubmit={calcular}>
          <label>Alcohol (price per litre):</label>
          <input className="input" type="number" placeholder='4,90' min="1" step="0.01" required value={alcoolInput} onChange={ (e) => setAlcoolInput(Number(e.target.value))}></input>

          <label>Gasoline (price per litre):</label>
          <input className="input" type="number" placeholder='5,40' min="1" step="0.01" required value={gasolinaInput} onChange={ (e) => setGasolinaInput(Number(e.target.value))}></input>

          <input className="button" type="submit" value="Calculate"></input>
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result-title"> {info.title}</h2>
            <span>Ahcohol {info.alcool}</span>
            <span>Gasoline {info.gasolina}</span>
          </section>
        )}

        
      </main>
    </div>
  )
}

export default App
