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
            <div style={{border:'dotted brown 2px', padding: '5px'}}>
            <p style={{fontWeight: 600}}>{clase === 'Mago'? 'Conjuros iniciales aprendidos:': 'Conjuro inicial aprendido:'}</p>            
            {personaje.apt1[2].length > 0? personaje.apt1[2].map((c) => <p style={{maxWidth: '400px'}} key={c}>{c}</p>): <p></p>}
            </div>
            {personaje.apt1[2].length + (clase === 'Mago'?0:1) < 2? <div style={{display: 'flex', flexDirection: 'column'}}><p>Haz clic en un conjuro para elegirlo:</p>
            {conjurosInicialesFiltrados.map((c)=> <button style={{maxWidth: '400px'}} onClick={handleButton} key={c.aptitud} value={c.aptitud}>{c.aptitud}</button>)}</div>:null}
            {console.log(personaje.apt1[2])}
        </div>
    )
}