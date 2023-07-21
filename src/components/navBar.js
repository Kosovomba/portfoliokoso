import Link from 'next/link'
import styles from '../styles/navBar.module.css'

export default function NavBar() {
    return (
        <div className={styles.container}>
            <Link href="/" style={{fontSize:25, fontWeight: 600}}>Inicio</Link>
            {/* <a href="/">Inicio</a> */}
            <button style={{width:'fit-content', margin: 10, padding: 8, fontSize:20}}>Iniciar sesión</button>
        </div>
    )
}