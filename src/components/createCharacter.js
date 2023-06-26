import { useState } from "react"
import { useRouter } from "next/router"
import images from "../controllers/images"

export default function CreateCharacter({razas, clases, character, setCharacter}){  
    const router = useRouter()
    const [newChar, setNewChar] = useState({nombre: '', raza: '', clase: ''})
    const [showButtons, setShowButtons] = useState({showApt2: false, showCDP: false, showCI: false})
    let errorName = false

    if(newChar.nombre.length === 0 || newChar.nombre.length > 18 || /[^a-zñáéíóú']/i.test(newChar.nombre) === true) {
        errorName = true
    }

    function buttonHandler(e) {
        e.preventDefault()
        setShowButtons({...showButtons, [e.target.value]: !showButtons[e.target.value]})
    }
   
    function onSubmit(e) {
        e.preventDefault()
        // router.push(`https://portfoliokoso.vercel.app/app/${newChar.raza}/${newChar.clase}/${newChar.nombre}/characterBuild`)
        router.push(`https://localhost:3000/app/${newChar.raza}/${newChar.clase}/${newChar.nombre}/characterBuild`)
    }
    function onInputChange(e) {
        e.preventDefault()        
        setNewChar({...newChar, [e.target.name]: (e.target.value === 'raza' || e.target.value === 'clase')?'': e.target.value})
        console.log(newChar)
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
                <p style={{fontSize: 18, margin: 1}}><span key={a.nombre} value={a.nombre}>{a.nombre}</span><span key={a.aptitud} value={a.aptitud}>{a.aptitud}</span></p>
            </div>
        )
    }
    return (
        <div style={{width: '1300px'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <form style={{width: 580, minWidth: 580}} onSubmit={(e)=> onSubmit(e)}>
                <label style={{fontSize: 40}}>{(newChar.nombre===''? '': newChar.nombre + ': ' ) + (newChar.raza==='raza' || newChar.raza===''? '': newChar.raza + ' ' ) + (newChar.clase==='clase' || newChar.clase===''? '': newChar.clase ) || 'Personaje'}</label>
                <input type="text" name='nombre' onChange={onInputChange} value={newChar.nombre} placeholder='Nombre... (Hasta 18 letras o comilla simple)'></input>
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
                <button type="submit" disabled={errorName === false && newChar.raza !=='' && newChar.clase !== ''?false:true}>Crear personaje</button>
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
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{border: 'solid white 2px', padding: '10px', width: 900}}>
                <p style={{marginBottom: 10, fontWeight: 700}}>Estadísticas de raza: </p>
                <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{'Puntos de vida: ' + character.raza.PV}</p>
                <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{'Velocidad de movimiento: ' + character.raza.VM}</p>
                <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{'Aptitud de nivel 1: ' + character.raza.apt1}</p>
                <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{'Aptitud de nivel 3: ' + character.raza.apt3}</p>
            </div>
                <img style={{maxWidth: 400, maxHeight: 400, border: 'solid white 2px'}} width="400" src={images()[`${newChar.raza}${newChar.clase}`]} alt='imagen'/>            
            </div>
            <div style={{border: 'solid white 2px', padding: '10px'}}>
                <p style={{marginBottom: 10, fontWeight: 700}}>Estadísticas de clase: </p>
                <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{'Puntos de vida: ' + character.clase.PV}</p>
                <p style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>{'Velocidad de movimiento: ' + character.clase.VM}</p>
                <div style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>
                <p style={{margin: 2, marginBottom: 10}}>{'Aptitud de nivel 1: ' + character.clase.apt1}</p>  
                {character.clase['conjuros iniciales'] && character.clase['conjuros iniciales'].length>0?<div style={{display:'flex', flexDirection:'row' , margin: 2, fontSize: 18}}>
                    <span style={{maxWidth:'fit-content'}}>{'Lista de conjuros iniciales: '}</span><button onClick={buttonHandler} value={'showCI'} style={{maxWidth:'fit-content', position:'relative', left:'940px', padding:'4px'}}>{showButtons.showCI===true?'Esconder':'Mostrar'}</button>
                                                                                                         </div>:null}                              
                {showButtons.showCI===true?character.clase['conjuros iniciales']?.map(functionMap):null}
                </div>
                <div style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>
                <div style={{display:'flex', flexDirection:'row' , margin: 2}}><span style={{maxWidth:'fit-content'}}>{'Aptitudes de nivel 2 o mayor: '}</span><button onClick={buttonHandler} value={'showApt2'} style={{maxWidth:'fit-content', position:'relative', left:'890px', padding:'4px'}}>{showButtons.showApt2===true?'Esconder':'Mostrar'}</button></div>
                {showButtons.showApt2===true?character.clase['apt2+'].map(functionMap):null}
                </div>
                <div style={{padding: '5px', margin: 2, marginBottom: 10, backgroundColor: 'rgb(3, 49, 57, 0.5)'}}>
                <div style={{display:'flex', flexDirection:'row' , margin: 2}}><span style={{maxWidth:'fit-content'}}>{'Clases de prestigio: '}</span><button onClick={buttonHandler} value={'showCDP'} style={{maxWidth:'fit-content', position:'relative', left:'980px', padding:'4px'}}>{showButtons.showCDP===true?'Esconder':'Mostrar'}</button></div>                
                {showButtons.showCDP===true?character.clase.cdp.map(functionMap):null}
                </div>
            </div>           
            </>            
        </div>
    )
}