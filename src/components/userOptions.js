import { useRouter } from "next/router"

export default function UserOptions() {
const router = useRouter()
    function cerrarClick(e) {
        e.preventDefault()
        localStorage.removeItem('usuario')
        alert('Cerraste sesión')
        router.reload()
    }

    return <div>
        <p>Cargar personaje</p>
        <button onClick={cerrarClick}>Cerrar sesión</button>
    </div>
}