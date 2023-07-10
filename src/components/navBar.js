import styles from '../styles/navBar.module.css'

export default function NavBar() {
    return (
        <div className={styles.container}>
            <a href="/">Inicio</a>
            <button style={{width:'fit-content', margin: 10, padding: 10}}>Iniciar sesión</button>
        </div>
    )
}