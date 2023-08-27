import Image from "next/image"
export default function Objeto({nombre, descripcion, imagen, cantidad, opcion, estado, nota}) {
    let handles = {
        Usar: function(e) {
            e.preventDefault()
            console.log(e.target.value)
        },
        Dar: function(e) {
            e.preventDefault()
            console.log(e.target.value)
        },
        Equipar: function(e) {
            e.preventDefault()
            console.log(e.target.value)
        },
        Eliminar: function(e) {
            e.preventDefault()
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
                <button style={{width:'fit-content', position:'absolute', left:opcion==='Equipar'?'145px':'163px', top:'167px'}} value={opcion} onClick={handles[opcion]}>{opcion==='UsarOrbe'?'Usar':opcion}</button>
            </div>
        </div>
    )
}