import React, { useEffect, useRef, useState } from 'react'
import { saveAs } from 'file-saver'; 
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { BarChart } from '../ui/reports/BarChart'
import { PieChart } from '../ui/reports/PieChart'
import { SelectReport } from '../ui/reports/SelectReport'

export const ReportsScreen = () => {

    const [reporte, setReporte] = useState('')
    const [desde, setDesde] = useState('')
    const [hasta, setHasta] = useState('')
    const [mes, setMes] = useState('')

    const handleReportDownload = async () => {
        let canvasReport = document.getElementById("report")
        canvasReport.toBlob((blob) => saveAs(blob, 'testing.jpeg'), 'image/jpeg', 1)
    }
 

    const handleMonthInput = ({target}) => {
        const [year, month] = target.value.split('-')

        const dateToSet = new Date(year,  month - 1)
        target.name === 'desde' 
            ? setDesde(dateToSet) 
            : (dateToSet) > desde && setHasta(dateToSet)

            target.name === 'mes' && setMes(dateToSet)
    }

    const activeReporte = useRef(reporte)

    useEffect(()=> {
        if(activeReporte?.current !== reporte){
            activeReporte.current = reporte
            setDesde('')
            setHasta('')
            setMes('')
        }
    }, [reporte])

    return (
        <div className="main-container">
            <div className="mt-5" style={{display: 'flex', alignItems: 'center'}}>    
                <div style={{marginLeft: '4rem', flex: '0 0 30%'}}>
                    <SelectReport handleState={setReporte} />
                </div>
                {
                    reporte && reporte !== 'Detalle de citas mensual' 
                        ?
                            <>
                                <form style={{display:'flex', flex: '0 0 40%', justifyContent:'space-between', marginRight: '1rem'}}>
                                    <div style={{marginRight: '2rem'}}>
                                        <label style={{fontWeight: '500'}} htmlFor="start">Desde:</label>
                                        <Input name="desde" handleInputChange={handleMonthInput} errors={{}} type="month" placeholder="El mes" />
                                    </div>
                                    {
                                        desde &&
                                            <div>
                                                <label style={{fontWeight: '500'}} htmlFor="start">Hasta:</label>
                                                <Input name="hasta" handleInputChange={handleMonthInput} errors={{}} type="month" />
                                            </div>
                                    }
                                </form>
                                {
                                    desde && hasta &&
                                        <div style={{marginRight: 'auto', marginLeft: '4rem', flex: '0 0 30%'}}>
                                            <Button clickable={true} onClick={() => handleReportDownload()} text="Descargar reporte" group={true}/>
                                        </div>
                                }

                            </>
                        : reporte && 
                            <>
                                <form style={{display:'flex', flex: '0 0 40%', justifyContent:'center', marginRight: '1rem'}}>
                                    <div style={{width: '70%'}}>
                                        <label style={{fontWeight: '500'}} htmlFor="start">Mes:</label>
                                        <Input name="mes" handleInputChange={handleMonthInput} errors={{}} type="month" placeholder="El mes" />
                                    </div>
                                </form>
                                {
                                    mes &&
                                        <div style={{marginRight: 'auto', marginLeft: '4rem', flex: '0 0 30%'}}>
                                            <Button clickable={true} onClick={() => handleReportDownload()} text="Descargar reporte" group={true}/>
                                        </div>
                                }

                            </>
                }

            </div>
            {
                ((reporte && hasta) || (reporte && mes)) &&
                    <div className={`${reporte === 'Detalle de citas mensual' && 'mt-5'}`} style={{display: 'flex' }}>
                        {
                            reporte === 'Cantidad de citas' || reporte === 'Pacientes nuevos'
                                ? <BarChart desde={desde} hasta={hasta} reporte={reporte}/>
                                : reporte === 'Detalle de citas mensual' 
                                    &&
                                        <PieChart mes={mes} reporte={reporte} />
                                    

                        }
                    </div>
            }

        </div>
    )
}
