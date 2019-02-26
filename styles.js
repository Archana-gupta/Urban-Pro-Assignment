import React from 'react';
import {StyleSheet , Dimensions} from 'react-native';

const {width , height} = Dimensions.get("window");

export  default StyleSheet.create({
    page: {
        backgroundColor : '#fff'
    },
	col : {
        flex : 1,
        flexDirection : 'column'
    },
    row : {
        flexDirection : 'row',
        flex:  1 ,
    },
    textStyle : {
        fontSize : 12,  
        fontFamily : 'sans-serif-medium',
        fontWeight : "300" ,
        color : 'black'
    },
    card :{
        borderRadius : 2,
        borderWidth : 1,
        borderColor : 'white',
        backgroundColor : 'white',
        margin : 10,
        padding : 6,
        elevation:  4
    }
});