import React, {Component} from 'react';
import { StyleSheet, View , Linking, ActivityIndicator} from 'react-native';
import styles from './../styles';
import { List, ListItem , Avatar , Icon} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Text from './common/MyText';
import randomColor from 'randomcolor';

export default class Students extends Component {
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
		fetch('http://www.mocky.io/v2/5c41950b0f0000543fe7b8a2')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					data : responseJson,
					progress : false
				})
				console.log(this.state.data)
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
		return temp ? temp.toUpperCase() : null
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
						subtitle = {
							<View style={[styles.row , {marginTop : 10 , marginBottom : 10}]}>
								<View style={{marginRight : 10}}>
									<Avatar title={this.capitalize(l.name[0])} rounded containerStyle={{backgroundColor : randomColor()}}/>
								</View>
								<View style={styles.col}>
									<View style={[styles.row,{justifyContent : 'space-between', marginRight : 20 }]}>
										<Text>{l.name} <Text style={{color : '#FFA349'}}> {this.capitalize(l.platformTag)}</Text></Text>
										<Text style={{color : 'grey'}}>{l.created}</Text>
									</View>
									<View style={[styles.row , {justifyContent : 'space-between'}]}>
										<View>
											<Text>{l.category}</Text>
											<Text>{l.batchName}</Text> 
										</View>
									</View>
								</View>
								<View style={{justifyContent : 'space-between'}}>
									<Icon name="dots-three-vertical" type="entypo" size={16} color="grey" />
									<Icon name="phone-square" type="font-awesome" color="#689f38" onPress={()=> this.callNumber(l.phoneNumber)}/>
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
