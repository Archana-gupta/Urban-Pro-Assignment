import React, {Component} from 'react';
import { StyleSheet, View , Linking, ActivityIndicator} from 'react-native';
import styles from './../styles';
import { List, ListItem , Avatar , Icon} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Text from './common/MyText';
import randomColor from 'randomcolor';
// var randomColor = require('randomcolor');

export default class Enquiries extends Component {
	constructor(props){
        super(props)
        this.state = {
			data : [],
			progress : true
		}
		this.star = []
		this.callNumber = this.callNumber.bind(this);
		this.capitalize = this.capitalize.bind(this);
	}
	
	componentWillMount(){
		fetch('http://www.mocky.io/v2/5c41920e0f0000543fe7b889')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					data : responseJson,
					progress : false
				})
			})
			.catch((error) => {
				this.setState({
					progress : false
				})
				alert("There seems to be network error !")
				console.error(error);
		});
	}

	callNumber(contact){
		Linking.canOpenURL('tel://'+contact).then(supported => {
			if (!supported) {
				console.log('Can\'t handle url: ' + contact);
			} else {
				return Linking.openURL('tel://'+contact);
			}
		}).catch(err => console.error('An error occurred', err));
	}

	capitalize(temp){
		return temp.charAt(0).toUpperCase() + temp.slice(1).toLowerCase();
	}

	toggleStared(index){
		var prevState = this.state.data;
		prevState.dataList[index].isStarred = !prevState.dataList[index].isStarred;

		this.setState({
			data : prevState
		})
	}

	render() {
		let list = this.state.data ? this.state.data.dataList : null;
		console.log(list)
		return (
			<ScrollView style={styles.page}>
				{this.state.progress ? <ActivityIndicator animating={this.state.progress} size="large"/> : null}
				<List containerStyle={{ margin : 10, marginBottom: 20 , flex : 1 , borderTopWidth : 0 , borderEndWidth : 0}}>
				{ list ?
					list.map((l, index) => (
						<ListItem
						hideChevron
						// onPress={() => alert("sjdhjshd")}
						onPress={()=> this.props.navigation.navigate('Contact' , {store : l})}
						subtitle = {
							<View style={styles.row}>
								<View style={{marginRight : 10}}>
									<Avatar title={l.name[0]} rounded containerStyle={{backgroundColor : randomColor()}}/>
								</View>
								<View style={styles.col}>
									<View style={[styles.row,{justifyContent : 'space-between', marginRight : 20 }]}>
										<Text>{l.name} <Text style={{color : '#FFA349'}}> {this.capitalize(this.state.data.type)}</Text></Text>
										<Text style={{color : 'grey'}}>{l.postedOn}</Text>
									</View>
									<View style={[styles.row , {justifyContent : 'space-between'}]}>
										<View>
											<Text>{l.categoryName}</Text>
											<Text>{l.location}</Text>
											<Text>At the {l.classLocPref}</Text>
											<Text>Be the first one to respond</Text>
										</View>
										<View style={{justifyContent : 'space-between'}}>
											<Icon name="phone-square" type="font-awesome" color="#689f38" onPress={()=> this.callNumber(l.phoneNumber)}/>
											 { l.isStarred ? <Icon name='star'  type="font-awesome" color= '#fec200' onPress={()=> this.toggleStared(index)}/> 
											 :<Icon name='star-o'  type="font-awesome" color="#dddddd" onPress={()=> this.toggleStared(index)}/>}
										</View>
									</View>
								</View>
							</View> 
						}/>
					))
					: null
				}
				</List>
			</ScrollView>
		);
	}
}
