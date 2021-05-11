import { useEffect, useState } from 'react'

export const usePagination = ( totalPacientes, pacientesPorPagina ) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)
    const indexUltimoPaciente = currentPage * pacientesPorPagina
    const indexPrimerPaciente = indexUltimoPaciente - pacientesPorPagina
    const currentPacientes = totalPacientes.length > 8 || pacientesPorPagina === 1 
        ? totalPacientes.slice(indexPrimerPaciente, indexUltimoPaciente)
        : totalPacientes.slice(0, 8)
    


    useEffect(()=>{
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(totalPacientes.length/pacientesPorPagina); i++) {
            pageNumbers.push(i)
            setMaxPage(pageNumbers.pop())
        }
    }, [totalPacientes, pacientesPorPagina, setMaxPage])

    const handleChangePage = (type) => {
        switch (type) {
            case "back":
                if(currentPage > 1)
                    setCurrentPage(currentPage-1)
                break;
            case "next":
                if (currentPage < maxPage)
                    setCurrentPage(currentPage+1)
                break;
            default:
                return;
        }
    }


    return [currentPacientes, currentPage, handleChangePage, maxPage]

}