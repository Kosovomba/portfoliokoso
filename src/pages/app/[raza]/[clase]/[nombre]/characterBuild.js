'use client'
import Character from "@src/components/character"
import { useRouter } from "next/router"
import styles from "@src/styles/characterBuild.module.css"
import characters from "../../../../../controllers/characters"
import { useEffect, useState } from "react"

export default function CharacterBuild() {
  const router = useRouter()
  const {raza, clase, nombre} = router.query
  const [stats, setStats] = useState({nivel: 1, apt1Arr: [], CDP:{}, apt2Mas:[], ID: 0, equipamiento: [
    ['Botas', 'Otorga +1 a VM.', 'https://i.ebayimg.com/thumbs/images/g/QsYAAOSwuU1hIKQj/s-l640.jpg', 0, 'Equipar', '', ''],
    ['Armadura', 'Otorga +1 a RD, por armadura equipada.', 'https://mcishop.azureedge.net/mciassets/w_3_0078279_knights-torso-armor-with-gorget_550.png', 0, 'Equipar', '', ''],
    ['Armadura pesada', 'Otorga +2 a RD, por armadura equipada.', 'https://image.lexica.art/md2/0a49a0fc-4d5d-4b5d-9da7-6ad3dd517776', 0, 'Equipar', '', ''],
    ['Arma cuerpo a cuerpo', 'Otorga +1 al daño de ataques cuerpo a cuerpo, por arma equipada.', '', 0, 'Equipar', '', ''],
    ['Arma a distancia', 'Otorga +1 al daño de ataques a distancia, por arma equipada.', '', 0, 'Equipar', '', ''],
    ['Amuleto de la suerte', 'Otorga +1 a encontrar tesoros y abrir cerraduras.', 'https://i.etsystatic.com/11680929/r/il/96ecb4/2777284084/il_fullxfull.2777284084_9j4g.jpg', 0, 'Equipar', '', ''],
    ['Potenciador', 'Las aptitudes que se pueden usar 1xpiso, ahora pueden usarse 2xpiso; pero máximo 1xturno.', 'https://ae01.alicdn.com/kf/H37b5217f0d444fd4a66f6419afafe40cP/Amuleto-potenciador-de-la-ruleta-del-Palacio-de-las-estrellas-Feng-Shui-llavero-de-la-suma.jpg', 0, 'Equipar', '', ''],
    ['Poción de curación', 'Se usa en un turno, gastando 1d6 de acción, se descarta y cura: 5 (con 1 o 2 en 1d6), 6 (con 3 o 4 en 1d6) o 7 de daño (con 5 o 6 en 1d6).', 'https://db4sgowjqfwig.cloudfront.net/campaigns/157632/assets/775857/potion_of_healing.png?1504791538', 0, 'Usar', '', ''],
    ['Poción de restablecimiento', 'Se usa en un turno, gastando 1d6 de acción, se descarta, elimina un efecto negativo y cura: 1 (con 1 o 2 en 1d6), 2 (con 3 o 4 en 1d6) o 3 de daño (con 5 o 6 en 1d6).', 'https://cdn.nookazon.com/150x150/diablo2resurrected/potion/full_rejuv_potion.png', 0, 'Usar', '', ''],
    ['Orbe de curación', 'Cualquier jugador puede usar una acción (en su turno) para curarse a él o a un aliado, la cantidad que quiera (siempre que haya al menos esa cantidad en la reserva del orbe); luego resta de la reserva la cantidad usada.', 'https://i0.wp.com/www.sundarimagic.com/wp-content/uploads/2021/04/dmkrv4-35813064-cdc8-44f3-a80b-04112498785f.jpeg?fit=1024%2C1027&ssl=1', 0, 'UsarOrbe', '', ''],
    ['Arma de ninja','Otorga +1 al daño de la aptitud del Ninja ocre.', 'https://cdn.shopify.com/s/files/1/1099/4438/files/sai_1_480x480.png?v=1660016636', 0, 'Equipar', '', '']
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
        ...stats,
        nivel: cC.nivel,
        apt1Arr: cC.apt1arr,
        CDP: cC.cdp,
        apt2Mas: cC.apt2mas,
        ID: cC.id,
        equipamiento: cC.equipamiento
      })
    }
  },[])
  

    return (
    <div className={styles[mainX]}>
    {(disp==='show' && mainX !=='main0')?<img src={gifUrls[mainX]} style={{position:'absolute', left:'0px', top:'0px', width: '100%', height:'100%'}} alt='gif'/>:null}
    {razaStats?<Character conjurosInicialesCombinadosfiltrados={conjurosInicialesCombinadosfiltrados} ID={stats.ID} raza={raza} clase={clase} nombre={nombre} razaStats={razaStats} claseStats={claseStats} nivel={stats.nivel} apt1Arr={stats.apt1Arr} CDP={stats.CDP} apt2Mas={stats.apt2Mas} equipamiento={stats.equipamiento}/>:null}
    </div>
    )    
}