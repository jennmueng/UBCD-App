import React from 'react';
import { Text, View, ScrollView, Image, StatusBar, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { appColors, appFontSizes } from '../assets/appStyles.js'
import { connect } from 'react-redux';

class Notifications extends React.Component {
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
                height: 70,
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
                height: 70,
                marginBottom: 10,
            },
            titleBox : {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start'
            },
            colorBar : {
                height: 70,
                width: 10,
                zIndex: 4,
                marginRight: 15
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

            noti_closeButton : {
                right: 15,
                position: 'absolute'
            },
            
            bottomExtra : {
                height: this.props.isIphoneX ? 115 : 100
            }
        }
        console.log(this.props.notifications)
        let notifications = this.props.notifications.map((noti) => (
            <View style={styles.shadow} key={noti.key}>
                <View style={styles.noti}>
                    <View style={styles.titleBox}>
                        <View style={{...styles.colorBar, backgroundColor: noti.color}}></View>
                        <Icon 
                            style={styles.typeIcon} 
                            name={noti.icon} 
                            size={24} color={appColors.mediumGray}  
                        />
                        <Text style={styles.notiText}>{noti.text}</Text>
                    </View>
                    
                    <Icon 
                        style={styles.noti_closeButton} 
                        name={'x'} 
                        size={20} color={appColors.mediumGray}  
                    />
                </View>
            </View>
        ))
        return(
            <View style={styles.notiPage}>
                <StatusBar barStyle='dark-content' />
                <View style={styles.noti_headerWrapper}>
                    <Text style={styles.noti_header}>Notifications</Text>
                </View>
                <ScrollView style={styles.noti_scrollView} scrollingEnabled={true} refreshControl={
          <RefreshControl
            refreshing={() => console.log('refresh')}
            
                />}>
                    {notifications}
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
      notifications : state.notifications
    }
  }
   
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getNoti : () => {
          dispatch(getNoti())
      }
    }
  }
  
  let NotiExport = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Notifications);

  export default NotiExport;