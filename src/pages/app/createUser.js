// import '@picocss/pico'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import '@picocss/pico'
export default function CreateUser() {
    
    let usuarios, userNames, userEMails
    const [newUser, setNewUser] = useState({name: '', eMail: '', avatar: '', password: '', rePassword: ''})
    const [showPass, setShowPass] = useState(false)
    const [showRePass, setShowRePass] = useState(false)
    function onShowPass(e) {
        e.preventDefault()
        setShowPass(!showPass)
    }
    function onShowRePass(e) {
        e.preventDefault()
        setShowRePass(!showRePass)
    }
    axios.get('https://portfoliokoso.vercel.app/api/get-users')
    // axios.get('http://localhost:3000/api/get-users')    
        .then((users) => {
                usuarios = users.data.usuarios
                userNames = users.data.userNames
                userEMails = users.data.userEMails.map(e => e.toLowerCase())
        })
        .catch((error)=> {
            console.log(error)
        })
    const router = useRouter()
    let errorName = false, errorEMail = false, errorPassword = false, errorRePassword = false
    
    
    function onInputChange(e) {
        e.preventDefault()        
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    function onSubmit(e) {
        e.preventDefault()
        if (userNames.includes(newUser.name)) {
            alert('The name is in use. Insert a different one')
        }
        else if (userEMails.includes(newUser.eMail.toLowerCase())) {
            alert('The email is in use. Insert a different one')
            }
            else {
        axios.post('https://portfoliokoso.vercel.app/api/add-user', newUser)
        // axios.post('http://localhost:3000/api/add-user', newUser)
        .then(() => {            
            alert('Usuario creado')
            router.push('/')
        })
        .catch((error)=> {
            console.log(error)
        })
        }
    }

    if(newUser.name.length === 0 || newUser.name.length > 15 || /[^a-z0-9ñáéíóú]/i.test(newUser.name) === true) {        
        errorName = true        
    }
    if(newUser.password.length === 0 || newUser.password.length > 15 || /[^a-z0-9ñáéíóú]/i.test(newUser.password) === true) {        
        errorPassword = true
    }
    if(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(newUser.eMail) === false) {        
        errorEMail = true        
    }
    if (newUser.rePassword !== newUser.password) {
        errorRePassword = true
    }

    return (
        <div style={{width: '100%', display: 'flex', flexFlow: 'wrap', justifyContent:'center'}}>
            <form onSubmit={(e)=> onSubmit(e)} style={{width: '400px', marginTop:'12vh', maxHeight:'fit-content', padding: '7px'}}>                
                <input type="text" name='eMail' onChange={onInputChange} value={newUser.eMail} placeholder='Correo electrónico...'></input>
                <input type="text" name='name' onChange={onInputChange} value={newUser.nombre} placeholder='Nombre de usuario... (hasta 15 caracteres alfanuméricos)'></input>
                {/* <input type="text" name='password' onChange={onInputChange} value={newUser.password} placeholder='Password... (hasta 15 caracteres alfanuméricos)'></input> */}
                <div style={{display:'flex', flexFlow:'row', height:'fit-content', alignItems:'center'}}>
                <input type={showPass?"text":"password"} name='password' onChange={onInputChange} value={newUser.password} placeholder='Password... (hasta 15 caracteres alfanuméricos)'></input>
                <button style={{color: 'black', fontSize:'25px', border: 'solid 1px black', width:'40px', height: '40px', marginBottom: '0px', padding: '0px', justifyContent: 'center', alignItems: 'center', display: 'flex'}} onClick={onShowPass}>{showPass?<AiOutlineEye/>:<AiOutlineEyeInvisible/>}</button>
                </div>
                {/* <input type="text" name='rePassword' onChange={onInputChange} value={newUser.rePassword} placeholder='Repite el password...'></input> */}
                <div style={{display:'flex', flexFlow:'row', height:'fit-content', alignItems:'center'}}>
                <input type={showRePass?"text":"password"} name='rePassword' onChange={onInputChange} value={newUser.rePassword} placeholder='Repite el password...'></input>
                <button style={{color: 'black', fontSize:'25px', border: 'solid 1px black', width:'40px', height: '40px', marginBottom: '0px', padding: '0px', justifyContent: 'center', alignItems: 'center', display: 'flex'}} onClick={onShowRePass}>{showRePass?<AiOutlineEye/>:<AiOutlineEyeInvisible/>}</button>
                </div>
                <button type="submit" disabled={errorName === false && errorEMail === false && errorPassword === false && errorRePassword === false?false:true}>Crear usuario</button>
                {/* <button type="submit">Crear usuario</button> */}
            </form>
        </div>
    )
}