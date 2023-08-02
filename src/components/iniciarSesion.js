import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
export default function IniciarSesion({usuarios, userNames, userEMails, show, setShow}) {
    const [user, setUser] = useState({name: '', password: ''})
    const router = useRouter()

    function iniciarSes() {
        localStorage.setItem('usuario', user.name)
        setUser({...user, password: ''})
        alert(`Iniciaste sesión como ${user.name}`)
        setUser({...user, name: ''})
        router.reload()
        console.log(localStorage.getItem('usuario'))
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
                setTimeout(()=>router.push(router.pathname), 1500)
                
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

    return (
        <div style={{display: 'grid', position: 'fixed', top: '6.5vh', width:'100%', height:'100%', background:'rgba(0, 0, 0, 0.6)'}}>
        <div style={{marginBottom: '350px', display: 'flex', flexDirection:'column', alignItems: 'center', background: 'white', minWidth:'fit-content', justifySelf:'center', padding:'20px', boxShadow:'4px 2px 2px black', width:'80%', maxWidth: '60vh', height:'fit-content', alignSelf:'center'}}>
            <form style={{display: 'flex', flexDirection:'column'}} onSubmit={(e)=> onSubmit(e)}>                                
                <input style={{minHeight:'30px', minWidth:'350px', fontSize:'20px', padding:'6px', marginTop:'25px'}} type="text" name='name' onChange={onInputChange} value={user.name} placeholder='Nombre de usuario...'></input>
                <input style={{minHeight:'30px', minWidth:'350px', fontSize:'20px', padding:'6px', marginTop:'25px'}} type="text" name='password' onChange={onInputChange} value={user.password} placeholder='Password...'></input>                
                <button style={{minHeight:'30px', minWidth:'350px', fontSize:'25px', padding:'6px', marginTop:'25px'}} type="submit" disabled={user.name === '' || user.password === ''?true:false}>Iniciar sesión</button>
                {/* <button type="submit">Crear usuario</button> */}
            </form>
            {router.pathname !== '/app/createUser'?<button onClick={handleClick} style={{fontSize:25, fontWeight: 600, justifyContent: 'center', width:'fit-content', marginTop: '45px'}}>Crear usuario</button>:null}
        </div>
        </div>
    )
}