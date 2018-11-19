
import React, { Component } from 'react';
import { View, Text, Button} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';

class Login extends Component {

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                <Text>Login</Text>
                <Button title='Ir para o inicio' onPress={()=>{Actions.inicioScreen()}} />
            </View>
        );
    }
}

export default connect(null, null)(Login);
