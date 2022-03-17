export const availableReports = {
	APPOINTMENT_AMMOUNT: {
		name: 'Cantidad de citas',
		requiredInputs: [
			{
				name: 'from',
				value: '',
				label: 'Desde'
			},
			{
				name: 'until',
				value: '',
				label: 'Hasta',
				requiresValidation: {
					operator: 'gt',
					target: 'from'
				},
			}
		],
		type: 'bar',
	},
	NEW_PATIENTS: {
		name: 'Pacientes nuevos',
		requiredInputs: [
			{
				name: 'from',
				value: '',
				label: 'Desde',
			},
			{
				name: 'until',
				label: 'Hasta',
				value: '',
				requiresValidation: {
					operator: 'gt',
					target: 'from'
				},
			}
		],
		type: 'bar'
	},
	MONTHLY_APPOINTMENT_DETAILS: {
		name: 'Detalle de citas mensual',
		requiredInputs: [{
			label: 'Mes',
			name: 'month',
			value: ''
		}],
		type: 'pie'
	}
};