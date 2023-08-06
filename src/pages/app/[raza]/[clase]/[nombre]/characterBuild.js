'use client'
import Character from "@src/components/character"
import { useRouter } from "next/router"
import styles from "@src/styles/characterBuild.module.css"
import characters from "../../../../../controllers/characters"
import { useEffect, useState } from "react"

export default function CharacterBuild() {
  const router = useRouter()
  const {raza, clase, nombre} = router.query
  const [stats, setStats] = useState({nivel: 1, apt1Arr: [], CDP:{}, apt2Mas:[], ID: 0})
  const razaStats = characters.razas.filter((r) => r.raza === raza)[0]
  const claseStats = characters.clases.filter((c) => c.clase === clase)[0]
  let mainX = raza==='Humano'?'main1':raza==='Elfo'?'main2':raza==='Enano'?'main3':raza==='Orco'?'main4':raza==='Mediano'?'main5':raza==='Gnomo'?'main6':'main0'
  let gifUrls = {
    main0: '',
    main1: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGUxaXQzbzg1d2dtbWZ6c3Mzb211YnN1dWU2b3Rlc2p0aGpoZHFjeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/KHQtiY0hcPlPT3F3Zp/giphy.gif',
    main2: 'https://i.gifer.com/origin/94/9453bb10dcc37daf75abcf3fea141fc8_w200.webp',
    main3: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWt4czgwZTd6MWt3OTAyazQ4c3M3cHQ0cGQ4ejN6NXh3aHIyb3B0YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Wmp1EOzVybWd13s5DB/giphy.gif',
    main4: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG80a2gwODF4OGh0OGppa2Rub3oycGZvZGpjN2Y0M2s1d3hkdjkyayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TgygPXqxrx6PjwPymq/giphy.gif',
    main5: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmQ0ZWYzZDAyc3B6ZGh3M3kybzJlNzZzaTY1NjR4dWN4bXEzM2drdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/fW4qzqnk9WluHMbAtZ/giphy.gif',
    main6: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXR2eWEyYXcxa3ZwZjRuaGZqbmY1aHFxeTFlbTlxeWJpYzh0Z2w0cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3ov9k8fmDbIqzzbsLS/giphy.gif'
  }
  const [disp, setDisp] = useState('show')  

  setTimeout(()=> {
    setDisp('')
  }, 1800)

  useEffect(()=>{
    let cC = localStorage.getItem('currentCharacter')
    if (cC){
      cC = JSON.parse(cC)
      setStats({
        nivel: cC.nivel,
        apt1Arr: cC.apt1arr,
        CDP: cC.cdp,
        apt2Mas: cC.apt2mas,
        ID: cC.id
      })
    }
  },[])
  

    return (
    <div className={styles[mainX]}>
    {(disp==='show' && mainX !=='main0')?<img src={gifUrls[mainX]} style={{position:'absolute', left:'0px', top:'0px', width: '100%', height:'100%'}} alt='gif'/>:null}
    {razaStats?<Character ID={stats.ID} raza={raza} clase={clase} nombre={nombre} razaStats={razaStats} claseStats={claseStats} nivel={stats.nivel} apt1Arr={stats.apt1Arr} CDP={stats.CDP} apt2Mas={stats.apt2Mas}/>:null}
    </div>
    )    
}