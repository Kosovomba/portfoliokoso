export default function conjuroInicial({personaje, setPersonaje, raza, clase, conjurosIniciales, bonos, setBonos}) {    
    let conjurosInicialesFiltrados = conjurosIniciales.filter((c) => 
    (c.requisitos ==='' || c.requisitos.slice(10) === raza.toLowerCase()))
    clase === 'Mago' && personaje.apt1[2].length === 1? conjurosInicialesFiltrados = conjurosInicialesFiltrados.filter((c) => 
    (`${c.nombre}${c.aptitud}` !== personaje.apt1[2][0])):null
    let apt1Conjuros = personaje.apt1
    let arrConjuros = apt1Conjuros[2]
    function handleButton(e) {
        e.preventDefault()
        conjurosInicialesFiltrados = conjurosInicialesFiltrados.filter((c)=> `${c.nombre}${c.aptitud}` !== e.target.value)        
        arrConjuros.push(e.target.value)
        apt1Conjuros[2] = arrConjuros
        setPersonaje({...personaje, apt1: apt1Conjuros})
    }
    function handleEdit(e) {
        e.preventDefault()
        apt1Conjuros[2] = []        
        setPersonaje({...personaje, apt1: apt1Conjuros})
        let setBo = {}
        Object.keys(bonos).forEach(b=>setBo[b] = false)
        setBonos(setBo)
    }

    return (
        <div>
            <div style={{border:'dotted brown 2px', padding: '5px'}}>
            <p style={{fontWeight: 600}}>{clase === 'Mago'? 'Conjuros iniciales aprendidos:': 'Conjuro inicial aprendido:'}</p>            
            {personaje.apt1[2].length > 0? <div>{personaje.apt1[2].map((c) => <p style={{maxWidth: '100%'}} key={c}>{c}</p>)} <button onClick={handleEdit} value={'edit'} disabled={personaje.nivel>1}>Editar</button></div>: <p></p>}
            </div>
            {personaje.apt1[2].length + (clase === 'Mago'?0:1) < 2? <div style={{display: 'flex', flexDirection: 'column'}}><p>Haz clic en un conjuro para elegirlo:</p>
            {conjurosInicialesFiltrados.map((c)=> <button style={{width:'fit-content', maxWidth: '100%', textAlign:'left'}} onClick={handleButton} key={`${c.nombre}${c.aptitud}`} value={`${c.nombre}${c.aptitud}`}>{`${c.nombre}${c.aptitud}`}</button>)}</div>:null}            
            {console.log(personaje.apt1[2])}
        </div>
    )
}