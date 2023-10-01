import { useEffect, useState } from "react"
import ConjuroInicial from "./conjuroInicial"
import AptInicialExp from "./aptInicialExp"
import ConjuroExtra from "./conjuroExtra"
import CompañeroAnimal from "./compañeroAnimal"
import images from "../controllers/images"
import styles from "@src/styles/characterBuild.module.css"
import {AiFillHeart, AiOutlineArrowDown} from "react-icons/ai"
import {FaArrowDown} from "react-icons/fa"
import axios from "axios"
import {GiPotionBall, GiSai, GiBiceps, GiShoulderArmor, GiWalkingBoot, GiWingedScepter, GiBackpack, GiBroadsword, GiCrossedSwords, GiPocketBow} from "react-icons/gi"
import {BsPersonBoundingBox} from 'react-icons/bs'
import {MdOutlinePlusOne} from 'react-icons/md'
import { useRouter } from "next/router"
import Objeto from "./objeto"
import Mercado from "./mercado"
// import Characters from "./characters"

// 'Imposición de manos: '
// apt1: "1xturno puede usar el d6 para curar 1d6 + nivel (a él u otro adyacente)."
// 'Curar: '
// 'Uso de ki: '
// 'Pociones: '
// 'Curar (conjuro): '


export default function Character ({conjurosInicialesCombinadosfiltrados, ID, raza, clase, nombre, razaStats, claseStats, nivel, apt1Arr, CDP, apt2Mas, equipamiento}) {
    const router = useRouter()
    let equip = [
        ['Botas', 'Otorga +1 a VM.', 'https://i.ebayimg.com/thumbs/images/g/QsYAAOSwuU1hIKQj/s-l640.jpg', 'Equipar'],
        ['Armadura', 'Otorga +1 a RD, por armadura equipada.', 'https://mcishop.azureedge.net/mciassets/w_3_0078279_knights-torso-armor-with-gorget_550.png', 'Equipar'],
        ['Armadura pesada', 'Otorga +2 a RD, por armadura equipada.', 'https://image.lexica.art/md2/0a49a0fc-4d5d-4b5d-9da7-6ad3dd517776', 'Equipar'],
        ['Arma cuerpo a cuerpo', 'Otorga +1 al daño de ataques cuerpo a cuerpo, por arma equipada.', '', 'Equipar'],
        ['Arma a distancia', 'Otorga +1 al daño de ataques a distancia, por arma equipada.', '', 'Equipar'],
        ['Amuleto de la suerte', 'Otorga +1 a encontrar tesoros y abrir cerraduras.', 'https://i.etsystatic.com/11680929/r/il/96ecb4/2777284084/il_fullxfull.2777284084_9j4g.jpg', 'Equipar'],
        ['Potenciador', 'Las aptitudes que se pueden usar 1xpiso, ahora pueden usarse 2xpiso; pero máximo 1xturno.', 'https://ae01.alicdn.com/kf/H37b5217f0d444fd4a66f6419afafe40cP/Amuleto-potenciador-de-la-ruleta-del-Palacio-de-las-estrellas-Feng-Shui-llavero-de-la-suma.jpg', 'Equipar'],
        ['Poción de curación', 'Se usa en un turno, gastando 1d6 de acción, se descarta y cura: 5 (con 1 o 2 en 1d6), 6 (con 3 o 4 en 1d6) o 7 de daño (con 5 o 6 en 1d6).', 'https://db4sgowjqfwig.cloudfront.net/campaigns/157632/assets/775857/potion_of_healing.png?1504791538', 'Usar'],
        ['Poción de restablecimiento', 'Se usa en un turno, gastando 1d6 de acción, se descarta, elimina un efecto negativo y cura: 1 (con 1 o 2 en 1d6), 2 (con 3 o 4 en 1d6) o 3 de daño (con 5 o 6 en 1d6).', 'https://cdn.nookazon.com/150x150/diablo2resurrected/potion/full_rejuv_potion.png', 'Usar'],
        ['Orbe de curación', 'Cualquier jugador puede usar una acción (en su turno) para curarse a él o a un aliado, la cantidad que quiera (siempre que haya al menos esa cantidad en la reserva del orbe); luego resta de la reserva la cantidad usada.', 'https://i0.wp.com/www.sundarimagic.com/wp-content/uploads/2021/04/dmkrv4-35813064-cdc8-44f3-a80b-04112498785f.jpeg?fit=1024%2C1027&ssl=1', 'UsarOrbe'],
        ['Arma de ninja','Otorga +1 al daño de la aptitud del Ninja ocre.', 'https://cdn.shopify.com/s/files/1/1099/4438/files/sai_1_480x480.png?v=1660016636', 'Equipar']
      ]
    let imagenArmaCC = ['Guerrero', 'Paladín', 'Explorador', 'Alquimista'].includes(clase)?'https://www.larpwarriors.co.uk/pub/media/catalog/product/cache/8ae2250be418cee7f3ca9f58f71e1975/r/f/rfb_wing_sword_large.jpg':clase==='Bárbaro'?'https://eldenring.wiki.fextralife.com/file/Elden-Ring/battle_axe_weapon_elden_ring_wiki_guide_200px.png':clase==='Clérigo'?'https://eldenring.wiki.fextralife.com/file/Elden-Ring/mace_hammer_weapon_elden_ring_wiki_guide_200px.png':['Druida', 'Monje', 'Oráculo'].includes(clase)?'https://www.larpwarriors.co.uk/pub/media/catalog/product/cache/8ae2250be418cee7f3ca9f58f71e1975/w/o/wooden_quarterstaff_large.jpg':clase==='Caballero'?'https://eldenring.wiki.fextralife.com/file/Elden-Ring/lance_greatspear_weapon_elden_ring_wiki_guide_200px.png':'https://m.media-amazon.com/images/I/41vQsBoRKSL._AC_UF1000,1000_QL80_.jpg'
    equip[3][2] = imagenArmaCC
    let imagenArmaDis = ['Guerrero', 'Explorador'].includes(clase)?'https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/6/65/Bow.png/revision/latest?cb=20150615094550':clase==='Ninja'?'https://i.ebayimg.com/images/g/ao0AAOSweyNZkQHd/s-l400.jpg':clase==='Alquimista'?'https://cdnb.artstation.com/p/assets/images/images/048/642/137/large/anna-smoke-red-magic-bottle.jpg?1650553489':clase==='Pícaro'?'https://cdn.webshopapp.com/shops/184325/files/353386562/1500x4000x3/practice-throwing-knives.jpg':'https://m.media-amazon.com/images/I/41hq2HsOlgL.jpg'
    equip[4][2] = imagenArmaDis
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
        }),
        equipamiento: equipamiento
    })
    const [usu, setUsu] = useState('')
    const [pestaña, setPestaña] = useState('opciones')
    const [guardando, setGuardando] = useState(false)
    const [mercado, setMercado] = useState(false)
    const [PVChange, setPVChange] = useState(1)
    const [PVTotal, setPVTotal] = useState(0)
    const [aptitudes, setAptitudes] = useState(false)
    const [bonos, setBonos] = useState({
        formaSalvaje: false, 
        armaduraMagica: false, 
        armaduraMagicax2: false, 
        ki: false, 
        semblante: false, 
        semblanteMayor: false, 
        pociones: false, 
        animalRD: false, 
        animalVM: false,
        armaDeidad: false,
        magiaC: false,
        desplazamiento: false,
        presciencia: false,
        espinas: false,
        regen: false,
        llamarRayo: false
        })
    let compa = {
        PV: personaje['apt2+'].filter(a => a.nombre === 'Vínculo animal: ').length >0?personaje.nivel*3:personaje.nivel*2, 
        VM: bonos.animalVM?1:0, 
        RD: bonos.animalRD?1:0, 
        daño: bonos.animalVM?1:0, 
        teleport: personaje['apt2+'].filter(a => a.nombre === 'Vínculo animal: ').length >0?true:false
    }
    const [armaD, setArmaD] = useState(0)
    const [regen, setRegen] = useState(0)
    const [desp, setDesp] = useState(0)
    let subirNiv = true
    let VMDescription = clase === 'Guerrero' && personaje['apt2+'].filter(a => a.nombre === 'Armadura pesada: ').length !== 0?'Aptitud "Armadura pesada": 1.':personaje['apt2+'].filter(a=> a.nombre === 'Montura: ').length !== 0?(clase === 'Caballero'?'Montura: 2.':'Montura: 3.'):PVTotal <= -10 && personaje['apt2+'].filter(a => a.nombre === 'Furia: ').length !== 0?'Furia: 1.':(personaje['apt2+'].filter(a => a.nombre === 'Maestría en conjuros defensivos: ').length !== 0 && (bonos.armaduraMagica || bonos.desplazamiento))?'Maestría en conjuros defensivos: 2.':personaje['apt2+'].filter((a)=> a.nombre === 'Forma salvaje mayor: ').length !== 0 && bonos.formaSalvaje?'Forma salvaje mayor: 1.':personaje['apt2+'].filter(a => a.nombre === 'Acción astuta: ').length !== 0?'Acción astuta: 1.':bonos.pociones?(personaje['apt2+'].filter(a => a.nombre === 'Mutágeno mejorado: ').length !== 0?'Mutágeno mejorado: 2':'Mutágeno: 1.'):''
    let VM2Description = personaje['apt2+'].filter(a => a.nombre === 'Saqueador: ').length !== 0?'Saqueador: 1.':(bonos.pociones && personaje['apt2+'].filter(a => a.nombre === 'Alquimia potenciada: ').length !== 0)?'Alquimia potenciada: 1.':''
    let RDDescription = bonos.armaduraMagica===false? (personaje.equipamiento[2][1]==='Equipado'?'Armadura equipada: 2.':personaje.equipamiento[1][1]==='Equipado'?'Armadura equipada: 1.':''):(bonos.armaduraMagicax2)?'Armadura (no equipada, bono Cdp): 3.':'Armadura (no equipada): 2.'
    let RD2Description = bonos.ki?((personaje['apt2+'].filter((a)=> a.nombre === 'uso de ki mejorado: ').length !== 0)?'Uso de ki: 2 (1 de armadura).':'Uso de ki: 1.'):bonos.semblanteMayor?'Semblante mayor: 1':bonos.pociones?'Mutágeno: 1':bonos.formaSalvaje? (Object.keys(personaje.CDP).length>0 && personaje.CDP.nombre === 'Combatiente de la naturaleza: '?'Forma salvaje: 2 (1 por Cdp).':'Forma salvaje: 1.'):bonos.animalRD?'Aptitud animal: 1.':''
    let CCDescription = bonos.formaSalvaje?((personaje['apt2+'].filter((a)=> a.nombre === 'Forma salvaje mayor: ')).length !== 0?'Forma salvaje mayor: 2.':'Forma salvaje: 1.'):
        (personaje.equipamiento[3][1]==='Equipado' || personaje.equipamiento[3][1]==='Equipado x2')?'Arma equipada: 1.':
            (Object.keys(personaje.CDP).length>0 && personaje.CDP.nombre === 'Puño iluminado: ')?'Puño iluminado: 1.':''
    let CCDescription2 = bonos.semblante? 'Semblante: 1.':(personaje.equipamiento[3][1]==='Equipado' && (Object.keys(personaje.CDP).length>0 && personaje.CDP.nombre === 'Mago de batalla: '))?'Mago de batalla: 1.':(personaje.equipamiento[3][1]==='Equipado' && (personaje['apt2+'].filter(a=>a.nombre === 'Arma mágica: ').length !== 0))?'Arma mágica: 1.':(personaje['apt2+'].filter(a=>a.nombre === 'Maestría con arma cuerpo a cuerpo: ').length !== 0)?'Maestría: 1.':(personaje['apt2+'].filter(a=>a.nombre === 'Montura: ').length !== 0 && clase === 'Caballero')?'Montura: 1.':''
    let CCDescription3 = bonos.armaDeidad? `Arma de la deidad: ${armaD}.`:(PVTotal<=-10 && (personaje['apt2+'].filter((a)=> a.nombre === 'Furia: ').length !== 0))?'Furia: 2.':(Object.keys(personaje.CDP).length>0 && personaje.CDP.nombre === 'Maestro en armas: ')?'Maestro en armas: 1.':''
    let CC2Description = personaje.equipamiento[3][1]==='Equipado x2'?'Arma equipada: 1.':null
    let ADDescription = personaje.equipamiento[4][1]==='Equipado' && (clase !== 'Alquimista' || (personaje['apt2+'].filter(a => a.nombre === 'Alquimia potenciada: ').length !== 0))?'Arma a distancia equipada: 1.':null
    let ADDescription2 = PVTotal <= -10 && (personaje['apt2+'].filter((a)=> a.nombre === 'Furia: ')).length !== 0?'Furia: 2.':(personaje.CDP.hasOwnProperty('nombre') && personaje.CDP.nombre === 'Maestro en armas: ')?'Maestro en armas: 1.':(personaje.equipamiento[4][1]==='Equipado' && personaje['apt2+'].filter(a => a.nombre === 'Armamento ninja: ').length !== 0)?'Armamento ninja: 1.':bonos.magiaC?'Magia caótica: 1.':personaje['apt2+'].filter(a=>a.nombre === 'Maestría en conjuros ofensivos: ').length !== 0?'Maestría en conjuros ofensivos: 1.':personaje['apt2+'].filter(a=> a.nombre === 'Bombas potentes: ').length !== 0?'Bombas potentes: 1.':''
    let ADDescription3 = (raza === 'Orco' && Object.keys(personaje.CDP).length === 4 && clase === 'Bárbaro' && personaje.CDP.extra.slice(0,3) === 'Ray')?'Raza: 1.':personaje['apt2+'].filter(a=> a.nombre === 'Bombas explosivas: ').length !== 0?'Bombas explosivas: 1.':''
    let aNinjaDescription = personaje.equipamiento[10][1]==='Equipado'?'Arma especial equipada: 1.':null
    let armaDisabled = (personaje['apt2+'].filter((a)=> a.nombre === 'Luchador versátil: ').length !== 0 || personaje.apt1[2][0] === 'Combate con dos armas: 1xturno, cuando usa 1d6 de acción para atacar, lanza otro d6 extra de ataque. El explorador puede comprar una segunda arma para obtener daño por arma para su ataque extra (el arma extra sólo sumará daño a ataques extra de combate con dos armas).')?'flex':'none'
    let armaDisDisabled = (['Pícaro', 'Alquimista'].includes(clase) || (personaje.CDP.hasOwnProperty('extra') && ['Saeta', 'Rayo ', 'Proye'].includes(personaje.CDP.extra.slice(0,5))) || (clase !== 'Explorador' && personaje.apt1[2].filter((a)=>['Saeta', 'Rayo ', 'Proye'].includes(a.slice(0,5))).length !== 0) || (personaje['apt2+'].filter((a)=> a.nombre === 'Lanzador experimentado: ' && ['Rayo ', 'Proye'].includes(a.extra.slice(0,5))).length !== 0) || (personaje.apt1[2][0] === 'Arquería: Sus ataques pueden ser de rango 6 casillas.') || personaje['apt2+'].filter((a)=> ['Arquería: ', 'Luchador versátil: ', 'Uso mejorado de Ki: ', 'Armamento ninja: ', 'Misterios: '].includes(a.nombre) && (a.nombre === 'Armamento ninja: '?personaje.equipamiento[4][1] === 'Equipado':true)).length !== 0)?'flex':'none'
    let aNinjaDisabled = personaje.CDP.hasOwnProperty('nombre') && personaje.CDP.nombre === 'Ninja ocre: '?'flex':'none'


    useEffect(()=> {
        let us = localStorage.getItem('usuario')
        us?setUsu(us):null
    },[])

    useEffect(()=> {
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
        let setBo = {}
        Object.keys(bonos).forEach(b=>setBo[b] = false)
        setBonos(setBo)
    }

    function handleAptitudes(e) {
        e.preventDefault()
        setAptitudes(!aptitudes)
    }

    function subirNivel(e) {
        e.preventDefault()        
        setPersonaje({...personaje, nivel: personaje.nivel + 1})
    }

    function bajarNivel(e) {
        e.preventDefault()
        let cartel = `Bajaste a nivel ${personaje.nivel -1}.`
        if (personaje.nivel === personaje['apt2+'].length + 1) {
            let aux = personaje['apt2+'].pop()
            setPersonaje({...personaje, claseStatsFiltrados: personaje.claseStatsFiltrados.push(aux)})
            cartel = cartel + ` Se eliminó la aptitud elegida en nivel ${personaje.nivel}.`
        }
        setPersonaje({...personaje, nivel: personaje.nivel - 1})
        alert(cartel)
    }
    function guardarPersonaje(e) {
        e.preventDefault()
        let us = localStorage.getItem('usuario')
        us && usu !== ''?setUsu(us):null
        if (usu !== '') {
        setGuardando(true)
        let newCharacter = {...personaje, usuario: usu, apt1Arr: JSON.stringify(personaje.apt1[2]), apt2Mas: JSON.stringify(personaje['apt2+']), CDP: JSON.stringify(personaje.CDP), equipamiento: JSON.stringify(personaje.equipamiento)}
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
                apt2mas: personaje['apt2+'],
                equipamiento: personaje.equipamiento
            }))
            console.log(localStorage.getItem('currentCharacter'))
            alert('Personaje guardado')
            setGuardando(false)
        })
        .catch((error)=> {
            console.log(error)
        })
        } else {
            alert('Debes iniciar sesión para guardar un personaje')
        }
    }
    function handlePestaña (e) {
        e.preventDefault()
        setPestaña(e.target.value)
    }
    function handleMercado(e) {
        e.preventDefault()
        setMercado(!mercado)
    }

    function setVM() {
        let extra = 0
        if (personaje.equipamiento[0][1] === 'Equipado') extra = extra + 1
        if ((clase === 'Guerrero' && personaje['apt2+'].filter(a => a.nombre === 'Armadura pesada: ').length !== 0) || (PVTotal <= -10 && personaje['apt2+'].filter(a => a.nombre === 'Furia: ').length !== 0) || (personaje['apt2+'].filter((a)=> a.nombre === 'Forma salvaje mayor: ').length !== 0 && bonos.formaSalvaje) || personaje['apt2+'].filter(a => a.nombre === 'Acción astuta: ').length !== 0) extra = extra + 1
        if (bonos.pociones) {
            extra = extra + 1
            if (personaje['apt2+'].filter(a => a.nombre === 'Mutágeno mejorado: ').length !== 0) extra = extra + 1
            if (personaje['apt2+'].filter(a => a.nombre === 'Alquimia potenciada: ').length !== 0) extra = extra + 1
        }
        personaje['apt2+'].filter(a => a.nombre === 'Montura: ').length !== 0?(clase==='Caballero'?extra = extra + 2:extra = extra + 3):null
        if (personaje['apt2+'].filter(a => a.nombre === 'Maestría en conjuros defensivos: ').length !== 0 && (bonos.armaduraMagica || bonos.desplazamiento)) extra = extra + 2
        if (personaje['apt2+'].filter(a => a.nombre === 'Saqueador: ').length !== 0) extra = extra + 1
        return extra
    }

    function setRD() {
        let extra = 0
        if (personaje.equipamiento[2][1] === 'Equipado' && bonos.armaduraMagica === false) extra = extra + 2
        else if (personaje.equipamiento[1][1] === 'Equipado' || personaje.equipamiento[1][1] === 'Equipado x2') extra = extra + 1
        if (bonos.armaduraMagica) personaje.equipamiento[1][1]==='Equipado'?extra = extra + 1:extra = extra +2
        if (bonos.ki)(personaje['apt2+'].filter((a)=> a.nombre === 'uso de ki mejorado: ').length !== 0)? extra = extra +2:extra = extra +1
        if (bonos.semblanteMayor || bonos.pociones || bonos.formaSalvaje || bonos.armaduraMagicax2 || bonos.animalRD) extra = extra + 1
        if (bonos.formaSalvaje && (Object.keys(personaje.CDP).length>0 && personaje.CDP.nombre === 'Combatiente de la naturaleza: ')) extra = extra + 1       
        return extra
    }

    function setACC() {
        let extra = 0
        if ((personaje.equipamiento[3][1] === 'Equipado' || personaje.equipamiento[3][1] === 'Equipado x2' || (Object.keys(personaje.CDP).length>0 && personaje.CDP.nombre === 'Puño iluminado: ')) && !bonos.formaSalvaje) extra = extra + 1        
        if (bonos.semblante || (personaje['apt2+'].filter((a)=> (a.nombre === 'Montura: ' || a.nombre === 'Maestría con arma cuerpo a cuerpo: '))).length !== 0 ||(bonos.pociones && (personaje['apt2+'].filter((a)=> a.nombre === 'Mutágeno mejorado: ')).length !== 0) || (personaje.equipamiento[3][1] === 'Equipado' && ((personaje['apt2+'].filter((a)=> (a.nombre === 'Armamento ninja: ' || a.nombre === 'Arma mágica: '))).length !== 0 || (Object.keys(personaje.CDP).length>0 && personaje.CDP.nombre === 'Mago de batalla: ')))) extra = extra + 1
        if (bonos.formaSalvaje)(personaje['apt2+'].filter((a)=> a.nombre === 'Forma salvaje mayor: ')).length !== 0? extra = extra + 2:extra = extra + 1
        if (personaje.equipamiento[3][1] === 'Equipado' && bonos.armaDeidad) extra = extra + armaD
        if (personaje['apt2+'].filter(a=> a.nombre === 'Furia: ').length !== 0 && PVTotal <=-10) extra = extra + 2
        if (Object.keys(personaje.CDP).length>0 && personaje.CDP.nombre === 'Maestro en armas: ') extra = extra + 1
        if (raza === 'Orco') extra = extra + 1
        return extra
    }

    function setACC2() {
        let extra = 0        
        if (personaje.equipamiento[3][1] === 'Equipado x2') extra = extra + 1
        if (raza === 'Orco') extra = extra + 1
        return extra
    }

    function setAD() {
        let extra = 0
        if (personaje.equipamiento[4][1] === 'Equipado') {
            extra = extra + 1
            personaje['apt2+'].filter(a => a.nombre === 'Alquimia potenciada: ').length !== 0?null:extra = extra - 1
            if (personaje['apt2+'].filter(a => a.nombre === 'Armamento ninja: ').length !== 0) extra = extra + 1
        }
        if ((personaje.CDP.hasOwnProperty('nombre') && personaje.CDP.nombre === 'Maestro en armas: ') || bonos.magiaC || personaje['apt2+'].filter(a => (a.nombre === 'Maestría en conjuros ofensivos: ' || a.nombre === 'Bombas potentes: ')).length !== 0) extra = extra + 1
        if (personaje['apt2+'].filter(a=> a.nombre === 'Furia: ').length !== 0 && PVTotal <=-10) extra = extra + 2
        if ((raza === 'Orco' && clase === 'Bárbaro' && Object.keys(personaje.CDP).length === 4 && personaje.CDP.extra.slice(0,3) === 'Ray') || personaje['apt2+'].filter(a => a.nombre === 'Bombas explosivas: ').length !== 0) extra = extra + 1
        if (bonos.pociones && personaje['apt2+'].filter(a => a.nombre === 'Mutágeno mejorado: ').length !== 0) extra = extra + 1
        return extra
    }

    function setANinja() {
        let extra = 0
        if (personaje.equipamiento[10][1] === 'Equipado') {
            if (personaje['apt2+'].filter((a)=> a.nombre === 'Armamento ninja: ').length !== 0) extra = extra + 2
            else extra = extra + 1
        }
        return extra
    }

    function onPVChange(e) {
        e.preventDefault()
        setPVChange(e.target.value)
    }

    function handlePV(e) {
        e.preventDefault()
        let total = e.target.value === 'Sumar'?PVTotal + Math.floor(PVChange):PVTotal - PVChange
        total > 0?total=0:total<0-personaje.PV?total=0-personaje.PV:null
        setPVTotal(total)
        setPVChange(1)
    }

    function handleAI(e) {
        e.preventDefault()
        if (e.target.value === 'armaDeidad') {
            if (!bonos.armaDeidad){
            let bon = Math.floor(Math.random()*3) + 1
            if (raza === 'Humano' && personaje.nivel > 2 && bon === 1) bon = 2
            setArmaD(bon)
            alert(`Arma de la deidad: Obtuviste +${bon} al daño`)
            } else setArmaD(0)
        }
        if (e.target.value === 'regen') {
            if (!bonos.regen){
            let bon = Math.floor(Math.random()*2) + 2
            setRegen(bon)
            alert(`Regeneración: Obtuviste ${bon} de regeneración`)
            } else setRegen(0)
        }
        if (e.target.value === 'desplazamiento') {
            if (!bonos.desplazamiento){            
            setDesp(personaje.nivel)
            } else setDesp(0)
        }
        if (e.target.value === 'animal') {
            if (!bonos.animalRD){            
            compa.RD = 1
            } else compa.RD = 0
        }
        if (e.target.value === 'animalVM') {
            if (!bonos.animalVM){            
            compa.VM = 1
            compa.daño = 1
            } else {
                compa.VM = 0
                compa.daño = 0
            }
        }
        e.target.value === 'armaduraMagica' && bonos.armaduraMagica && bonos.armaduraMagicax2?
        setBonos({...bonos, armaduraMagica: false, armaduraMagicax2: false}):
        e.target.value === 'animal'?setBonos({...bonos, animalRD: !bonos.animalRD}):
        e.target.value === 'semblanteMayor'?setBonos({...bonos, semblanteMayor: !bonos.semblanteMayor, semblante: bonos.semblante !== bonos.semblanteMayor? bonos.semblante: !bonos.semblante}):
        e.target.value === 'semblante' && bonos.semblante && (personaje['apt2+'].filter((a)=> a.nombre === 'Semblante mayor de la deidad (conjuro): ')).length !== 0?setBonos({...bonos, semblanteMayor: bonos.semblante !== bonos.semblanteMayor?bonos.semblanteMayor:!bonos.semblanteMayor, semblante: !bonos.semblante}):
        setBonos({...bonos, [e.target.value]: !bonos[e.target.value]})        
    }

    function handleMagiaC(e) {
        e.preventDefault()
        let tirada = tirarD6()
        if(tirada.resultado === 6) {
            setBonos({...bonos, magiaC: true})
        }
        let efecto = personaje['apt2+'].filter(a => a.nombre === 'Magia caótica: ')[0].tabla[tirada.resultado - 1]
        alert(`${tirada.cartel} Efecto: ${efecto}`)
    }

    function handleDesp(e) {
        e.preventDefault()        
        if (desp - 1  === 0) setBonos({...bonos, desplazamiento: false})
        setDesp(desp - 1)
    }

    function tirarD6(n = 0) {
        let result = Math.floor(Math.random()*6) + 1
        let cartel = ''
        if (raza === 'Humano'){
            if (personaje.nivel <3 && result === 1){
            result = 2
            cartel = '1 en el dado. Se convierte en 2 por humano.'
            }
            if (personaje.nivel >=3 && result <=2){
            cartel = `${result} en el dado. Se convierte en 3 por humano.`
            result = 3
            }
        }
        return {resultado: result, bono: n, cartel: 'Obtuviste ' + (cartel !== ''?cartel:result + ' en el dado.') + (n !== 0? `Resultado final: ${result + n}`:'')}
    }

    // function handleAA(e) {
    //     e.preventDefault()
    //     setBonos({...bonos, animalVM: !bonos.animalVM})
    // }

    if (clase === 'Explorador' && personaje.apt1[2].length === 0) {        
        subirNiv = false
        }
    if (claseStats['conjuros iniciales'] && personaje.apt1[2].length + (clase === 'Mago'?0:1) < 2) {        
        subirNiv = false
        }        

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <p style={{marginTop:'7vh', fontSize: 40, display:'flex', justifyContent:'center', border: 'ridge #754421 17px', borderRadius: '20%', backgroundColor:'rgba(118,49,21,0.4)', maxWidth: 'fit-content', padding: '3px', marginBottom: '5px'}}>{`${nombre}: ${raza} ${clase}`}</p>
            </div>
            {/* <div style={{display:'flex', flexFlow:'wrap'}}> */}
            <div style={{display:'flex', flexDirection:'column', justifyContent: 'center'}}>
            <div style={{display:'flex', flexFlow:'wrap', minWidth: '95%', justifyContent: 'center'}}>
                <button onClick={handlePestaña} value={'opciones'} disabled={pestaña === 'opciones'?true:false} style={{height:'50px', width:'120px'}}>Opciones</button>
                <button onClick={handlePestaña} value={'estadísticas'} disabled={pestaña === 'estadísticas'?true:false} style={{height:'50px', width:'120px'}}>Estadísticas</button>
                <button onClick={handlePestaña} value={'racialesEIniciales'} disabled={pestaña === 'racialesEIniciales'?true:false} style={{height:'50px', width:'120px', border:(personaje.clase === 'Explorador' && personaje.apt1[2].length === 0) || (claseStats['conjuros iniciales'] && personaje.apt1[2].length + (clase === 'Mago'?0:1) < 2) ?'solid 2px red':null}}>Aptitudes raciales e iniciales{(personaje.clase === 'Explorador' && personaje.apt1[2].length === 0) || (claseStats['conjuros iniciales'] && personaje.apt1[2].length + (clase === 'Mago'?0:1) < 2)?<FaArrowDown style={{color:'red', fontSize: 22, position:'absolute', pointerEvents:'none'}}/>:null}</button>
                <button onClick={handlePestaña} value={'2oMayor'} disabled={pestaña === '2oMayor'?true:false} style={{height:'50px', width:'120px', border:personaje['apt2+'].length + 1 < personaje.nivel?'solid 2px red':null}}>Aptitudes de nivel 2 o mayor{personaje['apt2+'].length + 1 < personaje.nivel?<MdOutlinePlusOne style={{color:'red', fontSize: 25, position:'absolute', pointerEvents:'none'}}/>:null}</button>
                <button onClick={handlePestaña} value={'cdp'} disabled={pestaña === 'cdp'?true:false} style={{height:'50px', width:'120px'}}>Clase de prestigio</button>
                <button onClick={handlePestaña} value={'equipamiento'} disabled={pestaña === 'equipamiento'?true:false} style={{height:'50px', width:'120px'}}>Equipamiento</button>
            </div>
            <div name={'opciones'} style={{display:'flex', flexDirection:'column', width:'410px', alignSelf:'center', display:pestaña==='opciones'?'block':'none'}}>
            <img style={{maxWidth: 400, maxHeight: 400, marginRight: '5px', marginLeft: '5px', border: 'ridge #754421 7px'}} width="385" src={usu==='LadyLiz' && raza==='Humano' && clase === 'Druida'?'/imgs/lizy.jpg':images[`${raza}${clase}`]} alt='imagen'/>
            <div>
            <button style={{maxWidth:'fit-content', margin: '5px'}} onClick={guardarPersonaje} disabled={guardando === true || (personaje.nivel === 1 && personaje.apt1[2].length === 0 && Object.keys(personaje.CDP).length === 0 && personaje['apt2+'].length === 0)?true:false} >Guardar personaje</button>
            <button style={{maxWidth:'fit-content', margin: '5px', position: 'relative', left: '69px'}} onClick={bajarNivel} disabled={personaje.nivel < 2} >Bajar de nivel</button>
            <button style={{maxWidth:'fit-content', margin: '5px', position: 'relative', left: '74px'}} onClick={subirNivel} disabled={(personaje.nivel !== personaje['apt2+'].length + 1 || personaje.nivel>4 || subirNiv === false)?true:false} >Subir de nivel</button>
            </div>
            </div>
            <div name={'estadísticas'} style={{width:'410px', alignSelf:'center', display:pestaña==='estadísticas'?'flex':'none', flexDirection:'column'}}>            
            <div className={styles.card} style={{border: '5px inset #ECDDD2', justifyContent:'flex-start', maxHeight:'fit-content'}}>            
            
                {aptitudes === false?<button className={styles.c} onClick={handleAptitudes}>Aptitudes</button>:
                <div className={styles.d}>
                    <p style={{fontSize:'20px', fontWeight:600, margin:0}}>Detalles de aptitudes:</p><button style={{position:'absolute', right:'3px', width:'25px', height:'25px'}} onClick={handleAptitudes}>X</button>
                    <p style={{margin: 0, marginTop: 10}}> {`${personaje.apt1[0]} (nivel 1, raza)`}</p>
                    {personaje.nivel >2?<p className={styles.apt}>{`${personaje.apt3} (nivel 3, raza)`}</p>:null}

                    <div style={{marginTop:'10px'}}><span>{personaje.apt1[1]}</span><button value={'formaSalvaje'} onClick={handleAI} style={{display: clase==='Druida'?'block':'none' , float:'right'}}>{bonos.formaSalvaje===false?'Activar':'Desactivar'}</button></div>
                    {personaje.apt1[2].length !== 0?personaje.apt1[2].map(a => <div key={a}><span>{a}</span><button value={'armaduraMagica'} onClick={handleAI} style={{display: a.slice(0,3)==='Arm'?'block':'none' , float:'right'}}>{bonos.armaduraMagica===false?'Activar':'Desactivar'}</button><button value={'armaduraMagicax2'} onClick={handleAI} style={{display: a.slice(0,3)==='Arm' && bonos.armaduraMagica && !bonos.armaduraMagicax2 && Object.keys(personaje.CDP).length >0 && personaje.CDP.nombre === 'Mago especialista: '?'block':'none' , float:'right'}}>Reactivar</button></div>):null}
                    
                    {personaje['apt2+'].length>0?personaje['apt2+'].map((a,ind)=> {
                        let ap = ''
                        if (a.nombre === 'Uso de ki: ' && clase === 'Ninja' ) ap = 'ki'
                        if (a.nombre === 'Semblante mayor de la deidad (conjuro): ' ) ap = 'semblanteMayor'
                        if (a.nombre === 'Semblante de la deidad (conjuro): ' ) ap = 'semblante'
                        if (a.nombre === 'Pociones: ' ) ap = 'pociones'
                        if (a.nombre === 'Aptitud animal (conjuro): ') ap = 'animal'
                        if (a.nombre === 'Arma de la deidad (conjuro): ') ap = 'armaDeidad'
                        if (a.nombre === 'Magia caótica: ') ap = 'magiaC'
                        if (a.nombre === 'Desplazamiento (conjuro): ') ap = 'desplazamiento'
                        if (a.nombre === 'Presciencia menor (conjuro): ') ap = 'presciencia'
                        if (a.nombre === 'Espinas (conjuro): ') ap = 'espinas'
                        if (a.nombre === 'Regeneración (conjuro): ') ap = 'regen'
                        if (a.nombre === 'Llamar rayo (conjuro): ') ap = 'llamarRayo'
                        return <div key={`a2${ind}`}>
                        <p style={{width:'fit-content', maxWidth: '100%', marginBottom:0}} key={`${a.nombre}${a.aptitud}`}>{`${a.nombre}${a.aptitud}`}<span style={{display:'flex'}}><span style={{fontSize:'18px', padding: '4px', color:'#BA1919', fontWeight:'600'}}>{a.nombre === 'Magia caótica: ' && bonos.magiaC?'Efecto 6 activo.':a.nombre === 'Desplazamiento (conjuro): ' && bonos.desplazamiento?`Activo: ${desp} ${desp > 1?'usos restantes':'uso restante'}`:a.nombre === 'Regeneración (conjuro): ' && bonos.regen?`Regeneración por turno: ${regen}`:bonos[ap]?'Activo.':''}</span><button onClick={handleDesp} style={{display: a.nombre === 'Desplazamiento (conjuro): ' && bonos.desplazamiento?'block':'none', height:'fit-content', alignSelf:'center'}}>Gastar 1 uso</button><button value={ap} disabled={ap === 'armaDeidad' && personaje.equipamiento[3][1] !== 'Equipado'? true:false} onClick={handleAI} style={{display: ap !== ''?'block':'none', height:'fit-content', alignSelf:'center'}}>{ap !== 'animal'?(bonos[ap]===false?(ap === 'pociones'?'Activar mutágeno':ap === 'magiaC'?'Activar efecto 6':'Activar'):(ap === 'pociones'?'Desactivar mutágeno':ap === 'magiaC'?'Desactivar efecto 6':'Desactivar')):(bonos.animalRD===false?'Activar RD':'Desactivar RD')}</button></span><button value={'animalVM'} onClick={handleAI} style={{display: ap === 'animal'?'block':'none'}}>{!bonos.animalVM?'Activar VM':'Desactivar VM'}</button></p>
                        {a.nombre === 'Lanzador experimentado: ' && a.extra.length >0?<div><span>{a.extra}</span><button value={'armaduraMagica'} onClick={handleAI} style={{display: a.extra.slice(0,3)==='Arm'?'block':'none' , float:'right'}}>{bonos.armaduraMagica===false?'Activar':'Desactivar'}</button><button value={'armaduraMagicax2'} onClick={handleAI} style={{display: a.extra.slice(0,3)==='Arm' && bonos.armaduraMagica && !bonos.armaduraMagicax2 && Object.keys(personaje.CDP).length >0 && personaje.CDP.nombre === 'Mago especialista: '?'block':'none' , float:'right'}}>Reactivar</button></div>:null }
                        {a.nombre === 'Luchador versátil: '? <p style={{border:'dotted brown 2px', padding: '5px', margin:'0px'}}>{personaje.apt1[2][0] !== 'Arquería: Sus ataques pueden ser de rango 6 casillas.'?'Arquería: Sus ataques pueden ser de rango 6 casillas.':'Combate con dos armas: 1xturno, cuando usa 1d6 de acción para atacar, lanza otro d6 extra de ataque. El explorador puede comprar una segunda arma para obtener daño por arma para su ataque extra (el arma extra sólo sumará daño a ataques extra de combate con dos armas).'}</p>:null}
                        <div style={{display: a.tabla?'flex':'none', flexDirection:'column', width:'fit-content', maxWidth:'100%', border:'1px solid black'}}>
                            <div style={{margin:0, display:'flex', flexDirection:'row'}}><span style={{display: 'flex', flexWrap:'wrap',border:'1px solid black', padding:'4px', minWidth:'90px', justifyContent:'center', alignContent:'center', fontWeight: 900}}>{personaje.clase === 'Explorador'?'Casillas':'Dado'}</span><span style={{display: 'flex', flexWrap:'wrap',border:'1px solid black', padding:'4px', width:'100%', justifyContent:'center', alignContent:'center', fontWeight: 900}}>{personaje.clase === 'Explorador'?'Daño':'Efecto'}</span></div>
                            {a.tabla?.map((f,i)=> <div key={i} style={{margin:0, display:'flex', flexDirection:'row'}}><span style={{display: 'flex', flexWrap:'wrap', border:'1px solid black', padding:'4px', minWidth:'90px', justifyContent:'center', alignContent:'center'}}>{i+1}</span><span style={{display: 'flex', flexWrap:'wrap',border:'1px solid black', padding:'3px', width:'100%', justifyContent:'left', alignContent:'center'}}>{f}</span></div>)}                            
                        </div>
                        {/* {a.nombre === 'Compañero animal: '? <CompañeroAnimal PV={compa.PV} RD={compa.RD} VM={compa.VM} daño={compa.daño} teleport={compa.teleport} vinculo={personaje['apt2+'].filter(a=>a.nombre === 'Vínculo animal: ').length > 0} bonos={bonos} regen={regen} />:null} */}
                        <button onClick={handleMagiaC} style={{display: ap === 'magiaC'?'block':'none', position:'relative' , left:'300px'}}>Tirar d6</button>
                        </div>
                        }):null}
                    {personaje.CDP.nombre?<div>
                        <p style={{width:'fit-content', maxWidth: '100%'}} key={`${personaje.CDP.nombre}${personaje.CDP.aptitud}`}>{`${personaje.CDP.nombre}${personaje.CDP.aptitud}`}</p>
                        {personaje.CDP.hasOwnProperty('extra')?<div><span>{personaje.CDP.extra}</span><button value={'armaduraMagica'} onClick={handleAI} style={{display: personaje.CDP.extra.slice(0,3)==='Arm'?'block':'none' , float:'right'}}>{bonos.armaduraMagica===false?'Activar':'Desactivar'}</button></div>:null}
                        </div>:null}
                </div>}
            
            <div className={styles.card} style={{width:'98px', height:'86px', alignSelf: 'flex-start'}}>
                <GiBiceps style={{color:'brown', fontSize: 50, alignSelf: 'center'}}/>
                <p className={styles.description}> {`Nivel: ${personaje.nivel}`}</p>
            </div>            
            <div className={styles.card2}>
            <div className={styles.card} style={{width:'98px', height:'86px'}}>            
                <AiFillHeart style={{color:'red', fontSize: 50, alignSelf: 'center'}}/>
                <p className={styles.description}> {`PV: ${personaje.PV + Math.floor(PVTotal)}/${personaje.PV}`}</p>
            </div>
            <div style={{display:'flex', height:'fit-content', alignSelf:'center'}}>
            <button value='Restar' onClick={handlePV}>Restar</button>
            <input style={{width:'40px', height:'30px'}} type="number" min={1} onChange={onPVChange} value={PVChange}></input>
            <button value='Sumar' onClick={handlePV}>Sumar</button>
            </div>
            </div>
            <div className={styles.card2}>
            <div className={styles.card} style={{width:'98px', height:'86px', alignSelf: 'flex-start'}}>            
                <GiWalkingBoot style={{color:'#837367', fontSize: 50, alignSelf: 'center'}}/>
                <p className={styles.description}> {`VM: ${personaje.VM + setVM()}`}</p>
            </div>
            <div>
            <p style={{alignSelf:'flex-start', margin:'2px'}}>Detalles: (Velocidad de movimiento)</p>
            {personaje.VM>0?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{'Raza y clase: ' + personaje.VM +'.'}</p>:null}
            {personaje.equipamiento[0][1] === 'Equipado'?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>Botas equipadas: 1.</p>:null}
            {VMDescription.length >0?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{VMDescription}</p>:null}
            {VM2Description.length >0?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{VM2Description}</p>:null}
            </div>
            </div>
            <div className={styles.card2}>
            <div className={styles.card} style={{width:'98px', height:'86px'}}>
                <GiShoulderArmor style={{color:'#855029', fontSize: 50, alignSelf: 'center'}}/>
                <p className={styles.description}> {`RD: ${personaje.RD + setRD()}`}</p>
            </div>
            <div>
            <p style={{alignSelf:'flex-start', margin:'2px'}}>Detalles: (Reducción de daño)</p>
            {raza==='Enano'?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>Raza: 1.</p>:null}
            {RDDescription.length >0?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{RDDescription}</p>:null}
            {RD2Description.length >0?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{RD2Description}</p>:null}
            </div>
            </div>
            <div className={styles.card2}>
            <div className={styles.card} style={{width:'98px', height:'86px'}}>            
                <GiBroadsword style={{color:'#9B9B9B', fontSize: 50, alignSelf: 'center'}}/>
                <p className={styles.description}> {`Daño: 1d6 ${setACC()!==0?`+ ${setACC()}`:''}`}</p>
            </div>
            <div>
            <p style={{alignSelf:'flex-start', margin:'2px'}}>Detalles: (Ataque cuerpo a cuerpo) </p>
            {raza==='Orco'?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>Raza: 1.</p>:null}
            <p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{CCDescription}</p>
            {CCDescription2?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{CCDescription2}</p>:null}
            {personaje.equipamiento[3][1] === 'Equipado' && (personaje['apt2+'].filter((a)=> a.nombre === 'Armamento ninja: ')).length !== 0?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>Armamento ninja: 1.</p>:null}
            {bonos.pociones && (personaje['apt2+'].filter((a)=> a.nombre === 'Mutágeno mejorado: ')).length !== 0?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>Mutágeno mejorado: 1.</p>:null}
            {CCDescription3?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{CCDescription3}</p>:null}            
            </div>
            </div>
            <div className={styles.card2} style={{display: armaDisabled}}>
            <div className={styles.card} style={{width:'98px', height:'86px'}}>            
                <GiCrossedSwords style={{color:'#9B9B9B', fontSize: 50, alignSelf: 'center'}}/>
                <p className={styles.description}> {`Daño: 1d6 ${setACC2()!==0?`+ ${setACC2()}`:''}`}</p>
            </div>
            <div>
            <p style={{alignSelf:'flex-start', margin:'2px'}}>Detalles: (Combate con dos armas)</p>
            {raza==='Orco'?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>1 por raza.</p>:null}
            <p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{CC2Description}</p>
            </div>
            </div>
            <div className={styles.card2} style={{display: armaDisDisabled}}>
            <div className={styles.card} style={{width:'98px', height:'86px'}}>            
            {clase !== 'Alquimista'?<GiPocketBow style={{transform: "rotate(270deg)", color:'#5E684C', fontSize: 50, alignSelf: 'center'}}/>:<GiPotionBall style={{color:'#BA3119', fontSize: 50, alignSelf: 'center'}}/>}
                <p className={styles.description}> {`Daño: 1d6 ${setAD()!==0?`+ ${setAD()}`:''}`}</p>
            </div>
            <div>
            <p style={{alignSelf:'flex-start', margin:'2px'}}>{clase !== 'Alquimista'?'Detalles: (Ataque a distancia)':'Detalles: (Ataque a distancia: bombas)'}</p>
            {ADDescription?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{ADDescription}</p>:null}
            {ADDescription2?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{ADDescription2}</p>:null}
            {ADDescription3?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{ADDescription3}</p>:null}
            {bonos.pociones && personaje['apt2+'].filter(a => a.nombre === 'Mutágeno mejorado: ').length !== 0?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>Mutágeno mejorado: 1.</p>:null}
            </div>
            </div>
            <div className={styles.card2} style={{display: aNinjaDisabled}}>
            <div className={styles.card} style={{width:'98px', height:'86px'}}>            
                <GiSai style={{color:'#8D8D8D', fontSize: 50, alignSelf: 'center'}}/>
                <p className={styles.description}> {`Daño: 1d6 ${setANinja()!==0?`+ ${setANinja()}`:''}`}</p>
            </div>
            <div>
            <p style={{alignSelf:'flex-start', margin:'2px'}}>Detalles: (Ataque de Ninja ocre)</p>
            <p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{aNinjaDescription}</p>
            {personaje.equipamiento[10][1] === 'Equipado' && (personaje['apt2+'].filter((a)=> a.nombre === 'Armamento ninja: ')).length !== 0?<p style={{alignSelf:'center', justifySelf:'flex-start', margin:'0px'}}>{'Armamento ninja: 1.'}</p>:null}
            </div>
            </div>
            
            {personaje['apt2+'].filter(a => a.nombre === 'Compañero animal: ').length > 0?<div className={styles.card}><span style={{textAlign:'center', fontSize:'18px', marginBottom:'4px'}}>Compañero animal.</span><CompañeroAnimal PV={compa.PV} RD={compa.RD} VM={compa.VM} daño={compa.daño} teleport={compa.teleport} vinculo={personaje['apt2+'].filter(a=>a.nombre === 'Vínculo animal: ').length > 0} bonos={bonos} regen={regen} /></div>:null}
            
            </div>
            </div>
            <div name={'racialesEIniciales'} style={{width:'410px', minWidth:'60%', alignSelf:'center', display:pestaña==='racialesEIniciales'?'block':'none'}}>
            <div className={styles.card} style={{border: '5px inset #ECDDD2', justifyContent:'flex-start', maxHeight:'fit-content'}}>
            <GiWingedScepter style={{color:'#62746D', fontSize: 40, alignSelf: 'center', margin:'2px'}}/>
            <h2> {`Aptitudes raciales: `}</h2>
            <p style={{maxWidth: '100%'}}> {`${personaje.apt1[0]} (nivel 1)`}</p>
            {personaje.nivel >2?<p>{`${personaje.apt3} (nivel 3)`}</p>:null}
            <h2> {`Aptitudes cláseas de nivel 1: `}</h2>
            {clase !== 'Explorador'? <p style={{maxWidth: '100%'}}> {personaje.apt1[1]}</p>: <AptInicialExp personaje={personaje} setPersonaje={setPersonaje}/>}            
            {claseStats['conjuros iniciales']?<ConjuroInicial personaje={personaje} setPersonaje={setPersonaje} raza={raza} clase={clase} bonos={bonos} setBonos={setBonos} conjurosIniciales={claseStats['conjuros iniciales']} />:null}
            </div>
            </div>
            <div name={'2oMayor'} style={{width:'410px', minWidth:'60%', alignSelf:'center', display:pestaña==='2oMayor'?'block':'none'}}>
            <div className={styles.card} style={{border: '5px inset #ECDDD2', justifyContent:'flex-start', maxHeight:'fit-content'}}>
            <GiWingedScepter style={{color:'#62746D', fontSize: 40, alignSelf: 'center', margin:'2px'}}/>
            <h2> {`Aptitudes de nivel 2 o mayor: `}</h2>
            {personaje['apt2+'].length>0?personaje['apt2+'].map((a,ind)=> {
                return <div key={`a2${ind}`}>
                <p style={{width:'fit-content', maxWidth: '100%', marginBottom:0}} key={`${a.nombre}${a.aptitud}`}>{`${a.nombre}${a.aptitud}`}</p>
                {a.nombre === 'Lanzador experimentado: '?<ConjuroExtra bonos={bonos} setBonos={setBonos} personaje={personaje} setPersonaje={setPersonaje} raza={raza} clase={clase} conjurosIniciales={claseStats['conjuros iniciales']} />:null }
                {a.nombre === 'Luchador versátil: '? <p style={{border:'dotted brown 2px', padding: '5px', margin:'0px'}}>{personaje.apt1[2][0] !== 'Arquería: Sus ataques pueden ser de rango 6 casillas.'?'Arquería: Sus ataques pueden ser de rango 6 casillas.':'Combate con dos armas: 1xturno, cuando usa 1d6 de acción para atacar, lanza otro d6 extra de ataque. El explorador puede comprar una segunda arma para obtener daño por arma para su ataque extra (el arma extra sólo sumará daño a ataques extra de combate con dos armas).'}</p>:null}
                <div style={{display: a.tabla?'flex':'none', flexDirection:'column', width:'fit-content', maxWidth:'100%', border:'1px solid black'}}>
                    <div style={{margin:0, display:'flex', flexDirection:'row'}}><span style={{display: 'flex', flexWrap:'wrap',border:'1px solid black', padding:'4px', minWidth:'90px', justifyContent:'center', alignContent:'center', fontWeight: 900}}>{personaje.clase === 'Explorador'?'Casillas':'Dado'}</span><span style={{display: 'flex', flexWrap:'wrap',border:'1px solid black', padding:'4px', width:'100%', justifyContent:'center', alignContent:'center', fontWeight: 900}}>{personaje.clase === 'Explorador'?'Daño':'Efecto'}</span></div>
                    {a.tabla?.map((f,i)=> <div key={i} style={{margin:0, display:'flex', flexDirection:'row'}}><span style={{display: 'flex', flexWrap:'wrap', border:'1px solid black', padding:'4px', minWidth:'90px', justifyContent:'center', alignContent:'center'}}>{i+1}</span><span style={{display: 'flex', flexWrap:'wrap',border:'1px solid black', padding:'3px', width:'100%', justifyContent:'left', alignContent:'center'}}>{f}</span></div>)}
                </div>
                </div>
            }):null}
            {personaje['apt2+'].length + 1 < personaje.nivel? <div style={{display: 'flex', flexDirection: 'column'}}><p>Haz clic en una aptitud para elegirla:</p>
            {personaje.claseStatsFiltrados.map((a,i)=> {
               return <div key={`a${i}`} style={{border:'2px solid brown', margin:'1px'}}>
                <button disabled={isDisabled(a.requisitos)} style={{width:'fit-content', maxWidth: '100%', textAlign:'left'}} onClick={handleAptitud2} key={`${a.nombre}${a.aptitud}`} value={`${a.nombre}${a.aptitud}`}>{`${a.requisitos?'(Requisitos: '+a.requisitos+') ':''}`}{a.requisitos?<br/>:null}{`${a.nombre}${a.aptitud}`}{a.tabla?<br/>:null}</button>
                {personaje.claseStatsFiltrados[i].tabla? <div style={{display: a.tabla?'flex':'none', flexDirection:'column', width:'fit-content', maxWidth:'100%', border:'1px solid black'}}>
                    <div style={{margin:0, display:'flex', flexDirection:'row'}}><span style={{display: 'flex', flexWrap:'wrap',border:'1px solid black', padding:'4px', minWidth:'90px', justifyContent:'center', alignContent:'center', fontWeight: 900}}>{personaje.clase === 'Explorador'?'Casillas':'Dado'}</span><span style={{display: 'flex', flexWrap:'wrap',border:'1px solid black', padding:'4px', width:'100%', justifyContent:'center', alignContent:'center', fontWeight: 900}}>{personaje.clase === 'Explorador'?'Daño':'Efecto'}</span></div>
                    {a.tabla?.map((f,i)=> <div key={`f${i}`} style={{margin:0, display:'flex', flexDirection:'row'}}><span style={{display: 'flex', flexWrap:'wrap', border:'1px solid black', padding:'4px', minWidth:'90px', justifyContent:'center', alignContent:'center'}}>{i+1}</span><span style={{display: 'flex', flexWrap:'wrap',border:'1px solid black', padding:'3px', width:'100%', justifyContent:'left', alignContent:'center'}}>{f}</span></div>)}
                </div>:null}
            </div>}
            )}</div>:null}
            </div>
            </div>
            <div name={'cdp'} style={{width:'410px', minWidth:'60%', alignSelf:'center', display:pestaña==='cdp'?'block':'none'}}>
            <div className={styles.card} style={{border: '5px inset #ECDDD2', justifyContent:'flex-start', maxHeight:'fit-content'}}>
            <GiWingedScepter style={{color:'#62746D', fontSize: 40, alignSelf: 'center', margin:'2px'}}/>
            <h2> {`Clase de prestigio: `}</h2>
            {personaje.CDP.nombre?<div><p style={{width:'fit-content', maxWidth: '100%'}} key={`${personaje.CDP.nombre}${personaje.CDP.aptitud}`}>{`${personaje.CDP.nombre}${personaje.CDP.aptitud}`}</p>{personaje.CDP.hasOwnProperty('extra')?<ConjuroExtra bonos={bonos} setBonos={setBonos} personaje={personaje} setPersonaje={setPersonaje} raza={raza} clase={clase} conjurosIniciales={conjurosInicialesCombinadosfiltrados} />:null}<button onClick={handleEdit} value={'edit'}>Editar</button></div>:<div style={{display: 'flex', flexDirection: 'column'}}><p>Haz clic en una clase de prestigio para elegirla:</p>
            {personaje.CDPClase.map((c)=> <button disabled={isDisabledCDP(c.requisitos)} style={{width:'fit-content', maxWidth: '100%', textAlign:'left'}} onClick={handleCDP} key={`${c.nombre}${c.aptitud}`} value={`${c.nombre}${c.aptitud}`}>{`${c.requisitos?'(Requisitos: '+c.requisitos+') ':''}`}{c.requisitos?<br/>:null}{`${c.nombre}${c.aptitud}`}</button>)}</div>}
            </div>
            </div>
            <div name={'equipamiento'} style={{width:'410px', minWidth:'60%', alignSelf:'center', display:pestaña==='equipamiento'?'block':'none'}}>
            <div className={styles.card} style={{border: '5px inset #ECDDD2', justifyContent:'flex-start', maxHeight:'fit-content'}}>
            <GiBackpack style={{color:'#7E603B', fontSize: 40, alignSelf: 'center', margin:'2px'}}/>
            <div style={{display:'flex', flexWrap:'wrap', alignItems:'center'}}><h2> {`Equipamiento: `}</h2><button disabled={mercado} onClick={handleMercado} style={{marginLeft:'10px', height:'fit-content', padding:'6px', fontSize:'20px'}}>Comprar</button></div>
            <div style={{display:'flex', flexFlow:'wrap'}}>
            {personaje.equipamiento.map((o,i) => {
                o = [...equip[i], ...o]
                return o[4] > 0? <Objeto key={o[0]} item={i} nombre={o[0]} descripcion={o[1]} imagen={o[2]} opcion={o[3]} cantidad={o[4]} estado={o[5]} nota={o[6]} personaje={personaje} setPersonaje={setPersonaje} PVTotal={PVTotal} setPVTotal={setPVTotal}/>:null
                })}
            </div>
            </div>
            </div>
            {mercado&&<Mercado personaje={personaje} setPersonaje={setPersonaje} mercado={mercado} setMercado={setMercado} clase={personaje.clase} raza={personaje.raza}/>}
            </div>            
        </div>
    )    
}