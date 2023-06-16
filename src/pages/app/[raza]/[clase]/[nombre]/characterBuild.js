import Character from "@src/components/character"
import { useRouter } from "next/router"
import styles from "@src/styles/characterBuild.module.css"
import Characters from "../../../../../components/characters"

export default function CharacterBuild() {
  const router = useRouter()
  const {raza, clase, nombre} = router.query
  const razaStats = Characters().razas.filter((r) => r.raza === raza)[0]
  const claseStats = Characters().clases.filter((c) => c.clase === clase)[0]

  function onClick(e) {
    e.preventDefault()
    router.push('https://portfoliokoso.vercel.app/')
  }  
    return (
    <div className={styles.main}>
    <button onClick={onClick}>Volver</button>
    {razaStats?<Character raza={raza} clase={clase} nombre={nombre} razaStats={razaStats} claseStats={claseStats}/>:null}
    </div>
    )    
}