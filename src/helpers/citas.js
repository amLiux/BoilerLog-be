const generadorDeRangos = (start, end, length = end - start + 1) => {
    return Array.from({ length }, (_, i) => start + i)
};

const checkHorariosDisponibles = (citas, todos = false) => {
    const todosHorarios = todos ? 11 : 3
    let horariosTomados = [];
    citas.forEach(cita => horariosTomados.push(cita.fechaDeseada.getHours()));
    const citasAgendadas = horariosTomados.filter(horario => horario !== 0)

    if (citasAgendadas.length === 0)
        return [...generadorDeRangos(7, 17)
            .sort(() => Math.random() - Math.random())
            .slice(0, todosHorarios)]
    else
        return [...generadorDeRangos(7, 17)]
            .filter(horario => !citasAgendadas.includes(horario))
            .sort(() => Math.random() - Math.random()).slice(0, todosHorarios)

};
   


module.exports = {
    generadorDeRangos,
    checkHorariosDisponibles
};