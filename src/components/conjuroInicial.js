export default function conjuroInicial({personaje, setPersonaje, raza, clase, conjurosIniciales}) {    
    let conjurosInicialesFiltrados = conjurosIniciales.filter((c) => 
    (c.requisitos ==='' || c.requisitos.slice(10) === raza.toLowerCase()))
    clase === 'Mago' && personaje.apt1[2].length === 1? conjurosInicialesFiltrados = conjurosInicialesFiltrados.filter((c) => 
    (c.aptitud !== personaje.apt1[2][0])):null
    let apt1Conjuros = personaje.apt1
    let arrConjuros = apt1Conjuros[2]
    function handleButton(e) {
        e.preventDefault()
        conjurosInicialesFiltrados = conjurosInicialesFiltrados.filter((c)=> c.aptitud !== e.target.value)
        console.log(conjurosInicialesFiltrados)
        arrConjuros.push(e.target.value)
        console.log(arrConjuros)
        apt1Conjuros[2] = arrConjuros
        console.log(apt1Conjuros)
        setPersonaje({...personaje, apt1: apt1Conjuros})
    }

    return (
        <div>
            {console.log(personaje.apt1[2])}
            {/* {personaje.apt1[2].length === 2? <div><p>{personaje.apt1[2][0]}</p><p>{personaje.apt1[2][1]}</p></div>:null} */}
            {personaje.apt1[2].length > 0? personaje.apt1[2].map((c) => <p key={c}>{c}</p>): <p></p>}
            {personaje.apt1[2].length + (clase === 'Mago'?0:1) < 2? <div><p>Haz clic en un conjuro para elegirlo:</p>
            {conjurosInicialesFiltrados.map((c)=> <button onClick={handleButton} key={c.aptitud} value={c.aptitud}>{c.aptitud}</button>)}</div>:null}
            {console.log(personaje.apt1[2])}
        </div>
    )
}