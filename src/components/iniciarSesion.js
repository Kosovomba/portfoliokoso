import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import {GiTireIronCross} from "react-icons/gi"
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"

export default function IniciarSesion({usuarios, userNames, userEMails, show, setShow}) {
    const [user, setUser] = useState({name: '', password: ''})
    const [showPass, setShowPass] = useState(false)
    const router = useRouter()

    function iniciarSes() {
        localStorage.setItem('usuario', user.name)
        setUser({...user, password: ''})        
        alert(`Iniciaste sesión como ${user.name}`)
        setUser({...user, name: ''})
        router.reload()
        // console.log(localStorage.getItem('usuario'))             
    }

    function onInputChange(e) {
        e.preventDefault()        
        setUser({...user, [e.target.name]: e.target.value})
        console.log(user)
    }

    function onSubmit(e) {
        e.preventDefault()
        if (!userNames.includes(user.name)) {
            alert('The user name does not exist')
        }
        else {
        axios.post('https://portfoliokoso.vercel.app/api/check-user', user)
        // axios.post('http://localhost:3000/api/check-user', user)
        .then((status) => {
            status = status.data
            console.log(status)
            if (status === true) {
                iniciarSes()
                setShow(!show)                
            }
            else alert(status)
        })
        .catch((error)=> {
            console.log(error)
        })
        }
    }
    function handleClick(e) {
        e.preventDefault()
        setShow(!show)
        router.push('/app/createUser')
    }
    function handleClose(e) {
        e.preventDefault()
        setShow(!show)
    }
    function onShowPass(e) {
        e.preventDefault()
        setShowPass(!showPass)
    }

    return (
        <div style={{display: 'grid', position: 'fixed', zIndex:1, top: '6.5vh', width:'100%', height:'100%', background:'rgba(0, 0, 0, 0.6)'}}>
        <div style={{marginBottom: '350px', display: 'flex', flexDirection:'column', alignItems: 'center', background: 'white', minWidth:'fit-content', justifySelf:'center', padding:'20px', boxShadow:'4px 2px 2px black', width:'80%', maxWidth: '60vh', height:'fit-content', alignSelf:'center'}}>
            <button onClick={handleClose} style={{color: 'black', fontSize:'25px', border: 'solid 1px black', width:'40px', height: '40px', marginBottom: '0px',padding: '0px', position: 'absolute', alignSelf:'flex-end', justifyContent: 'center', alignItems: 'center', display: 'flex'}}><GiTireIronCross/></button>
            <form style={{display: 'flex', flexDirection:'column'}} onSubmit={(e)=> onSubmit(e)}>                                
                <input style={{minHeight:'30px', minWidth:'350px', fontSize:'20px', padding:'6px', marginTop:'55px', marginBottom: '20px'}} type="text" name='name' onChange={onInputChange} value={user.name} placeholder='Nombre de usuario...'></input>
                <div style={{display:'flex', flexFlow:'row', height:'fit-content', alignItems:'center'}}>
                <input style={{minHeight:'30px', minWidth:'350px', fontSize:'20px', padding:'6px', marginTop:'20px', marginBottom: '20px'}} type={showPass?"text":"password"} name='password' onChange={onInputChange} value={user.password} placeholder='Password...'></input>
                <button style={{color: 'black', fontSize:'25px', border: 'solid 1px black', width:'40px', height: '40px', marginBottom: '0px', padding: '0px', justifyContent: 'center', alignItems: 'center', display: 'flex'}} onClick={onShowPass}>{showPass?<AiOutlineEye/>:<AiOutlineEyeInvisible/>}</button>
                </div>                
                <button style={{minHeight:'30px', minWidth:'350px', fontSize:'25px', padding:'6px', marginTop:'25px'}} type="submit" disabled={user.name === '' || user.password === ''?true:false}>Iniciar sesión</button>                
            </form>
            {router.pathname !== '/app/createUser'?<button onClick={handleClick} style={{fontSize:25, fontWeight: 600, justifyContent: 'center', width:'fit-content', marginTop: '45px'}}>Crear usuario</button>:null}
        </div>
        </div>
    )
}