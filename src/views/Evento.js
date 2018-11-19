
import React, { Component } from 'react';
import {
    Text, View, FlatList, Image, TouchableOpacity,
    Dimensions, Button, NetInfo, ScrollView, Modal,
    StatusBar, TextInput, Keyboard
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';

import moment from 'moment'

import { primary, secondary, color1, color2, primaryLight, color2Light } from '../components/colors';

import { buscarEventos, setInternetConnection, sendAvaliacao } from '../actions/EventosActions'



class Evento extends Component {
    constructor() {
        super()

        this.state = {
            aba: 'Assunto',
            modalVisible: false,
            autor: '',
            comentario: '',
            stars: 3
        }

        this.abas = this.abas.bind(this)
        this.sendAvaliacao = this.sendAvaliacao.bind(this)
    }

    semComentarios() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}> Não há comentários </Text>
            </View>
        )
    }

    setModalVisible(modalVisible) {
        this.setState({ modalVisible })
    }

    comentarios(item) {
        if (item.comment == "") {
            item.comment = undefined
        }
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', minHeight: 80, borderBottomColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 0.5, marginHorizontal: 6 }}>
                <View style={{ flex: 8, justifyContent: 'center' }}>
                    {
                        item.author &&
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>{String(item.author)}</Text>
                    }
                    {
                        item.comment &&
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>{String(item.comment)}</Text>
                    }
                </View>
                <View style={{ flex: 2, alignItems: 'center' }}>
                    <Icon name='star' size={28} color={secondary} />
                    <Text style={{ color: 'black' }} >{String(item.rate)}</Text>
                </View>
            </View>
        )
    }

    sendAvaliacao(_event) {
        this.props.sendAvaliacao(this.state.comentario, this.state.autor, this.state.stars, _event)
        this.setState({ autor: '', comentario: '', stars: 3, modalVisible: false })
    }

    abas() {
        if (this.state.aba == 'Assunto') {
            const evento = this.props.EventosReducer.eventoSelecionado

            return (
                <ScrollView>
                    <Text style={{ margin: 6, fontSize: 18, color: 'black' }}>
                        {evento.subject}
                    </Text>
                </ScrollView>
            )
        } else if (this.state.aba == 'Comentários') {
            const comentarios = this.props.EventosReducer.comentarios
            return (
                <FlatList
                    extraData={comentarios}
                    data={comentarios}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => this.comentarios(item)}
                    ListEmptyComponent={this.semComentarios()}
                />
            )
        }
    }

    render() {
        const evento = this.props.EventosReducer.eventoSelecionado
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar backgroundColor={primary} barStyle='light-content' />
                <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: 'black', fontSize: 16, margin: 6 }}>{evento.name}</Text>
                <View style={{ flexDirection: 'row', margin: 6 }}>
                    <View style={{ flex: 5, justifyContent: 'center' }}>
                        <Image
                            style={{ width: 160, height: 160, borderRadius: 80 }}
                            source={{ uri: evento.asset }}
                            resizeMode='contain'
                            resizeMethod='resize'
                            blurRadius={0}
                        />
                    </View>
                    <View style={{ flex: 5 }}>
                        <Text style={{ color: 'black', fontSize: 16, marginBottom: 18 }}> <Icon name='user' size={18} color={primary} /> {evento.speaker}</Text>
                        <Text style={{ color: 'black', fontSize: 16, marginBottom: 18 }}> <Icon name='building' size={18} color={primary} /> {evento.room} </Text>
                        <Text style={{ color: 'black', fontSize: 16, marginBottom: 18 }}> <Icon name='clock-o' size={18} color={primary} /> {moment(evento.schedule).format('DD/MM/YYYY - HH:mm')} </Text>
                        <Button title='Avaliar' color={color1} onPress={() => { this.setModalVisible(true) }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', margin: 6 }}>
                    <View style={{ flex: 5, marginRight: 3 }}>
                        <Button title='Assunto' color={this.state.aba == 'Assunto' ? primary : secondary} onPress={() => { this.setState({ aba: 'Assunto' }) }} />
                    </View>
                    <View style={{ flex: 5, marginLeft: 3 }}>
                        <Button title='Comentários' color={this.state.aba == 'Comentários' ? primary : secondary} onPress={() => { this.setState({ aba: 'Comentários' }) }} />
                    </View>
                </View>

                {
                    this.abas()
                }

                <Modal
                    animationType="fade"
                    style={{ height: 300, width: 300 }}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                        <StatusBar backgroundColor='rgba(0,0,0,0.7)' />
                        <View style={{ width: 300, height: 300, backgroundColor: 'white', borderRadius: 8 }}>
                            <Text style={{ color: 'black', fontSize: 16, textAlign: 'center', marginTop: 10 }}>Avalie essa palestra</Text>
                            <TextField containerStyle={{ marginHorizontal: 6, marginTop: -12 }} label='Seu nome - opcional' value={this.state.autor} onChangeText={(text) => this.setState({ autor: text })} />
                            <TextField containerStyle={{ marginHorizontal: 6, marginTop: -12 }} label='Seu comentário - opcional' value={this.state.comentario} onChangeText={(text) => this.setState({ comentario: text })} />
                            <StarRating
                                disabled={false}
                                containerStyle={{ marginHorizontal: 6, marginVertical: 8 }}
                                maxStars={5}
                                rating={this.state.stars}
                                emptyStarColor={secondary}
                                fullStarColor={secondary}
                                selectedStar={(rating) => { Keyboard.dismiss(); this.setState({ stars: rating }) }}
                            />
                            <View>
                                <TouchableOpacity onPress={() => { this.setModalVisible(false) }} style={{ height: 43, justifyContent: 'center', alignContent: 'center' }}>
                                    <Text style={{ color: color2, fontSize: 16, textAlign: 'center' }}> CANCELAR </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.sendAvaliacao(evento._id) }} style={{ height: 43, justifyContent: 'center', alignContent: 'center' }}>
                                    <Text style={{ color: primary, fontSize: 16, textAlign: 'center' }}> AVALIAR </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View >
        );
    }
}

const mapStateToProps = state => ({
    EventosReducer: state.EventosReducer
})

const mapDispatchToProps = {
    buscarEventos,
    setInternetConnection,
    sendAvaliacao
}

export default connect(mapStateToProps, mapDispatchToProps)(Evento);
