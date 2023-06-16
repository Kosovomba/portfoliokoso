import { useEffect, useState } from "react"
// import Characters from "./characters"

export default function Character ({raza, clase, nombre, razaStats, claseStats}) {
    const [personaje, setPersonaje] = useState({nombre: nombre,
        raza: raza,
        clase: clase,
        nivel: 1,
        PV: razaStats.PV + claseStats.PV,
        VM: razaStats.VM + claseStats.VM,
        RD: razaStats.RD + claseStats.RD,
        apt1: [razaStats.apt1, claseStats.apt1, ''],
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
            {personaje.apt1.map((a) => {           
                return <p key={a}>{a}</p>
            })}
            </div>
            <button onClick={subirNivel} disabled={personaje.nivel<5?false:true} >Subir de nivel</button>
        </div>
    )    
}