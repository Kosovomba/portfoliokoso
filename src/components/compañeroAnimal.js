import { useState } from "react"

export default function CompañeroAnimal({PV, VM, RD, daño, bonos, regen, teleport, vinculo}) {
    const [PVdaño, setPVdaño] = useState(0)
    const [PVChange, setPVChange] = useState(1)

    function onPVChange(e) {
        e.preventDefault()
        setPVChange(e.target.value)
    }
    function handlePV(e) {
        e.preventDefault()
        let total = e.target.value === 'Sumar'?PVdaño + Math.floor(PVChange):PVdaño - PVChange
        total > 0?total=0:total<0-PV?total=0-PV:null
        setPVdaño(total)
        setPVChange(1)
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column', margin: 0}}>
            <div>
                <span>{`PV: ${PV + PVdaño}/${PV}.`}</span>
                <button value='Restar' onClick={handlePV}>Restar</button>
                <input style={{width:'35px', height:'22px'}} type="number" min={1} onChange={onPVChange} value={PVChange}></input>
                <button value='Sumar' onClick={handlePV}>Sumar</button>
            </div>
            <span>{`VM: ${VM}.`}</span>
            <span>{`RD: ${RD}.`}</span>
            <span>{`Daño: 1d6${daño !== 0?' + 1':''}.`}</span>
            {teleport?'*Se mueve hasta 3 casillas por turno sin gastar acción. Opcionalmente, una vez por turno antes de actuar, puede teletransportarse a una casilla adyacente al druida (sólo si hay alguna disponible).':'*Se mueve hasta 3 casillas por turno sin gastar acción.'}
            {vinculo && bonos.espinas?<span>*Conjuro Espinas activo.</span>:null}
            {vinculo && bonos.regen?<span>*Conjuro Regeneración activo. Regenera {regen} al final de cada turno.</span>:null}
            {bonos.animalVM?<span>*Conjuro Aptitud animal (VM) activo. Bono de VM y daño ya incluido.</span>:null}
            {bonos.animalRD?<span>*Conjuro Aptitud animal (RD) activo. Bono de RD ya incluido.</span>:null}
        </div>
    )
}