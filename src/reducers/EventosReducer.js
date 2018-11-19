const INITIAL_STATE = {
    inicio: '',
    carregando: false,
    eventoSelecionado: {},
    data: [],
    originalData: [],
    comentarios: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CARREGANDO':
            return {...state, carregando: action.payload}
        case 'SET_EVENTOS':
            return {...state, data: action.payload, originalData: action.payload}
        case 'SET_EVENTOS_FILTRADO':
            return {...state, data: action.payload}
        case 'SET_EVENTO_SELECIONADO':
            return {...state, eventoSelecionado: action.payload}
        case 'SET_COMENTARIOS':
            return {...state, comentarios: action.payload}
        default:
            return (state);
    }
};
