import { useEffect, useState } from 'react';

export const usePagination = (totalPatients, pacientesPorPagina) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [maxPage, setMaxPage] = useState(0);
	const indexUltimoPaciente = currentPage * pacientesPorPagina;
	const indexPrimerPaciente = indexUltimoPaciente - pacientesPorPagina;
	const currentPacientes = 
		totalPatients.length > 8 || pacientesPorPagina === 1
			? totalPatients.slice(indexPrimerPaciente, indexUltimoPaciente)
			: totalPatients.slice(0, 8);



	useEffect(() => {
		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(totalPatients.length / pacientesPorPagina); i++) {
			pageNumbers.push(i);
			setMaxPage(pageNumbers.pop());
		}
	}, [totalPatients, pacientesPorPagina, setMaxPage]);

	const handleChangePage = (type) => {
		switch (type) {
			case 'back':
				if (currentPage > 1)
					setCurrentPage(currentPage - 1);
				break;
			case 'next':
				if (currentPage < maxPage)
					setCurrentPage(currentPage + 1);
				break;
			default:
				return;
		}
	};


	return [currentPacientes, currentPage, handleChangePage, maxPage];

};