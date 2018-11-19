import { NetInfo, Platform, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import constantes from '../helpers/consts'

import moment from 'moment'

import { gravarObjeto, recuperarObjeto } from '../helpers/storage'
const baseUrl = constantes.baseUrl

export const setPesquisar = (value) =>
    (dispatch, getState) => {
        const state = getState()
        var eventos = state.EventosReducer.originalData
        var newArray = eventos.filter((el) => {
            return el.room.toLowerCase().includes(value.toLowerCase()) ||
                el.speaker.toLowerCase().includes(value.toLowerCase()) ||
                el.schedule.toLowerCase().includes(value.toLowerCase()) ||
                el.subject.toLowerCase().includes(value.toLowerCase()) ||
                el.name.toLowerCase().includes(value.toLowerCase())
        })
        dispatch({ type: 'SET_EVENTOS_FILTRADO', payload: newArray })
    }

export const setCarregando = (value) =>
    (dispatch, getState) => {
        dispatch({ type: 'SET_CARREGANDO', payload: value })
    }

export const setInternetConnection = (value) =>
    (dispatch, getState) => {
        dispatch({ type: 'SET_INTERNET', payload: value })
    }

export const selecionaEvento = (evento) =>
    (dispatch, getState) => {
        dispatch([{
            type: 'SET_EVENTO_SELECIONADO',
            payload: evento
        },
        Actions.eventoScreen({ title: `${evento.room} - ${moment(evento.schedule).format('DD/MM/YYYY - HH:mm')}` }),
        buscarComentarios(evento._id)
        ])
    }

const buscarComentarios = (_event) =>
    (dispatch, getState) => {
        axios.get(`${baseUrl}/comment/${_event}`)
            .then((response) => {
                dispatch({ type: 'SET_COMENTARIOS', payload: response.data })
            })
            .catch((error) => {

            })
    }

export const sendAvaliacao = (comment, author, rate, _event) =>
    (dispatch, getState) => {

        var data = {}

        if (comment != '') {
            data.comment = comment
        }
        if (author != '') {
            data.author = author
        }
        data.rate = rate
        data._event = _event

        axios.post(`${baseUrl}/comment/`, data)
            .then((response) => {

                dispatch([buscarComentarios(_event)])
            })
            .catch((error) => {

            })
    }

export const atualizarEventos = () =>
    (dispatch, getState) => {
        dispatch({ type: 'SET_CARREGANDO', payload: true })

        axios.get(`${baseUrl}/event`)
            .then((response) => {
                dispatch({ type: 'SET_EVENTOS', payload: response.data })
                gravarObjeto('eventos', response.data)
                    .then((response) => {
                        dispatch({ type: 'SET_CARREGANDO', payload: false })
                    })
                    .catch((error) => {
                        dispatch({ type: 'SET_CARREGANDO', payload: false })
                    })
            })
            .catch((error) => {
                dispatch({ type: 'SET_CARREGANDO', payload: false })
            })
    }

export const buscarEventos = () =>
    (dispatch, getState) => {
        dispatch({ type: 'SET_CARREGANDO', payload: true })

        NetInfo.getConnectionInfo().then((connectionInfo) => {

            if (connectionInfo.type == 'none' || connectionInfo.type == 'unknown') {
                if (Platform.OS == 'android') {
                    ToastAndroid.showWithGravity(
                        'Você está sem conexão com a internet',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
                recuperarObjeto('eventos')
                    .then((response) => {
                        dispatch([{ type: 'SET_CARREGANDO', payload: false }])
                        if (response == null) {
                            dispatch({ type: 'SET_EVENTOS', payload: [] })
                        } else {
                            dispatch({ type: 'SET_EVENTOS', payload: response })
                        }
                    })
                    .catch((error) => {
                        dispatch({ type: 'SET_CARREGANDO', payload: false })
                    })
            } else {
                axios.get(`${baseUrl}/event`)
                    .then((response) => {
                        dispatch({ type: 'SET_EVENTOS', payload: response.data })
                        gravarObjeto('eventos', response.data)
                            .then((response) => {
                                dispatch({ type: 'SET_CARREGANDO', payload: false })
                            })
                            .catch((error) => {
                                dispatch({ type: 'SET_CARREGANDO', payload: false })
                            })
                    })
                    .catch((error) => {
                        error = JSON.parse(JSON.stringify(error))
                        dispatch({ type: 'SET_CARREGANDO', payload: false })
                    })
            }
        });
    }