
import React, { Component } from 'react';
import {
    Text, View, FlatList, Image, Modal, StatusBar,
    TouchableOpacity, Dimensions, Button, Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';

import moment from 'moment'

var height = Dimensions.get('screen').height - 128

import { buscarEventos, atualizarEventos, setInternetConnection, selecionaEvento } from '../actions/EventosActions'

import Icon from 'react-native-vector-icons/FontAwesome';
import { primary } from '../components/colors';

class Eventos extends Component {
    constructor() {
        super()
        this.state = {
            modalVisible: false,
        };
    }

    componentDidMount() {
        this.props.buscarEventos()
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    evento(item) {
        return (
            <TouchableOpacity onLongPress={() => { this.setState({ modalVisible: true }) }} onPress={() => { this.props.selecionaEvento(item) }} style={{ flexDirection: 'row', alignItems: 'center', height: 80, borderBottomColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 0.5 }}>
                <View style={{ flex: 2, }}>
                    <Image
                        style={{ width: 60, height: 60, marginLeft: 4, borderRadius: Platform.OS == 'ios' ? 30 : 120 }}
                        source={{ uri: item.asset }}
                        resizeMode='contain'
                    />
                </View>
                <View style={{ flex: 6 }}>
                    <Text numberOfLines={1} style={{ fontSize: 14, color: 'black', fontWeight: '800' }} ellipsizeMode='tail'>{item.name}</Text>
                    <Text numberOfLines={2} style={{ fontSize: 12, color: 'black' }} ellipsizeMode='tail'>{item.speaker}</Text>
                    <Text numberOfLines={2} style={{ fontSize: 10, color: 'black' }} ellipsizeMode='tail'>{moment(item.schedule).format('DD/MM/YYYY - HH:mm')} - {item.room}</Text>
                </View>
                <View style={{ flex: 2, alignItems: 'center' }}>
                    <Icon name="eye" size={16} color={primary} />
                </View>
            </TouchableOpacity>
        )
    }

    semEventos() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: height }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}> Não há eventos cadastrados </Text>
                <Button onPress={() => { this.setState({ refresh: true }); setTimeout(() => { this.setState({ refresh: false }) }, 5000); this.props.atualizarEventos() }} title='Atualizar Eventos' />
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar backgroundColor={primary} barStyle='light-content' />
                <FlatList
                    extraData={this.props.EventosReducer.data}
                    data={this.props.EventosReducer.data}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => this.evento(item)}
                    ListEmptyComponent={this.semEventos()}
                    refreshing={this.props.EventosReducer.carregando}
                    onRefresh={() => { this.props.atualizarEventos() }}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    EventosReducer: state.EventosReducer
})

const mapDispatchToProps = {
    buscarEventos,
    atualizarEventos,
    setInternetConnection,
    selecionaEvento
}

export default connect(mapStateToProps, mapDispatchToProps)(Eventos);
