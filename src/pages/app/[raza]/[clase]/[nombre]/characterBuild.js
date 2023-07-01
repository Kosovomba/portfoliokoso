import Character from "@src/components/character"
import { useRouter } from "next/router"
import styles from "@src/styles/characterBuild.module.css"
import characters from "../../../../../controllers/characters"

export default function CharacterBuild() {
  const router = useRouter()
  const {raza, clase, nombre} = router.query
  const razaStats = characters.razas.filter((r) => r.raza === raza)[0]
  const claseStats = characters.clases.filter((c) => c.clase === clase)[0]

  function onClick(e) {
    e.preventDefault()
    router.push('https://portfoliokoso.vercel.app/')
    // router.push('https://localhost:3000')
  }  
    return (
    <div className={raza==='Humano'?styles.main1:raza==='Elfo'?styles.main2:raza==='Enano'?styles.main3:raza==='Orco'?styles.main4:raza==='Mediano'?styles.main5:styles.main6}>    
    <button onClick={onClick} style={{margin:'10px'}}>Volver</button>
    {razaStats?<Character raza={raza} clase={clase} nombre={nombre} razaStats={razaStats} claseStats={claseStats}/>:null}
    </div>
    )    
}