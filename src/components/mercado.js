import styles from "../styles/mercado.module.css"
import {GiTireIronCross} from "react-icons/gi"
export default function Mercado({clase, raza, mercado, setMercado, personaje, setPersonaje}){

    function handleClose(e){
        e.preventDefault()
        setMercado(!mercado)
    }
    function handleComprar(e) {
        e.preventDefault()
        let equipamiento = personaje.equipamiento
        equipamiento[e.target.value][0] = equipamiento[e.target.value][0] + 1
        setPersonaje({...personaje, equipamiento: equipamiento})
        console.log(e.target.value)
    }
    return (
        <div className={styles.container}>
            <button className={styles.c} onClick={handleClose}>< GiTireIronCross/></button>
            <h2 className={styles.t}>Mercado</h2>
        <div style={{overflowY:'scroll', overflowX:'hidden'}} >            
            <p className={styles.p}>Botas: Otorga +1 a VM.<button disabled={personaje.equipamiento[0][0] > 0} onClick={handleComprar} value='0' className={styles.b}>Comprar (1 PP)</button></p>
            <p className={styles.p}>Armadura: Otorga +1 a RD, por armadura equipada.<button disabled={personaje.equipamiento[1][0] > 0} onClick={handleComprar} value='1' className={styles.b}>Comprar (2 PP)</button></p>
            <p className={styles.p}>Armadura pesada (sólo guerrero, caballero o paladín, cuando tengan la aptitud correspondiente): Otorga +2 a RD, por armadura equipada.<button disabled={personaje.equipamiento[2][0] > 0} onClick={handleComprar} value='2' className={styles.b}>Comprar (3 PP)</button></p>
            <p className={styles.p}>Arma cuerpo a cuerpo: Otorga +1 al daño de ataques cuerpo a cuerpo, por arma equipada.<button disabled={personaje.equipamiento[3][0] > 0} onClick={handleComprar} value='3' className={styles.b}>Comprar (3 PP)</button></p>
            <p className={styles.p}>Arma a distancia: Otorga +1 al daño de ataques a distancia, por arma equipada.<button disabled={personaje.equipamiento[4][0] > 0} onClick={handleComprar} value='4' className={styles.b}>Comprar (3 PP)</button></p>
            <p className={styles.p}>Amuleto de la suerte: Otorga +1 a encontrar tesoros y abrir cerraduras.<button disabled={personaje.equipamiento[5][0] > 0} onClick={handleComprar} value='5' className={styles.b}>Comprar (3 PP)</button></p>
            <p className={styles.p}>Potenciador: Las aptitudes que se pueden usar 1xpiso, ahora pueden usarse 2xpiso; pero máximo 1xturno.<button disabled={personaje.equipamiento[6][0] > 0} onClick={handleComprar} value='6' className={styles.b}>Comprar (4 PP)</button></p>
            <p className={styles.p}>Poción de curación: Usa 1d6 de acción, se descarta y cura: 5 (con 1 o 2 en 1d6), 6 (con 3 o 4 en 1d6) o 7 PV (con 5 o 6 en 1d6).<button disabled={personaje.equipamiento[7][0] + personaje.equipamiento[8][0]>= personaje.nivel} onClick={handleComprar} value='7' className={styles.b}>Comprar (1 PP)</button></p>
            <p className={styles.p}>Poción de restablecimiento: Usa 1d6 de acción, se descarta, elimina un efecto negativo y cura: 1 (con 1 o 2 en 1d6), 2 (con 3 o 4 en 1d6) o 3 de daño (con 5 o 6 en 1d6).<button disabled={personaje.equipamiento[7][0] + personaje.equipamiento[8][0]>= personaje.nivel} onClick={handleComprar} value='8' className={styles.b}>Comprar (1 PP)</button></p>
            <p className={styles.p}>Orbe de curación (sólo en modo cooperativo, para el último piso): Al comprarlo, todos los pjs pueden invertir los PP que quieran. El orbe tendrá una reserva de curación igual a ‘PP invertidos’x3. Cualquier jugador puede usar una acción (en su turno) para curarse a él o a un aliado, la cantidad que quiera (siempre que haya al menos esa cantidad en la reserva del orbe); luego resta de la reserva la cantidad usada.<button onClick={handleComprar} value='9' className={styles.b}>Comprar (X PP)</button></p>
            <p className={styles.p}>Arma de ninja: Otorga +1 al daño por arma equipada, a la aptitud del Ninja ocre.<button disabled={personaje.equipamiento[10][0] > 0} onClick={handleComprar} value='10' className={styles.b}>Comprar (1 PP)</button></p>            
        </div>
        </div>
    )
}