import Image from "next/image"
export default function Objeto({nombre, descripcion, imagen, opcion, cantidad, estado, nota, item, personaje, setPersonaje, PVTotal, setPVTotal}) {
    let handles = {
        Usar: function(e) {
            e.preventDefault()
            let cura = Math.floor(Math.random()*3) + 1
            if (personaje.raza === 'Humano' && personaje.nivel >=3 && cura === 1) cura = 2
            if (personaje['apt2+'].filter(a => a.nombre === 'Alquimia potenciada: ').length > 0) cura = cura + 1
            let cura2 = cura + (nombre === 'Poción de curación'?4:0)
            nombre === 'Poción de curación'? cura = (cura + 4)+' PV.':cura = cura + ' PV y eliminaste un efecto negativo.'
            let equipamiento = personaje.equipamiento
            equipamiento[e.target.value][0] = equipamiento[e.target.value][0] - 1
            let total = PVTotal + cura2
            total > 0?total=0:total<0-personaje.PV?total=0-personaje.PV:null
            setPersonaje({...personaje, equipamiento: equipamiento})
            setPVTotal(total)
            alert(`Te curaste ${cura}${personaje['apt2+'].filter(a => a.nombre === 'Alquimia potenciada: ').length > 0?' Bono de alquimia potenciada incluido.':''}`)
        },
        Dar: function(e) {
            e.preventDefault()
            console.log(e.target.value)
        },
        Equipar: function(e) {
            e.preventDefault()
            let equipamiento = personaje.equipamiento
            equipamiento[e.target.value][0] === 1? equipamiento[e.target.value][1] = 'Equipado':equipamiento[e.target.value][1] = 'Equipado x2'            
            setPersonaje({...personaje, equipamiento: equipamiento})
            alert(`Equipaste ${nombre}`)
            console.log(e.target.value)
        },
        Eliminar: function(e) {
            e.preventDefault()
            let equipamiento = personaje.equipamiento
            let eq = equipamiento[item][0]
            equipamiento[item] = [eq-1, '', '']
            setPersonaje({...personaje, equipamiento: equipamiento})
            alert(`Eliminaste ${nombre}`)
            console.log(e.target.value)
        },
        UsarOrbe: function(e) {
            e.preventDefault()
            console.log(e.target.value)
        }
    }

    return (
        <div style={{display:'flex', flexDirection:'row', width: '351px', height:'205px', minHeight:'fit-content', border:'ridge #754421 8px', padding:'4px 0px 10px 4px', backgroundColor:'rgba(87,32,21,0.3)'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
                <h3 style={{position:'relative', top: '130px', left: cantidad>9?'101px':'111px', margin:'0px', width:'fit-content', background:'rgba(255,255,255,0.4)', zIndex:'1', color:'#001AD3', borderRadius:'30%'}}>x{cantidad}</h3>
                <Image style={{border: 'solid black 2px', backgroundColor:'gray'}} height='130' width="130" src={imagen} alt={nombre}/>
                <div style={{display:'flex', margin:'3px', justifyContent:'space-around'}}>                                        
                    <button value={'Dar'} onClick={handles['Dar']}>Dar</button>
                    <button value={'Eliminar'} onClick={handles['Eliminar']}>Eliminar</button>
                </div>
            </div>
            <div style={{display:'flex', flexDirection:'column', marginLeft: '5px', position:'relative', top:'25px'}}>
                <h3 style={{margin:'0px'}}>{nombre}:</h3>
                <h4 style={{margin:'7px 0px 7px 0px'}}>{descripcion}</h4>
                {estado==='Equipado' || estado==='Equipado x2'?<h3 style={{color:'#CB0909'}}>{'('+estado+')'}</h3>:null}
                <button disabled={estado==='Equipado x2' || (personaje.equipamiento[item][0] === 1 && estado==='Equipado')}style={{width:'fit-content', position:'absolute', left:opcion==='Equipar'?'145px':'163px', top:'167px'}} value={item} onClick={handles[opcion]}>{opcion==='UsarOrbe'?'Usar':opcion}</button>
            </div>
        </div>
    )
}