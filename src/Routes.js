
import React, { Component } from 'react';
import { Text, Image, Dimensions, StyleSheet, View, TouchableOpacity, TextInput, Platform, StatusBar} from 'react-native';
import { Router, Scene, Stack, Actions, Drawer } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './views/Login'
import Inicio from './views/Inicio'
import Eventos from './views/Eventos';

import { setPesquisar } from './actions/EventosActions'
import { primary, primaryLight } from './components/colors';
import Evento from './views/Evento';

class Routes extends Component {

    constructor(props) {
        super(props)
        this.state = { search: false }
    }

    search = (props) => (
        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', flex: 1, marginHorizontal: 8 }}>
            <View style={{ flex: 8, alignItems: 'center', paddingRight: 8, flexDirection: 'row', backgroundColor: 'rgba(299,255,255,0.2)', borderRadius: 4 }}>
                <View style={{ flex: 1, alignItems: 'center', marginLeft: 8 }}>
                    <Icon name="search" size={16} color="white" />
                </View>
                <View style={{ flex: 8 }}>
                    <TextInput
                        placeholder='Pesquisar'
                        placeholderTextColor='white'
                        ref={(input) => { this.pesquisarInput = input }}
                        onChangeText={(text) => { this.props.setPesquisar(text) }}
                        style={{
                            width: '100%',
                            borderRadius: 4,
                            height: 35,
                            paddingVertical: 4,
                           
                            color: 'white'
                        }}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={{ flex: 1.3, alignItems: 'center' }}>
                    <Icon name="times-circle" size={16} color="white" style={{ padding: 8 }} onPress={() => { this.pesquisarInput.setNativeProps({ text: '' }) }} />
                </View>
            </View>
            <TouchableOpacity onPress={() => { this.setState({ search: false }); Actions.refresh({ renderTitle: this.centerInicio, renderRightButton: this.rightInicio, renderLeftButton: Platform.OS == 'ios' ? this.sanduiche : null }) }}>
                <View style={{ flex: 2, paddingHorizontal: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{  color: 'white' }}>Cancelar</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    centerInicio = (props) => (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{marginLeft: 10, color: 'white', fontSize: 18}}>Agenda</Text>
        </View>
    )

    rightInicio = (props) => (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
            <TouchableOpacity onPress={() => { Actions.refresh({ renderTitle: this.search, renderRightButton: null, renderLeftButton: null }); this.setState({ search: true }); setTimeout(() => { this.pesquisarInput.focus() }, 1) }}>
                <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                    <Icon name="search" size={20} color="white" />
                </View>
            </TouchableOpacity>
            
        </View>
    )


    sanduiche = (props) => (
        <TouchableOpacity onPress={() => { Actions.drawerOpen() }}>
            <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="bars" size={20} color="white"  />
            </View>
        </TouchableOpacity>
    )


    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene 
                        key='eventosScreen' 
                        component={Eventos} 
                        title="Eventos" 
                        navigationBarStyle={{ backgroundColor: primaryLight }}
                        renderTitle={this.state.search == true ? this.search : this.centerInicio} 
                        renderRightButton={this.state.search == true ? null : this.rightInicio}
                    />
                    <Scene 
                        key='eventoScreen' 
                        navigationBarStyle={{ backgroundColor: primaryLight }}
                        titleStyle={{color: 'white'}}
                        backButtonTintColor='rgba(255,255,255,1)'
                        component={Evento} 
                        title="Eventos"
                    />
                </Scene>
            </Router>
        );
    }
}


const mapStateToProps = state => (
    {
        InicioReducer: state.InicioReducer
    }
);

const mapActionsToProps = {
    setPesquisar,
}

export default connect(null, mapActionsToProps)(Routes);


