import { useEffect, useState } from "react"
import ConjuroInicial from "./conjuroInicial"
import AptInicialExp from "./aptInicialExp"
// import Characters from "./characters"

export default function Character ({raza, clase, nombre, razaStats, claseStats}) {
    const [personaje, setPersonaje] = useState({nombre: nombre,
        raza: raza,
        clase: clase,
        nivel: 1,
        PV: razaStats.PV + claseStats.PV,
        VM: razaStats.VM + claseStats.VM,
        RD: razaStats.RD + claseStats.RD,
        apt1: [razaStats.apt1, claseStats.apt1, []],
        apt3: razaStats.apt3,
        'apt2+': []
    })
    function subirNivel(e) {
        e.preventDefault()        
        setPersonaje({...personaje, nivel: personaje.nivel + 1})
    }

    return (
        <div>
            <p>{`${nombre}: ${raza} ${clase}`}</p>
            <p> {`Nivel: ${personaje.nivel}`}</p>
            <p> {`PV: ${personaje.PV}`}</p>
            <p> {`VM: ${personaje.VM}`}</p>
            <p> {`RD: ${personaje.RD}`}</p>
            <div>
            <p> {`Aptidudes de nivel 1: `}</p>
            <p> {personaje.apt1[0]}</p>
            {clase !== 'Explorador'? <p> {personaje.apt1[1]}</p>: <AptInicialExp personaje={personaje} setPersonaje={setPersonaje}/>}
            {claseStats['conjuros iniciales']?<ConjuroInicial personaje={personaje} setPersonaje={setPersonaje} raza={raza} clase={clase} conjurosIniciales={claseStats['conjuros iniciales']} />:null}
            </div>
            <button onClick={subirNivel} disabled={personaje.nivel<5?false:true} >Subir de nivel</button>
        </div>
    )    
}