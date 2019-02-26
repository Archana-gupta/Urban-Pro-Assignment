import React, {Component} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import Text from './common/MyText';
import styles from './../styles';

export default class Contact extends Component {
            
    constructor(props){
        super(props)
    }

    render() {
        let store = this.props.navigation.state.params.store
        return(
            <View>
                <View style={[styles.card]}>
                    <Text>{store.name}</Text>
                    <Text>{store.categoryName}</Text>
                    <Text>{store.location}</Text>
                    <Text>At the {store.classLocPref}</Text>
                
                    <Button title="Call" raised backgroundColor='#fec200' containerViewStyle={{margin : 10 , borderRadius : 8}}></Button>
                    <Button title="Respond"  raised backgroundColor='#fec200' containerViewStyle={{margin : 10 ,borderRadius : 8}}></Button>
                </View>
            </View>
        )
    }
}

