import { removeDiaActivo, setDiaActivo, setModalActivo, setModalInactivo, setToastActivo, setToastInactivo } from "../../actions/ui"
import { types } from "../../types/types"

describe('Pruebas en nuestras acciones sincronas de ui', ()=>{
    
    test('setModalActivo debe de ser tipo uiOpenModal para abrir nuestro <Modal/>', ()=>{
        const action = setModalActivo()
        expect(action).toEqual({type: types.uiOpenModal})
    })

    test('setModalInactivo debe de ser tipo uiCloseModal para cerrar nuestro <Modal/>', ()=>{
        const action = setModalInactivo()
        expect(action).toEqual({type: types.uiCloseModal})
    })

    test('setToastActivo debe de ser tipo uiShowToast y tener un mensaje para abrir nuestro <Toast/>', ()=>{
        const testError = 'Soy un error'

        const action = setToastActivo(testError)
        expect(action).toEqual({
            type: types.uiShowToast,
            payload: {error: testError}
        })
    })

    test('setToastInactivo debe de ser tipo uiRemoveToast para cerrar nuestro <Toast/>', ()=>{
        const action = setToastInactivo()
        expect(action).toEqual({type: types.uiRemoveToast})
    })

    test('setDiaActivo debe de ser tipo uiSetDiaActivo y implementar el objeto dia en el state', () => {
        const testPayload = {
            fecha: '23 de marzo',
            eventos: [{}, {}],
            esHoy: false
        }

        const action = setDiaActivo(testPayload)

        expect(action).toEqual({
            type: types.uiSetDiaActivo,
            payload: testPayload 
        })
    })

    test('removeDiaActivo debe de ser tipo uiRemoveDiaActivo y remover el objeto dia en el state', () =>{
        const action = removeDiaActivo()
        expect(action).toEqual({type: types.uiRemoveDiaActivo})
    })

})