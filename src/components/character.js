import { useEffect, useState } from "react"
import ConjuroInicial from "./conjuroInicial"
import AptInicialExp from "./aptInicialExp"
import images from "../controllers/images"
import styles from "@src/styles/characterBuild.module.css"
import {AiFillHeart, AiOutlineArrowDown} from "react-icons/ai"
import {FaArrowDown} from "react-icons/fa"
import axios from "axios"
import {GiBiceps, GiShoulderArmor, GiWalkingBoot, GiWingedScepter, GiBackpack} from "react-icons/gi"
import {BsPersonBoundingBox} from 'react-icons/bs'
import {MdOutlinePlusOne} from 'react-icons/md'
import { useRouter } from "next/router"
// import Characters from "./characters"

export default function Character ({ID, raza, clase, nombre, razaStats, claseStats, nivel, apt1Arr, CDP, apt2Mas}) {
    const router = useRouter()
    const [personaje, setPersonaje] = useState({nombre: nombre,
        ID: ID, 
        raza: raza,
        clase: clase,
        nivel: nivel,
        PV: razaStats.PV + claseStats.PV,
        VM: razaStats.VM + claseStats.VM,
        RD: razaStats.RD + claseStats.RD,
        apt1: [razaStats.apt1, claseStats.apt1, apt1Arr],
        apt3: razaStats.apt3,
        CDPClase: Object.keys(CDP).length === 0?claseStats.cdp:claseStats.cdp.filter((c)=>c.nombre !== CDP.nombre),
        CDP: CDP,
        'apt2+': apt2Mas,
        claseStatsFiltrados: claseStats['apt2+'].filter((a)=>{
            let apt2Nombres = apt2Mas.map((ap)=> ap.nombre)
            return !apt2Nombres.includes(a.nombre)
        })
    })
    const [usu, setUsu] = useState('')
    const [pestaña, setPestaña] = useState('opciones')
    const [guardando, setGuardando] = useState(false)
    let subirNiv = true

    useEffect(()=> {
        let us = localStorage.getItem('usuario')
        us?setUsu(us):null
        let cC = JSON.parse(localStorage.getItem('currentCharacter'))
        if(cC && personaje.nivel === 1 && personaje.apt1[2].length === 0 && Object.keys(personaje.CDP).length === 0 && personaje['apt2+'].length === 0) {
            router.reload()
        }
        if (cC) {            
            if (cC.raza !== raza || cC.nombre !== nombre || cC.clase !== clase){
                localStorage.removeItem('currentCharacter')
                router.reload()
            }
        }
    },[])

    let apt2 = personaje['apt2+']

    function isDisabled(req) {
        if(req.length>0) {
            if (personaje.clase === 'Explorador') {                
                if (personaje.nivel <3) return true
                let value = true
                let reqAux = req.slice(34, -1)
                personaje['apt2+'].forEach((p) => {
                    if(p.nombre === 'Luchador versátil: ') value=false
                })
                if (personaje.apt1[2].length>0 && reqAux === personaje.apt1[2][0].slice(0,reqAux.length - personaje.apt1[2][0].length)) {
                    value=false
                }
                return value
            }
            else {
            if (req.charAt(0) === 'A') {
                let value = true                
                if (personaje['apt2+'].length>0) {
                    personaje['apt2+'].forEach((p) => {
                    let reqAux = req.slice(9, -1) + ': '
                    if(p.nombre === reqAux) {
                        value=false
                    }
                })
                }
                return value
            }
            else {
                let reqAux = req.slice(6)[0]
                return personaje.nivel > reqAux -1?false:true
            }
            }
        }
        else return false
    } 

    function isDisabledCDP(req) {
        if(req.length>0) {
            console.log(req, personaje['apt2+'], personaje.apt1[2])
            if (personaje.clase === 'Explorador') {
                let value = true
                if(req.length>30) {
                    if (personaje['apt2+'].length>0) {
                    personaje['apt2+'].forEach((p) => {
                        if(p.nombre === 'Presa/Enemigo predilecto: ') value=false
                    })
                    }
                }
                else {
                    personaje['apt2+'].forEach((p) => {
                        if(p.nombre === 'Luchador versátil: ') value=false
                    })
                    if (personaje.apt1[2].length>0 && personaje.apt1[2][0].length<60) {
                        value=false
                    }
                }
                return value
            }
            else {
                if (req.charAt(0) === 'A') {
                    let value = true                
                    if (personaje['apt2+'].length>0) {
                        personaje['apt2+'].forEach((p) => {
                        let reqAux = req.slice(9, -1) + ': '
                        if(p.nombre === reqAux) {
                            value=false
                        }
                    })
                    }
                    return value
                }
                if (req.charAt(0) === 'N') {
                    let reqAux = req.slice(6)[0]
                    return personaje.nivel > reqAux -1?false:true
                }
                else {
                    return (personaje.apt1[2].length>0 && personaje.apt1[2][0].length<70)? false:true                    
                }
            }
        }
        else return false
    }

    function handleAptitud2(e) {
        e.preventDefault()
        apt2.push(personaje.claseStatsFiltrados.filter((c)=> `${c.nombre}${c.aptitud}` === e.target.value)[0])
        let claseStatsFiltrados = personaje.claseStatsFiltrados.filter((c)=> `${c.nombre}${c.aptitud}` !== e.target.value)        
        setPersonaje({...personaje, ['apt2+']: apt2, claseStatsFiltrados: claseStatsFiltrados})
    }

    function handleCDP(e) {
        e.preventDefault()
        let CDP = personaje.CDPClase.filter((c)=> `${c.nombre}${c.aptitud}` === e.target.value)[0]
        let CDPClase = personaje.CDPClase.filter((c)=> `${c.nombre}${c.aptitud}` !== e.target.value)
        setPersonaje({...personaje, CDPClase: CDPClase, CDP: CDP})
    }

    function handleEdit(e) {
        e.preventDefault()
        let aux = [...personaje.CDPClase, personaje.CDP]
        setPersonaje({...personaje, CDPClase: aux, CDP: {}})
    }

    function subirNivel(e) {
        e.preventDefault()        
        setPersonaje({...personaje, nivel: personaje.nivel + 1})
    }
    function guardarPersonaje(e) {
        e.preventDefault()
        setGuardando(true)
        let newCharacter = {...personaje, usuario: usu, apt1Arr: JSON.stringify(personaje.apt1[2]), apt2Mas: JSON.stringify(personaje['apt2+']), CDP: JSON.stringify(personaje.CDP)}
        let option = 'add-character'
        localStorage.getItem('currentCharacter')?option = 'update-character': null
        // axios.post(`http://localhost:3000/api/${option}`, newCharacter)
        axios.post(`https://portfoliokoso.vercel.app/api/${option}`, newCharacter)
        .then(() => {
            localStorage.setItem('currentCharacter', JSON.stringify({
                nombre: personaje.nombre,
                id: personaje.ID, 
                raza: personaje.raza,
                clase: personaje.clase,
                nivel: personaje.nivel,
                Usuario: usu,
                apt1arr: personaje.apt1[2],
                cdp: personaje.CDP,
                apt2mas: personaje['apt2+']
            }))
            console.log(localStorage.getItem('currentCharacter'))
            alert('Personaje guardado')
            setGuardando(false)
        })
        .catch((error)=> {
            console.log(error)
        })
    }
    function handlePestaña (e) {
        e.preventDefault()
        setPestaña(e.target.value)
    }
    if (clase === 'Explorador' && personaje.apt1[2].length === 0) {        
        subirNiv = false
        }
    if (claseStats['conjuros iniciales'] && personaje.apt1[2].length + (clase === 'Mago'?0:1) < 2) {        
        subirNiv = false
        }        

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <p style={{marginTop:'7vh', fontSize: 40, display:'flex', justifyContent:'center', border: 'ridge #754421 17px', borderRadius: '20%', maxWidth: 'fit-content', padding: '3px', marginBottom: '5px'}}>{`${nombre}: ${raza} ${clase}`}</p>
            </div>
            {/* <div style={{display:'flex', flexFlow:'wrap'}}> */}
            <div style={{display:'flex', flexDirection:'column', justifyContent: 'center'}}>
            <div style={{display:'flex', flexFlow:'wrap', minWidth: '400px', justifyContent: 'center'}}>
                <button onClick={handlePestaña} value={'opciones'} disabled={pestaña === 'opciones'?true:false} style={{height:'50px', width:'120px'}}>Opciones</button>
                <button onClick={handlePestaña} value={'estadísticas'} disabled={pestaña === 'estadísticas'?true:false} style={{height:'50px', width:'120px'}}>Estadísticas</button>
                <button onClick={handlePestaña} value={'racialesEIniciales'} disabled={pestaña === 'racialesEIniciales'?true:false} style={{height:'50px', width:'120px', padding:'3px', borderRadius:'2px', border:(personaje.clase === 'Explorador' && personaje.apt1[2].length === 0) || (claseStats['conjuros iniciales'] && personaje.apt1[2].length + (clase === 'Mago'?0:1) < 2) ?'solid 2px red':pestaña === 'racialesEIniciales'?'solid 1px rgba(0,0,0,0.2)':'solid 1px rgba(0,0,0,0.5)'}}>Aptitudes raciales e iniciales{(personaje.clase === 'Explorador' && personaje.apt1[2].length === 0) || (claseStats['conjuros iniciales'] && personaje.apt1[2].length + (clase === 'Mago'?0:1) < 2)?<FaArrowDown style={{color:'red', fontSize: 22, position:'absolute', pointerEvents:'none'}}/>:null}</button>
                <button onClick={handlePestaña} value={'2oMayor'} disabled={pestaña === '2oMayor'?true:false} style={{height:'50px', width:'120px', padding:'3px', borderRadius:'2px', border:personaje['apt2+'].length + 1 < personaje.nivel?'solid 2px red':pestaña === '2oMayor'?'solid 1px rgba(0,0,0,0.2)':'solid 1px rgba(0,0,0,0.5)'}}>Aptitudes de nivel 2 o mayor{personaje['apt2+'].length + 1 < personaje.nivel?<MdOutlinePlusOne style={{color:'red', fontSize: 25, position:'absolute', pointerEvents:'none'}}/>:null}</button>
                <button onClick={handlePestaña} value={'cdp'} disabled={pestaña === 'cdp'?true:false} style={{height:'50px', width:'120px'}}>Clase de prestigio</button>
                <button onClick={handlePestaña} value={'equipamiento'} disabled={pestaña === 'equipamiento'?true:false} style={{height:'50px', width:'120px'}}>Equipamiento</button>
            </div>
            <div name={'opciones'} style={{display:'flex', flexDirection:'column', width:'425px', alignSelf:'center', display:pestaña==='opciones'?'block':'none'}}>
            <img style={{maxWidth: 400, maxHeight: 400, marginRight: '5px', marginLeft: '5px', border: 'ridge #754421 7px'}} width="400" src={images[`${raza}${clase}`]} alt='imagen'/>
            <div>
            <button style={{maxWidth:'fit-content', margin: '5px'}} onClick={guardarPersonaje} disabled={guardando === true || usu==='' || (personaje.nivel === 1 && personaje.apt1[2].length === 0 && Object.keys(personaje.CDP).length === 0 && personaje['apt2+'].length === 0)?true:false} >Guardar personaje</button>
            <button style={{maxWidth:'fit-content', margin: '5px', position: 'relative', left: '180px'}} onClick={subirNivel} disabled={(personaje.nivel !== personaje['apt2+'].length + 1 || personaje.nivel>4 || subirNiv === false)?true:false} >Subir de nivel</button>
            </div>
            </div>
            <div name={'estadísticas'} style={{width:'425px', minWidth:'60%', alignSelf:'center', display:pestaña==='estadísticas'?'flex':'none', flexDirection:'column'}}>
            <div className={styles.card} style={{width:'60px', alignSelf: 'center'}}>
                <GiBiceps style={{color:'brown', fontSize: 38, alignSelf: 'center'}}/>
                <p className={styles.description}> {`Nivel: ${personaje.nivel}`}</p>
            </div>
            <div className={styles.card} style={{width:'60px', alignSelf: 'center'}}>            
                <AiFillHeart style={{color:'red', fontSize: 40, alignSelf: 'center'}}/>
                <p className={styles.description}> {`PV: ${personaje.PV}`}</p>
            </div>
            <div className={styles.card} style={{width:'60px', alignSelf: 'center'}}>            
                <GiWalkingBoot style={{color:'#837367', fontSize: 40, alignSelf: 'center'}}/>
                <p className={styles.description}> {`VM: ${personaje.VM}`}</p>
            </div>
            <div className={styles.card} style={{width:'60px', alignSelf: 'center'}}>            
                <GiShoulderArmor style={{color:'#855029', fontSize: 40, alignSelf: 'center'}}/>
                <p className={styles.description}> {`RD: ${personaje.RD}`}</p>
            </div>
            </div>
            <div name={'racialesEIniciales'} style={{width:'425px', minWidth:'60%', alignSelf:'center', display:pestaña==='racialesEIniciales'?'block':'none'}}>
            <div className={styles.card} style={{border: '5px inset #ECDDD2', justifyContent:'flex-start', maxHeight:'fit-content'}}>
            <GiWingedScepter style={{color:'#62746D', fontSize: 40, alignSelf: 'center', margin:'2px'}}/>
            <p className={styles.description}> {`Aptitudes raciales: `}</p>
            <p style={{maxWidth: '400px'}}> {`${personaje.apt1[0]} (nivel 1)`}</p>
            {personaje.nivel >2?<p>{`${personaje.apt3} (nivel 3)`}</p>:null}
            <p className={styles.description}> {`Aptitudes cláseas de nivel 1: `}</p>
            {clase !== 'Explorador'? <p> {personaje.apt1[1]}</p>: <AptInicialExp personaje={personaje} setPersonaje={setPersonaje}/>}            
            {claseStats['conjuros iniciales']?<ConjuroInicial personaje={personaje} setPersonaje={setPersonaje} raza={raza} clase={clase} conjurosIniciales={claseStats['conjuros iniciales']} />:null}
            </div>
            </div>
            <div name={'2oMayor'} style={{width:'425px', minWidth:'60%', alignSelf:'center', display:pestaña==='2oMayor'?'block':'none'}}>
            <div className={styles.card} style={{border: '5px inset #ECDDD2', justifyContent:'flex-start', maxHeight:'fit-content'}}>
            <GiWingedScepter style={{color:'#62746D', fontSize: 40, alignSelf: 'center', margin:'2px'}}/>
            <p className={styles.description}> {`Aptitudes de nivel 2 o mayor: `}</p>
            {personaje['apt2+'].length>0?personaje['apt2+'].map((a)=> <p style={{width:'fit-content', maxWidth: '100%'}} key={`${a.nombre}${a.aptitud}`}>{`${a.nombre}${a.aptitud}`}</p>):null}
            {personaje['apt2+'].length + 1 < personaje.nivel? <div style={{display: 'flex', flexDirection: 'column'}}><p>Haz clic en una aptitud para elegirla:</p>
            {personaje.claseStatsFiltrados.map((a)=> <button disabled={isDisabled(a.requisitos)} style={{width:'fit-content', maxWidth: '100%', textAlign:'left'}} onClick={handleAptitud2} key={`${a.nombre}${a.aptitud}`} value={`${a.nombre}${a.aptitud}`}>{`${a.requisitos?'(Requisitos: '+a.requisitos+') ':''}`}{a.requisitos?<br/>:null}{`${a.nombre}${a.aptitud}`}</button>)}</div>:null}
            </div>
            </div>
            <div name={'cdp'} style={{width:'425px', minWidth:'60%', alignSelf:'center', display:pestaña==='cdp'?'block':'none'}}>
            <div className={styles.card} style={{border: '5px inset #ECDDD2', justifyContent:'flex-start', maxHeight:'fit-content'}}>
            <GiWingedScepter style={{color:'#62746D', fontSize: 40, alignSelf: 'center', margin:'2px'}}/>
            <p className={styles.description}> {`Clase de prestigio: `}</p>
            {personaje.CDP.nombre?<div><p style={{width:'fit-content', maxWidth: '100%'}} key={`${personaje.CDP.nombre}${personaje.CDP.aptitud}`}>{`${personaje.CDP.nombre}${personaje.CDP.aptitud}`}</p><button onClick={handleEdit} value={'edit'}>Editar</button></div>:<div style={{display: 'flex', flexDirection: 'column'}}><p>Haz clic en una clase de prestigio para elegirla:</p>
            {personaje.CDPClase.map((c)=> <button disabled={isDisabledCDP(c.requisitos)} style={{width:'fit-content', maxWidth: '100%', textAlign:'left'}} onClick={handleCDP} key={`${c.nombre}${c.aptitud}`} value={`${c.nombre}${c.aptitud}`}>{`${c.requisitos?'(Requisitos: '+c.requisitos+') ':''}`}{c.requisitos?<br/>:null}{`${c.nombre}${c.aptitud}`}</button>)}</div>}
            </div>
            </div>
            <div name={'equipamiento'} style={{width:'425px', minWidth:'60%', alignSelf:'center', display:pestaña==='equipamiento'?'block':'none'}}>
            <div className={styles.card} style={{border: '5px inset #ECDDD2', justifyContent:'flex-start', maxHeight:'fit-content'}}>
            <GiBackpack style={{color:'#7E603B', fontSize: 40, alignSelf: 'center', margin:'2px'}}/>
            <p className={styles.description}> {`Equipamiento: `}</p>            
            </div>
            </div>
            </div>            
        </div>
    )    
}