import { types } from "../../types/types"

describe('Probando nuestros tipos', () => 
    test('debe de tener estos tipos', () => 
        expect(types).toEqual({
            uiOpenModal: '[UI] Open modal',
            uiCloseModal: '[UI] Close modal',
        
            uiShowToast: '[UI] Open toast',
            uiRemoveToast: '[UI] Close toast',
        
            uiSetDiaActivo: '[UI] Set clicked day',
            uiRemoveDiaActivo: '[UI] Remove current day',
        
            citasSetCitaActiva: '[Citas] Set active cita',
            citasRemoveCitaActiva: '[Citas] Remove active cita',
            citasUpdateCitaActiva: '[Citas] Update active cita',
        
            citasSetCitas: '[Citas] Set all citas',
            citasActualizarCitas: '[Citas] Set updated citas',
            citasLimpiarCitas : '[Citas] Remove citas',
            
            authCheckingFinished: '[Auth] Finished checking JWT state',
            authLogin: '[Auth] Login',
            logout: '[Auth] Logout',
        })
    )
)