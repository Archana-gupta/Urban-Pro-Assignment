import React from 'react';
import {Text} from 'react-native';
import {Header } from 'react-native-elements';
import {createMaterialTopTabNavigator, createStackNavigator , createAppContainer} from 'react-navigation';
import Enquiries from './src/Enquiries';
import Students from './src/Students';
import Contact from './src/Contact';

const tabNav = createMaterialTopTabNavigator({
	"Enquiries" : {
		screen : Enquiries
	},
	"Students" : {
		screen : Students,
		navigationOptions : {
			header :
				<Header 
					statusBarProps = {{barStyle : 'light-content' ,  backgroundColor : '#00D59C'}}
					outerContainerStyles={{backgroundColor : '#00D59C' , fontWeight : 600 , color : 'white'}}
					rightComponent={{text : "List of Enquiries" , textBreakStrategy : "simple"}}>					
				</Header>
		},
	},
},{
	initialRoute : 'Enquiries',
	navigationOptions : {
		header :
			<Header 
				statusBarProps = {{barStyle : 'light-content' ,  backgroundColor : '#00D59C'}}
				outerContainerStyles={{backgroundColor : '#00D59C' , fontWeight : 600 , color : 'white'}}>
				<Text style={{color: '#fff' , fontWeight : "500"}}>List of Enquiries</Text>
				</Header>
	},
	backBehavior : 'initialRoute',
	tabBarOptions : {
		style : {
			backgroundColor : 'white'
		},
		activeTintColor: 'white',
		activeTintColor : 'black',
		inactiveTintColor : 'grey',
		indicatorStyle : {
			backgroundColor : '#00D59C'
		}
	},
	lazy :true
})

const App = createStackNavigator({
	tabNav : {
		screen : tabNav
	},
	Contact : {
		screen : Contact
	}
}
)

export default createAppContainer(App);