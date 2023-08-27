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
            <p className={styles.p}>Botas: Otorga +1 a VM.<button disabled={personaje.equipamiento[0][0] > 0} onClick={handleComprar} value='0' className={styles.b}>Comprar (1 PP)</button></p>
            <p className={styles.p}>Armadura: Otorga +1 a RD, por armadura equipada.<button disabled={personaje.equipamiento[1][0] > 0} onClick={handleComprar} value='1' className={styles.b}>Comprar (2 PP)</button></p>
            <p className={styles.p}>Armadura pesada (sólo guerrero, caballero o paladín, cuando tengan la aptitud correspondiente): Otorga +2 a RD, por armadura equipada.<button disabled={personaje.equipamiento[2][0] > 0} onClick={handleComprar} value='2' className={styles.b}>Comprar (3 PP)</button></p>
            <p className={styles.p}>Arma cuerpo a cuerpo<button disabled={personaje.equipamiento[3][0] > 0} onClick={handleComprar} value='3' className={styles.b}>Comprar (3 PP)</button></p>
            <p className={styles.p}>Arma a distancia<button disabled={personaje.equipamiento[4][0] > 0} onClick={handleComprar} value='4' className={styles.b}>Comprar (3 PP)</button></p>
            <p className={styles.p}>Amuleto de la suerte: Otorga +1 a encontrar tesoros y abrir cerraduras.<button disabled={personaje.equipamiento[5][0] > 0} onClick={handleComprar} value='5' className={styles.b}>Comprar (3 PP)</button></p>
            <p className={styles.p}>Potenciador<button disabled={personaje.equipamiento[6][0] > 0} onClick={handleComprar} value='6' className={styles.b}>Comprar (4 PP)</button></p>
            <p className={styles.p}>Poción de curación<button disabled={personaje.equipamiento[7][0] + personaje.equipamiento[8][0]>= personaje.nivel} onClick={handleComprar} value='7' className={styles.b}>Comprar (1 PP)</button></p>
            <p className={styles.p}>Poción de restablecimiento<button disabled={personaje.equipamiento[7][0] + personaje.equipamiento[8][0]>= personaje.nivel} onClick={handleComprar} value='8' className={styles.b}>Comprar (1 PP)</button></p>
            <p className={styles.p}>Orbe de curación<button onClick={handleComprar} value='9' className={styles.b}>Comprar (X PP)</button></p>
            <p className={styles.p}>Arma de ninja<button disabled={personaje.equipamiento[10][0] > 0} onClick={handleComprar} value='10' className={styles.b}>Comprar (1 PP)</button></p>            
        </div>
    )
}
// ['Botas', 'Otorga +1 a VM.', 'https://i.ebayimg.com/thumbs/images/g/QsYAAOSwuU1hIKQj/s-l640.jpg', 1, 'Equipar', '', ''],
//     ['Armadura', 'Otorga +1 a RD, por armadura equipada.', 'https://mcishop.azureedge.net/mciassets/w_3_0078279_knights-torso-armor-with-gorget_550.png', 1, 'Equipar', '', ''],
//     ['Armadura pesada', 'Otorga +2 a RD, por armadura equipada.', 'https://image.lexica.art/md2/0a49a0fc-4d5d-4b5d-9da7-6ad3dd517776', 1, 'Equipar', '', ''],
//     ['Arma cuerpo a cuerpo', 'Otorga +1 al daño de ataques cuerpo a cuerpo, por arma equipada.', '', 1, 'Equipar', '', ''],
//     ['Arma a distancia', 'Otorga +1 al daño de ataques a distancia, por arma equipada.', '', 1, 'Equipar', '', ''],
//     ['Amuleto de la suerte', 'Otorga +1 a encontrar tesoros y abrir cerraduras.', 'https://www.lapastoreta.es/archivos/uploads/tumi.png?1619681788476', 1, 'Equipar', '', ''],
//     ['Potenciador', 'Las aptitudes que se pueden usar 1xpiso, ahora pueden usarse 2xpiso; pero máximo 1xturno.', 'https://ae01.alicdn.com/kf/H37b5217f0d444fd4a66f6419afafe40cP/Amuleto-potenciador-de-la-ruleta-del-Palacio-de-las-estrellas-Feng-Shui-llavero-de-la-suma.jpg', 1, 'Equipar', '', ''],
//     ['Poción de curación', 'Se usa en un turno, gastando 1d6 de acción, se descarta y cura: 5 (con 1 o 2 en 1d6), 6 (con 3 o 4 en 1d6) o 7 de daño (con 5 o 6 en 1d6).', 'https://db4sgowjqfwig.cloudfront.net/campaigns/157632/assets/775857/potion_of_healing.png?1504791538', 2, 'Usar', '', ''],
//     ['Poción de restablecimiento', 'Se usa en un turno, gastando 1d6 de acción, se descarta, elimina un efecto negativo y cura: 1 (con 1 o 2 en 1d6), 2 (con 3 o 4 en 1d6) o 3 de daño (con 5 o 6 en 1d6).', 'https://cdn.nookazon.com/150x150/diablo2resurrected/potion/full_rejuv_potion.png', 1, 'Usar', '', ''],
//     ['Orbe de curación', 'Cualquier jugador puede usar una acción (en su turno) para curarse a él o a un aliado, la cantidad que quiera (siempre que haya al menos esa cantidad en la reserva del orbe); luego resta de la reserva la cantidad usada.', 'https://i0.wp.com/www.sundarimagic.com/wp-content/uploads/2021/04/dmkrv4-35813064-cdc8-44f3-a80b-04112498785f.jpeg?fit=1024%2C1027&ssl=1', 15, 'UsarOrbe', '', ''],
//     ['Arma de ninja','Otorga +1 al daño de la aptitud del Ninja ocre.', 'https://cdn.shopify.com/s/files/1/1099/4438/files/sai_1_480x480.png?v=1660016636', 1, 'Equipar', '', '']