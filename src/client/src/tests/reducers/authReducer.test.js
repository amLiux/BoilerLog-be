import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

const initState = {
    checking:false
}

describe('pruebas en nuestro authReducer', () => {
    test('debe de realizar login y actualizar nuestro estado', () => {
        const action = {
            type: types.authLogin,
            payload:{
                uid: 'abc',
                displayName: 'Marcelo'
            }
        }

        const state = authReducer(initState, action)

        expect(state).toEqual({
            uid: 'abc',
            checking:false,
            displayName: 'Marcelo'
        })

    })

    test('debe de realizar logout y actualizar nuestro estado', () => {

        const action = {
            type: types.logout,
            payload:{}
        }

        const state = authReducer(initState, action)

        expect(state).toEqual(initState)

    })

    test('no debería de hacer cambios puesto que el action no está definido', () => {

        const action = {
            type: 'asfasgasg',
        }

        const state = authReducer(initState, action)

        expect(state).toEqual(initState)

    })
})
