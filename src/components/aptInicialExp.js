export default function AptInicialExp({personaje, setPersonaje}) {    
    let aptAux = personaje.apt1
    let apti1 = 'Combate con dos armas: 1xturno, cuando usa 1d6 de acción para atacar, lanza otro d6 extra de ataque. El explorador puede comprar una segunda arma para obtener daño por arma para su ataque extra (el arma extra sólo sumará daño a ataques extra de combate con dos armas).'
    let apti2 = 'Arquería: Sus ataques pueden ser de rango 6 casillas.'
    function onClick(e) {
        e.preventDefault()
        aptAux[2] = [e.target.value]
        setPersonaje({...personaje, apt1: aptAux})
    }
    return (
        <div>
            {personaje.apt1[2].length === 0? <div style={{display: 'flex', flexDirection: 'column'}}>
                <p>Elige una aptitud inicial</p>
                <button style={{maxWidth: '400px'}} value={apti1} onClick={onClick}>{apti1}</button>
                <button style={{maxWidth: '400px'}} value={apti2} onClick={onClick}>{apti2}</button>
                </div>: <p style={{maxWidth: '400px'}}>{personaje.apt1[2][0]}</p>}
        </div>
    )
}