import React, { useEffect, useState } from 'react'
import {Pie} from 'react-chartjs-2'
import { fetchPostReporte } from '../../../services/fetch'


export const PieChart = ({reporte, mes}) => {

    const [data, setData] = useState([])

    useEffect(()=>{
        async function fetchReport() {
            const token = localStorage.getItem('token')
            const response = await fetchPostReporte(reporte, {mes}, token)
            const parsedResponse = await response.json()
            setData(parsedResponse.data)
          }
          fetchReport();
    }, [reporte, mes])

    console.log(data)

    return (
        <div style={{margin: 'auto'}}>
            <Pie 
                id="report"
                data={{
                    labels: data.map(({estado}) => estado),
                    datasets: [{
                        label: `${reporte}`,
                        data: data.map(({conteo}) => conteo),
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
                        borderWidth: 1,
                    }]
                }}

                height={600}
                width={1200}
                options={{
                    maintainAspectRatio: true
                }}
            />
        </div>
    )
}
