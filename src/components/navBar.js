import Link from 'next/link'
import styles from '../styles/navBar.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import IniciarSesion from './iniciarSesion'
import UserOptions from './userOptions'

export default function NavBar() {
    const [show, setShow] = useState(false)
    const [info, setInfo] = useState({usuarios: [], userNames: [], userEMails: [], usuario: '', userOptions: false})

    useEffect(()=>{
        const us = localStorage.getItem('usuario')
        setInfo({...info, usuario: us})
    }, [])
    
    function onClick(e) {
        e.preventDefault()
        axios.get('https://portfoliokoso.vercel.app/api/get-users')
        // axios.get('http://localhost:3000/api/get-users')
        .then((users) => {
            setInfo({...info, 
                usuarios: users.data.usuarios,
                userNames: users.data.userNames,
                userEMails: users.data.userEMails
            })
            setShow(!show)
        })
        .catch((error)=> {
            console.log(error)
        })                
    }

    function onClick2(e) {
        e.preventDefault()
        setInfo({...info, userOptions: !info.userOptions})
    }

    return (
        <div>
        <div className={styles.container}>
            <Link href="/" style={{fontSize:25, fontWeight: 600}}>Inicio</Link>
            <div style={{display: 'flex', flexDirection: 'column', width: 'fit-content'}}>
            {info.usuario?<button onClick={onClick2} style={{width:'fit-content', margin: 10, padding: 8, fontSize:20}}>{`${info.usuario}`}</button>:<button onClick={onClick} style={{width:'fit-content', margin: 10, padding: 8, fontSize:20}}>Iniciar sesión</button>}
            {info.userOptions === true? <UserOptions/>:null}
            </div>
        </div>
            {show === true && info.usuarios.length !== 0?<IniciarSesion show ={show} setShow={setShow} usuarios={info.usuarios} userNames={info.userNames} userEMails={info.userEMails} />: null}
        </div>
    )
}