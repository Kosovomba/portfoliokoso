import { useState } from "react"

export default function PEBoard({PEshow, setPEshow, personaje, setPersonaje}) {

    const [Pexp, setPexp] = useState(personaje.PE)
    const [PEChange, setPEChange] = useState(1)

    function handleClose(e){
        e.preventDefault()
        setPexp(personaje.PE)
        setPEshow(false)
    }
    function handleAceptar(e){
        e.preventDefault()
        setPersonaje({...personaje, PE: Pexp})
        setPEshow(false)
    }
    function onPEChange(e){
        e.preventDefault()
        setPEChange(e.target.value)
    }
    function handleChange(e){
        e.preventDefault()
        let total = e.target.value === 'Sumar'?Pexp + Math.floor(PEChange):Pexp - PEChange
        total<0?total=0:null
        setPexp(total)
        setPEChange(1)
    }
        
    return (
        <div style={{display: PEshow?'flex':'none', flexDirection:'column', zIndex:2, border:'solid white 2px', width:'300px', height:'250px', backgroundColor:'rgba(170,140,110,0.95)', position: 'absolute', top: '300px', alignSelf:'center'}}>
            <button onClick={handleClose} style={{width:'24px', margin:'3px', alignSelf:'flex-end'}} >X</button>
            <span style={{margin:'5px'}}>{`Puntos de experiencia actuales: ${personaje.PE}`}</span>
            <span style={{margin:'5px'}}>{`Los puntos de experiencia serán: ${Pexp}`}</span>
            <div style={{display:'flex', height:'fit-content', alignSelf:'center', alignItems:'center', marginTop:'10px'}}>
                <span style={{marginRight: '10px'}}>Modificar PE:</span>
                <button style={{height:'30px'}} value='Restar' onClick={handleChange}>Restar</button>
                <input style={{width:'40px', height:'30px'}} type="number" min={1} onChange={onPEChange} value={PEChange}></input>
                <button style={{height:'30px'}} value='Sumar' onClick={handleChange}>Sumar</button>
            </div>
            <div style={{display:'flex', justifySelf:'flex-end', justifyContent:'space-between', position:'relative', top:'60px'}}>
                <button onClick={handleAceptar}>Aceptar</button>
                <button onClick={handleClose}>Cancelar</button>
            </div>
        </div>
    )
}