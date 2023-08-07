import { useRouter } from "next/router"
import { useState } from "react"
import axios from "axios"

export default function UserOptions() {
const router = useRouter()
const [carg, setCarg] = useState(false)
const [pers, setPers] = useState([])
const [opt, setOpt] = useState('')
const [currentChar, setCurrentChar] = useState({index: 'personajes'})
    function cerrarClick(e) {
        e.preventDefault()
        // localStorage.removeItem('usuario')
        localStorage.clear()
        alert('Cerraste sesión')
        router.reload()
    }
    function cargarPers(e) {
        e.preventDefault()
        axios.post('https://portfoliokoso.vercel.app/api/get-user-characters', {name: localStorage.getItem('usuario')})
        // axios.post('http://localhost:3000/api/get-user-characters', {name: localStorage.getItem('usuario')})
        .then((personajes) => {
            personajes = personajes.data
            localStorage.setItem('personajes', JSON.stringify(personajes))
            let aux = JSON.parse(localStorage.getItem('personajes'))
            console.log(aux)
            aux.length>0?cargarP(aux, e.target.value):setCarg('')
        })
        .catch((error)=> {
            console.log(error)
        })        
    }
    function cargarP(aux, optio) {
        let personajes = aux.map((p)=> p = {...p, apt2mas: JSON.parse(p.apt2mas), cdp: JSON.parse(p.cdp), apt1arr: JSON.parse(p.apt1arr)})
        setPers(personajes)
        setOpt(optio)
        setCarg(true)
    }
    function onInputChange(e) {
        e.preventDefault()
        setCurrentChar({...pers[e.target.value], index: e.target.value})
        console.log(currentChar)
    }
    function onButtonClick(e) {
        e.preventDefault()
        console.log(e.target.value)
        if (e.target.value === 'Cargar') {
        localStorage.setItem('currentCharacter', JSON.stringify(currentChar))
        console.log(JSON.parse(localStorage.getItem('currentCharacter')))
        router.push(`https://portfoliokoso.vercel.app/app/${currentChar.raza}/${currentChar.clase}/${currentChar.nombre}/characterBuild`)
        // router.push(`http://localhost:3000/app/${currentChar.raza}/${currentChar.clase}/${currentChar.nombre}/characterBuild`)                   
        }
        if (e.target.value === 'Eliminar') {
            let cC = JSON.parse(localStorage.getItem('currentCharacter'))
            cC && cC.id === currentChar.id? localStorage.removeItem('currentCharacter'):null
            // axios.post('http://localhost:3000/api/delete-character', {ID: currentChar.id})
        axios.post('https://portfoliokoso.vercel.app/api/delete-character', {ID: currentChar.id})
        .then(()=> {
            router.reload()
        })
        }
        if (router.pathname.length>13 && router.pathname.slice(router.pathname.length -14) === 'characterBuild') {
            setTimeout(()=>{
                router.reload()
            }, 500)
        }
    }
    function selectPers() {
        return <div>
            <select name='select' onChange={onInputChange} value={currentChar.index}>
                <option key={'personajes'} value={'personajes'}>Elegir personaje</option>
                {pers.map((p, i) => {
                    return <option key={i} value={i}>{`${i+1}: ${p.nombre}, ${p.raza} ${p.clase} de nivel ${p.nivel}`}</option>
                })}
            </select>
        </div>
    }

    return <div style={{background:'white', width: 'fit-content', padding:'6px'}}>
        <button onClick={cargarPers} value={'Cargar'}>Cargar personaje</button>
        <button onClick={cargarPers} value={'Eliminar'}>Eliminar personaje</button>
        <div style={{padding: '5px', display: 'flex', flexFlow:'wrap', margin: '10px'}}>
        {carg===true?selectPers():carg!==false?<p>No hay personajes guardados</p>:null}
        {currentChar.index !=='personajes'?<button style={{width: 'fit-content'}} onClick={onButtonClick} value={opt}>{opt}</button>:null}
        </div>
        <button style={{marginTop: '10px'}} onClick={cerrarClick}>Cerrar sesión</button>
    </div>
}