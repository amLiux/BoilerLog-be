import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2'
import { fetchPostReporte } from '../../../services/fetch'


export const BarChart = ({reporte, desde, hasta}) => {

    const [data, setData] = useState([])

    useEffect(()=>{
        async function fetchReport() {
            const token = localStorage.getItem('token')
            const response = await fetchPostReporte(reporte, {desde, hasta}, token)
            const parsedResponse = await response.json()
            setData(parsedResponse.data)
          }
          fetchReport();
    }, [reporte, desde, hasta])

    console.log(data)

    return (
        <div style={{margin: 'auto'}}>
            <Bar
                id="report" 
                data={{
                    labels: data.map(({mes}) => mes),
                    datasets: [{
                        label: `${reporte}`,
                        data: reporte === 'Cantidad de citas' ? data.map(({citas}) => citas) :  data.map(({pacientes}) => pacientes),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }}

                height={630}
                width={1200}
                options={{
                    maintainAspectRatio: true
                }}
            />
        </div>
    )
}
