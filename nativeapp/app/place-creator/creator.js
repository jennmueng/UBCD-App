import React from 'react';
import { Text, View, ScrollView, Image, StatusBar, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { appColors, appFontSizes } from '../assets/appStyles.js'
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

class PlaceName extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        let styles = {
            namePage : {
                backgroundColor: 'white',
                height: '100%',
                width: '100%',
                padding: 15
            },
            nameModal : {
                width: '100%',
                height: 200,
                backgroundColor: 'white',
                borderRadius: 6,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'

            },
            inputTitle : {
                fontWeight: '500',
                marginBottom: 5,
                fontSize: 18,
                position: 'relative'
            },
            input : {
                height: 45,
                width: '85%',
                backgroundColor: appColors.lightGray,
                borderRadius: 6,
                marginBottom: 18
            },
            button : {
                position: 'absolute',
                bottom: 0,
                alignSelf: 'flex-end',
                backgroundColor: 'red'
            }
        }
        console.log('open')
        return(
            <View style={styles.namePage}>
                <View style={styles.nameModal}>
                    <Text style={styles.inputTitle}>What's the name of this place?</Text>
                    <TextInput style={styles.input}></TextInput>
                    <Button 
                        style={styles.button}
                        onPress={null}
                        title="Next"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      isIphoneX : state.isIphoneX,
      screenDimensions : state.screenDimensions,
    }
  }
   
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
  }

const PlaceCreator = StackNavigator({
    Name : {
        screen: PlaceName
    }
},
{
    initialRoute: 'Name',
    headerMode : 'float',
    navigationOptions : (({navigation}) => ({
        header : (props) => {
            return (
                <View style={{
                    height: 95,
                    backgroundColor: 'white',
                    justifyContent: 'flex-end'
                }}>
                    <Text style={{
                        fontSize: 28,
                        fontWeight: '700',
                        marginBottom: 5,
                        position: 'relative',
                        bottom: 5,
                        left: 15
                    }}>
                        Add a Place
                    </Text>
                </View>
            )
        }
    }))
    
})

class PC extends React.Component {
    render() {
        let styles = {
            placeCreatorPage : {
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                zIndex: 6, 
                top: 0, 
                left: 0
            },
            noti_headerWrapper : {
                position: 'absolute'
            },
            create_header : {
                fontSize: 28,
                fontWeight: '700',
                marginBottom: 5,
                zIndex: 100
            },
            pc : {
                height: 50
            }
        }
        return(
            <View style={styles.placeCreatorPage}>
                <StatusBar barStyle='dark-content' />
                <PlaceCreator style={styles.pc}/>
            </View>
        )
    }
}
  
let pCExport = connect(
    mapStateToProps,
    mapDispatchToProps
)(PC);

  export default pCExport;