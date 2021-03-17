let nav = 0

let check = document.currentScript.getAttribute('events')

let {citas} = JSON.parse(document.currentScript.getAttribute('events'))


const calendario = document.getElementById('calendar')
const semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

const capitalizar = word => word.charAt(0).toUpperCase() + word.slice(1)

const rellenarCalendario = () => {

    const fecha = new Date()

    if(nav !== 0){
        fecha.setMonth(new Date().getMonth() + nav)
    }

    const 
        dia = fecha.getDate(),
        mes = fecha.getMonth(),
        anho = fecha.getFullYear()

    const primerDiaDelMes = new Date(anho, mes, 1)
    const diasEnMes = new Date(anho, mes + 1, 0).getDate()
    const dateString = primerDiaDelMes.toLocaleDateString('es-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    })

    const nombreDelPrimerDia = capitalizar(dateString.split(', ')[0])
    const diasComodinInicio = semana.indexOf(nombreDelPrimerDia)

    document.getElementById('monthDisplay').innerText = `${capitalizar(fecha.toLocaleDateString('es', {month:'long'}))} ${anho}`

    calendario.innerHTML = '';

    for(let i = 1; i <= diasComodinInicio + diasEnMes; i++){
        const cuadroDia = document.createElement('div')
        cuadroDia.classList.add('day')
        const diaActual =  `${mes+1}/${i - diasComodinInicio}/${anho}`
        if(i > diasComodinInicio){
            cuadroDia.innerText = i - diasComodinInicio;
            //TODO revisar esto
            diaActual.split('/')[1] === dia.toString() && cuadroDia.classList.add('currentDay')
            citas.map(cita => {
                if (new Date(cita.fechaDeseada).toDateString() === new Date(diaActual).toDateString()){
                    const citaDiv = document.createElement('div')
                    citaDiv.classList.add('event')
                    citaDiv.id = cita._id
                    citaDiv.innerText = `${cita.nombre} ${cita.apellido} - 4:00 PM`
                    cuadroDia.appendChild(citaDiv)
                    //TODO diseñar modales
                }
            })
        }else{
            cuadroDia.classList.add('padding')
        }
        calendario.appendChild(cuadroDia)
    }

}

const inicializarBotones = () => {
    document.getElementById('btnSiguiente').addEventListener('click', ()=>{
        nav++
        rellenarCalendario()
    })
    document.getElementById('btnAnterior').addEventListener('click', ()=>{
        nav--
        rellenarCalendario()
    })
}

inicializarBotones()

rellenarCalendario()