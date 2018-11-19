import { AsyncStorage } from 'react-native'

export async function gravarObjeto(nomeDoObjeto, objeto){
    return await new Promise((resolve, rejected) => {
        let data = JSON.stringify(objeto)
        AsyncStorage.setItem(nomeDoObjeto, data)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            rejected(error)
        })
    })
}

export async function recuperarObjeto(nomeDoObjeto){
    return await new Promise((resolve, rejected) => {
        AsyncStorage.getItem(nomeDoObjeto)
        .then(response => {
            resolve(JSON.parse(response))
        })
        .catch(error => {
            rejected(error)
        })
    })
}
