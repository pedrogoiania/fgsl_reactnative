
import React, { Component } from 'react';
import { Text, View} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';

class Inicio extends Component {

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                <Text>Inicio</Text>
            </View>
        );
    }
}

export default connect(null, null)(Inicio);
