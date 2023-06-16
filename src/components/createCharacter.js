import { useState } from "react"
import { useRouter } from "next/router"

export default function CreateCharacter({razas, clases, character, setCharacter}){  
    const router = useRouter()
    const [newChar, setNewChar] = useState({nombre: '', raza: '', clase: ''})
    function onSubmit(e) {
        e.preventDefault()
        router.push(`http://localhost:3000/app/${newChar.raza}/${newChar.clase}/${newChar.nombre}/characterBuild`)
    }
    function onInputChange(e) {
        e.preventDefault()        
        setNewChar({...newChar, [e.target.name]: e.target.value})       
        if (e.target.name === 'raza') {
            if (e.target.value === 'raza') {
                setCharacter({...character, raza: {raza: '', PV: 0, VM: 0, RD: 0, apt1: '', apt3: ''}})
            }
            else {
           let razaa = razas.filter((r) => r.raza === e.target.value)
           console.log(razaa)
           setCharacter({...character, raza: razaa[0]})       
            }   
        }
        if (e.target.name === 'clase') {
            if (e.target.value === 'clase') {
                setCharacter({...character, clase: {clase: '', PV: 0, VM: 0, RD: 0, apt1: '', 'apt2+': [], 'conjuros iniciales': [], cdp: []}})
            }
            else {
            let clasee = clases.filter((c) => c.clase === e.target.value)
            setCharacter({...character, clase: clasee[0]})
            }
         }
    }
    const functionMap = function (a) {
        return (
            <div style={{margin: 2, border: 'solid gray 1px'}}>
                <p style={{fontSize: 15, fontFamily: 'cursive', margin: 0}} key={a.requisitos || 'Ninguno'} value={a.requisitos || 'Ninguno'}>Requisitos: {a.requisitos || 'Ninguno'}.</p>
                <p style={{fontSize: 18, margin: 1}} key={a.aptitud} value={a.aptitud}>{a.aptitud}</p>
            </div>
        )
    }
    return (
        <div style={{width: '1300px'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <form style={{width: 580, minWidth: 580}} onSubmit={(e)=> onSubmit(e)}>
                <label style={{fontSize: 40}}>{(newChar.nombre===''? '': newChar.nombre + ': ' ) + (newChar.raza==='raza' || newChar.raza===''? '': newChar.raza + ' ' ) + (newChar.clase==='clase' || newChar.clase===''? '': newChar.clase ) || 'Personaje'}</label>
                <input type="text" name='nombre' onChange={onInputChange} value={newChar.nombre} placeholder='Nombre...'></input>
                <select name='raza' onChange={onInputChange} value={newChar.raza}>
                <option key={'raza'} value={'raza'}>Elegir raza</option>
                {razas.map((c) => {
                    return <option key={c.raza} value={c.raza}>{c.raza}</option>
                })}
                </select>
                <select name='clase' onChange={onInputChange} value={newChar.clase}>
                <option key={'clase'} value={'clase'}>Elegir clase</option>
                {clases.map((c) => {
                    return <option key={c.clase} value={c.clase}>{c.clase}</option>
                })}
                </select>
                <button type="submit" disabled={newChar.nombre !=='' && newChar.raza !=='' && newChar.clase !== ''?false:true}>Crear personaje</button>
            </form>            
            <div style={{border: 'solid white 2px', padding: '10px', marginLeft: '20px', width: '700px'}}>
            <p style={{marginBottom: 10, fontWeight: 700}}>Estadísticas de personaje: </p>
            <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{`Puntos de vida: ${character.clase.PV + character.raza.PV}`}</p>
            <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{`Velocidad de movimiento: ${character.clase.VM + character.raza.VM}`}</p>
            <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{`Reducción de daño: ${character.clase.RD + character.raza.RD}`}</p>
            <div style={{padding: '5px', margin: 2, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>
            <p style={{marginBottom: '2px'}}>{`Aptitudes de nivel 1: `}</p>
            <p style={{marginBottom: '2px'}}>{`*(racial) ${character.raza.apt1}`}</p>
            <p style={{marginBottom: '2px'}}>{`*(cláseo) ${character.clase.apt1}`}</p>
            </div>            
            </div>
            </div>
            <>
            <div style={{border: 'solid white 2px', padding: '10px'}}>
                <p style={{marginBottom: 10, fontWeight: 700}}>Estadísticas de raza: </p>
                <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{'Puntos de vida: ' + character.raza.PV}</p>
                <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{'Velocidad de movimiento: ' + character.raza.VM}</p>
                <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{'Aptitud de nivel 1: ' + character.raza.apt1}</p>
                <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{'Aptitud de nivel 3: ' + character.raza.apt3}</p>
            </div>
            <div style={{border: 'solid white 2px', padding: '10px'}}>
                <p style={{marginBottom: 10, fontWeight: 700}}>Estadísticas de clase: </p>
                <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{'Puntos de vida: ' + character.clase.PV}</p>
                <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{'Velocidad de movimiento: ' + character.clase.VM}</p>
                <div style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>
                <p style={{margin: 2, marginBottom: 10}}>{'Aptitud de nivel 1: ' + character.clase.apt1}</p>  
                {character.clase['conjuros iniciales'] && character.clase['conjuros iniciales'].length>0?<p style={{margin: 2, fontSize: 18}}>Lista de conjuros iniciales:</p>:null}              
                {character.clase['conjuros iniciales']?.map(functionMap)}
                </div>
                <div style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>
                <p style={{margin: 2}}>{'Aptitudes de nivel 2 o mayor: '}</p>
                {character.clase['apt2+'].map(functionMap)}
                </div>
                <div style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>
                <p style={{margin: 2}}>{'Clases de prestigio: '}</p>
                {character.clase.cdp.map(functionMap)}
                </div>
            </div>           
            </>
        </div>
    )
}