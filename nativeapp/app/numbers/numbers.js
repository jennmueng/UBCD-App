import React from 'react';
import { Text, View, ScrollView, Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { appColors, appFontSizes } from '../assets/appStyles.js'
import { connect } from 'react-redux';

class Numbers extends React.Component {
    constructor(props) {
        super(props);
        
    }
    componentWillMount() {
        console.log(this.props);

    }
    render() {
        let styles = {
            notiPage : {
                paddingTop: this.props.isIphoneX ? 60 : 50
            },
            noti_headerWrapper : {
                
                marginLeft: 15,
                marginRight: 15
            },
            noti_header : {
                fontSize: 28,
                fontWeight: '700',
                marginBottom: 5,
                
            },
            noti : {
                width: '100%',
                height: 55,
                backgroundColor: 'white',
                borderRadius: 6,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                overflow: 'hidden'
            },
            shadow : {
                shadowColor: '#000',
                width: '100%',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.07,
                shadowRadius: 12,
                borderRadius: 6,
                height: 55,
                marginBottom: 10,
            },
            titleBox : {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingLeft: 15,
                width: '90%'
            },
            notiText : {
                paddingLeft: 15,
                maxWidth: '80%'
            },
            noti_scrollView : {
                width: '100%',
                height: '100%',
                paddingTop: 15,
                paddingLeft: 15,
                paddingRight: 15,
            },
            number : {
                color: appColors.mediumGray,
                marginLeft: 10
            },
            noti_closeButton : {
                right: 15,
                position: 'absolute'
            },
            
            bottomExtra : {
                height: this.props.isIphoneX ? 115 : 100
            }
        }
        console.log(this.props.Numbers)
        let numbersArray = [
            {
                icon: 'alert',
                text: 'Police',
                number: '911'
            },
            {
                icon: 'alert',
                text: 'Fire',
                number: '320-3448-344'
            },
            {
                icon: 'alert',
                text: 'Tourist Police',
                number: '086-483-4834'
            },
            {
                icon: 'alert',
                text: 'Embassy',
                number: '1824'
            }
        ]
        let Numbers = numbersArray.map((noti, index) => (
            <View style={styles.shadow} key={index}>
                <View style={styles.noti}>
                    <View style={styles.titleBox}>
                        <Icon 
                            style={styles.typeIcon} 
                            name={noti.icon} 
                            size={24} color={appColors.mediumGray}  
                        />
                        <Text style={styles.notiText}>{noti.text}</Text>
                        <Text style={styles.number}>{noti.number}</Text>
                    </View>
                    
                    <Icon 
                        style={styles.noti_closeButton} 
                        name={'phone'} 
                        size={20} color={appColors.mediumGray}  
                    />
                </View>
            </View>
        ))
        return(
            <View style={styles.notiPage}>
                <StatusBar barStyle='dark-content' />
                <View style={styles.noti_headerWrapper}>
                    <Text style={styles.noti_header}>Numbers</Text>
                </View>
                <ScrollView style={styles.noti_scrollView} scrollingEnabled={true}>
                    {Numbers}
                    <View style={styles.bottomExtra}/>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      isIphoneX : state.isIphoneX,
      screenDimensions : state.screenDimensions,
      Numbers : state.Numbers
    }
  }
   
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getNoti : () => {
          dispatch(getNoti())
      }
    }
  }
  
  let NumExport = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Numbers);

  export default NumExport;