export default function conjuroExtra({personaje, setPersonaje, raza, clase, conjurosIniciales}) {        
    let conjurosFiltradosPorRaza = conjurosIniciales.filter((c) => 
    (c.requisitos ==='' || c.requisitos.slice(10) === raza.toLowerCase()))    
    clase === 'Mago' && personaje.apt1[2].length === 2? conjurosFiltradosPorRaza = conjurosFiltradosPorRaza.filter((c) => 
    (`${c.nombre}${c.aptitud}` !== personaje.apt1[2][0] && `${c.nombre}${c.aptitud}` !== personaje.apt1[2][1])):null        
    clase === 'Bárbaro'? conjurosFiltradosPorRaza = conjurosFiltradosPorRaza.filter((c) => 
    (c.nombre !== 'Armadura mágica: ')):null
    clase === 'Pícaro'? conjurosFiltradosPorRaza = conjurosFiltradosPorRaza.filter((c) => 
    (!['Ralentizar: ', 'Armadura mágica: '].includes(c.nombre))):null

    function handleButton(e) {
        e.preventDefault()
        let CDP = personaje.CDP
        CDP.extra = e.target.value
        setPersonaje({...personaje, CDP: CDP})
    }
    function handleButton2(e) {
        e.preventDefault()
        let aux = personaje['apt2+']
        let ind = personaje['apt2+'].map(a => a.nombre).indexOf('Lanzador experimentado: ')
        aux[ind].extra = e.target.value
        setPersonaje({...personaje, 'apt2+': aux})
    }
    function handleEdit(e) {
        e.preventDefault()
        let CDP = personaje.CDP
        CDP.extra = ''
        setPersonaje({...personaje, CDP: CDP})
    }
    function handleEdit2(e) {
        e.preventDefault()
        let aux = personaje['apt2+']
        let ind = personaje['apt2+'].map(a => a.nombre).indexOf('Lanzador experimentado: ')
        aux[ind].extra = ''
        setPersonaje({...personaje, 'apt2+': aux})
    }

    return (
        <div>
            <div style={{border:'dotted brown 2px', padding: '5px'}}>
            <p style={{fontWeight: 600}}>Conjuro seleccionado:</p>            
            {(personaje.CDP.extra && personaje.CDP.extra.length >0) || (personaje['apt2+'].map(a => a.nombre).includes('Lanzador experimentado: ') && personaje['apt2+'][personaje['apt2+'].map(a => a.nombre).indexOf('Lanzador experimentado: ')].extra.length>0)? <div><p style={{maxWidth: '100%'}} key={clase==='Mago'?personaje['apt2+'][personaje['apt2+'].map(a => a.nombre).indexOf('Lanzador experimentado: ')].extra:personaje.CDP.extra}>{clase==='Mago'?personaje['apt2+'][personaje['apt2+'].map(a => a.nombre).indexOf('Lanzador experimentado: ')].extra:personaje.CDP.extra}</p> <button onClick={clase!=='Mago'?handleEdit:handleEdit2} value={'edit'} disabled={personaje.nivel===1}>Editar</button></div>: <div style={{display: 'flex', flexDirection: 'column'}}><p>Haz clic en un conjuro para elegirlo:</p>
            {conjurosFiltradosPorRaza.map((c)=> <button style={{width:'fit-content', maxWidth: '100%', textAlign:'left'}} onClick={clase!=='Mago'?handleButton:handleButton2} key={`${c.nombre}${c.aptitud}`} value={`${c.nombre}${c.aptitud}`}>{`${c.nombre}${c.aptitud}`}</button>)}</div>}
            </div>
            {/* {personaje.CDP.extra === ''? <div style={{display: 'flex', flexDirection: 'column'}}><p>Haz clic en un conjuro para elegirlo:</p>
            {conjurosFiltradosPorRaza.map((c)=> <button style={{width:'fit-content', maxWidth: '100%', textAlign:'left'}} onClick={handleButton} key={`${c.nombre}${c.aptitud}`} value={`${c.nombre}${c.aptitud}`}>{`${c.nombre}${c.aptitud}`}</button>)}</div>:null}                         */}
        </div>
    )
}