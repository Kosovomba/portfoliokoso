import Character from "@src/components/character"
import { useRouter } from "next/router"
import styles from "@src/styles/characterBuild.module.css"
import characters from "../../../../../controllers/characters"
import { useEffect, useState } from "react"

export default function CharacterBuild() {
  const router = useRouter()
  const {raza, clase, nombre} = router.query
  const [stats, setStats] = useState({nivel: 1, apt1Arr: [], CDP:{}, apt2Mas:[], ID: 0, PE: 0, equipamiento: [
    [0, '', ''],
    [0, '', ''],
    [0, '', ''],
    [0, '', ''],
    [0, '', ''],
    [0, '', ''],
    [0, '', ''],
    [0, '', ''],
    [0, '', ''],
    [0, '', ''],
    [0, '', '']
  ]})
  const razaStats = characters.razas.filter((r) => r.raza === raza)[0]
  const claseStats = characters.clases.filter((c) => c.clase === clase)[0]

  let conjurosInicialesCombinados = [...characters.clases[3]["conjuros iniciales"], ...characters.clases[12]["conjuros iniciales"]]
  let hash = {}
  let conjurosInicialesCombinadosfiltrados = conjurosInicialesCombinados.filter((e) => {
    const exist = !hash[e.nombre];
    hash[e.nombre] = true;
    return exist;
  })

  let mainX = raza==='Humano'?'main1':raza==='Elfo'?'main2':raza==='Enano'?'main3':raza==='Orco'?'main4':raza==='Mediano'?'main5':raza==='Gnomo'?'main6':'main0'
  let gifUrls = {
    main0: '',
    main1: '/imgs/snow04.gif',
    main2: '/imgs/flores.webp',
    main3: '/imgs/lluvia.webp',
    main4: '/imgs/rayo.webp',
    main5: '/imgs/fiesta.webp',
    main6: '/imgs/chispas.webp'
  }
  const [disp, setDisp] = useState('show')  

  setTimeout(()=> {
    setDisp('')
  }, 2100)

  useEffect(()=>{
    let cC = localStorage.getItem('currentCharacter')
    if (cC){
      cC = JSON.parse(cC)
      setStats({
        ...stats,
        nivel: cC.nivel,
        apt1Arr: cC.apt1arr,
        CDP: cC.cdp,
        apt2Mas: cC.apt2mas,
        ID: cC.id,
        PE: cC.pe,
        equipamiento: cC.equipamiento
      })
    }
  },[])
  

    return (
    <div className={styles[mainX]}>
    {(disp==='show' && mainX !=='main0')?<img src={gifUrls[mainX]} style={{position:'absolute', left:'0px', top:'0px', width: '100%', height:'100%', pointerEvents:'none'}} alt='gif'/>:null}
    {razaStats?<Character conjurosInicialesCombinadosfiltrados={conjurosInicialesCombinadosfiltrados} PE={stats.PE} ID={stats.ID} raza={raza} clase={clase} nombre={nombre} razaStats={razaStats} claseStats={claseStats} nivel={stats.nivel} apt1Arr={stats.apt1Arr} CDP={stats.CDP} apt2Mas={stats.apt2Mas} equipamiento={stats.equipamiento}/>:null}
    </div>
    )    
}