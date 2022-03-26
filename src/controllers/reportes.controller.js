const { response } = require('express');
const Citas = require('../models/CitasModel');
const Pacientes = require('../models/PacientesModel');

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const estados = ['Completada', 'Agendada', 'Cancelada', 'Pendiente'];

const dateRange = (startDate, endDate) => {
    const start = startDate.split('-');
    const end = endDate.split('-');
    const startYear = parseInt(start[0]);
    const endYear = parseInt(end[0]);
    const dates = [];

    for (let i = startYear; i <= endYear; i++) {
        const endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
        const startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
        for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
            const month = j + 1;
            const displayMonth = month < 10 ? '0' + month : month;
            dates.push([i, displayMonth, '01'].join('-'));
        }
    }
    return dates;
}


const generateReportCitasTotales = async (desde, hasta, res) => {
    const monthsToQuery = dateRange(desde, hasta)
    const parsedMonths = monthsToQuery.map(date => new Date(date))
    const lastMonth = parsedMonths[parsedMonths.length - 1]

    let responseArray = []


    const citasCounts =
        await Citas.aggregate([
            { $match: { fechaDeseada: { $gte: parsedMonths[0], $lt: new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 2, 0) } } },
            { $group: { _id: { month: { "$month": "$fechaDeseada" } }, count: { $sum: 1 } } }
        ])


    parsedMonths.forEach(dayBefore => {
        const day = new Date(dayBefore)

        const nextDay = new Date(day)
        nextDay.setDate(day.getDate() + 1)
        const found = citasCounts.find(({ _id: { month } }) => month === nextDay.getMonth() + 1)

        found
            ? responseArray.push({ 
                label: meses[nextDay.getMonth()], 
                data: found.count 
            })
            : responseArray.push({ 
                label: meses[nextDay.getMonth()], 
                data: 0 
            })

    })

    return res.status(201).json({
        data: responseArray
    })
}

const generateReportPacientesNuevos = async (desde, hasta, res) => {
    const monthsToQuery = dateRange(desde, hasta);
    const parsedMonths = monthsToQuery.map(date => new Date(date));
    const lastMonth = parsedMonths[parsedMonths.length - 1];

    let responseArray = [];


    const pacientesCounts =
        await Pacientes.aggregate([
            { 
                $match: { 
                    fechaCreado: { 
                        $gte: parsedMonths[0], 
                        $lt: new Date(
                            lastMonth.getFullYear(), 
                            lastMonth.getMonth() + 2, 
                            0
                        ) 
                    } 
                } 
            },
            { 
                $group: { 
                    _id: { 
                        month: { "$month": "$fechaCreado" } 
                    }, 
                    count: { 
                        $sum: 1 
                    } 
                } 
            }
        ]);

    parsedMonths.forEach(dayBefore => {
        const day = new Date(dayBefore)

        const nextDay = new Date(day)
        nextDay.setDate(day.getDate() + 1)
        const found = pacientesCounts.find(({ _id: { month } }) => month === nextDay.getMonth() + 1)

        found
            ? responseArray.push({ label: meses[nextDay.getMonth()], data: found.count })
            : responseArray.push({ label: meses[nextDay.getMonth()], data: 0 })

    });

    return res.status(201).json({
        data: responseArray
    })
}

const generateDetalleCitasMensual = async (mes, res) => {

    const firstDayOfMonthToQuery = new Date(mes);
    const lastDayOfMonthToQuery = new Date(
        firstDayOfMonthToQuery.getFullYear(), 
        firstDayOfMonthToQuery.getMonth() + 1, 
        0
    );

    let responseArray = [];


    const citasCounts =
        await Citas.aggregate([
            { 
                $match: { 
                    fechaDeseada: { 
                        $gte: firstDayOfMonthToQuery, 
                        $lt: lastDayOfMonthToQuery 
                    } 
                } 
            },
            {
                $group: {
                    _id: "$estado",
                    count: { $sum: 1 }
                }
            }
        ]);


    estados.forEach(estado => {
        const found = citasCounts.find(({ _id }) => _id === estado.toUpperCase())

        found
            ? responseArray.push({ label: estado, data: found.count })
            : responseArray.push({ label: estado, data: 0 })

    });

    return res.status(201).json({
        data: responseArray
    });
}

const generarReportes = async (req, res = response) => {
    const { payload } = req.body;
    const { from, until, month } = payload;

    const reporte = req.params.reporte;

    switch (reporte) {
        case 'Cantidad de citas': {
            await generateReportCitasTotales(from, until, res);
            break;
        }
        case 'Pacientes nuevos': {
            await generateReportPacientesNuevos(from, until, res);
            break;
        }
        case 'Detalle de citas mensual': {
            await generateDetalleCitasMensual(month, res);
            break;
        }
        default: {
            return res.status(404).json({ ok: false, msg: 'El reporte no se encontro' })
        }
    }
}


module.exports = {
    generarReportes
}