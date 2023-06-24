import { useEffect, useState } from "react"
import ConjuroInicial from "./conjuroInicial"
import AptInicialExp from "./aptInicialExp"
import images from "../controllers/images"
import styles from "@src/styles/characterBuild.module.css"
import {AiFillHeart} from "react-icons/ai"
import {GiBiceps, GiShoulderArmor, GiWalkingBoot, GiWingedScepter} from "react-icons/gi"
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
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <p style={{fontSize: 40, display:'flex', justifyContent:'center', margin:'1px', border: 'ridge #754421 17px', borderRadius: '20%', maxWidth: 'fit-content', padding: '3px', marginBottom: '5px'}}>{`${nombre}: ${raza} ${clase}`}</p>
            </div>
            <div style={{display:'flex', flexDirection:'row', marginBottom: '10px'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
            <img style={{maxWidth: 400, maxHeight: 400, marginLeft: '10px', border: 'ridge #754421 7px'}} width="400" src={images()[`${raza}${clase}`]} alt='imagen'/>
            <button style={{maxWidth:'fit-content', margin: '5px', position:'relative', left:'320px'}} onClick={subirNivel} disabled={personaje.nivel<5?false:true} >Subir de nivel</button>
            </div>
            <div style={{margin: '10px'}}>
            <div className={styles.card}>
                <GiBiceps style={{color:'brown', fontSize: 38, alignSelf: 'center'}}/>
                <p className={styles.description}> {`Nivel: ${personaje.nivel}`}</p>
            </div>
            <div className={styles.card}>            
                <AiFillHeart style={{color:'red', fontSize: 40, alignSelf: 'center'}}/>
                <p className={styles.description}> {`PV: ${personaje.PV}`}</p>
            </div>
            <div className={styles.card}>            
                <GiWalkingBoot style={{color:'#837367', fontSize: 40, alignSelf: 'center'}}/>
                <p className={styles.description}> {`VM: ${personaje.VM}`}</p>
            </div>
            <div className={styles.card}>            
                <GiShoulderArmor style={{color:'#855029', fontSize: 40, alignSelf: 'center'}}/>
                <p className={styles.description}> {`RD: ${personaje.RD}`}</p>
            </div>
            </div>
            <div>
            <div className={styles.card} style={{border: '5px inset #ECDDD2', justifyContent:'flex-start', maxHeight:'fit-content'}}>
            <GiWingedScepter style={{color:'#62746D', fontSize: 40, alignSelf: 'center', margin:'2px'}}/>
            <p className={styles.description}> {`Aptitudes de nivel 1: `}</p>
            <p style={{maxWidth: '400px'}}> {personaje.apt1[0]}</p>
            {clase !== 'Explorador'? <p style={{maxWidth: '400px'}}> {personaje.apt1[1]}</p>: <AptInicialExp personaje={personaje} setPersonaje={setPersonaje}/>}            
            {claseStats['conjuros iniciales']?<ConjuroInicial personaje={personaje} setPersonaje={setPersonaje} raza={raza} clase={clase} conjurosIniciales={claseStats['conjuros iniciales']} />:null}
            </div>
            </div>
            </div>            
        </div>
    )    
}