import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text : ''
    }
  }
  getTest = () => {
    console.log('hey');
    fetch('http://192.168.1.15:8850/api/getTest')
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      this.setState({
        text : text
      })
    })
  }
  render() {
    return (
      <View style={styles.dashboard}>
      <Text>{this.state.text}</Text>
        <Button 
        onPress={this.getTest}
        title="Learn More"
        color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dashboard: {
    position: 'absolute',
    bottom: 0,
    height: '50%',
    width: '92%',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    borderBottomLeftRadius: 0,
	borderBottomRightRadius: 0,
	borderTopLeftRadius: 6,
	borderTopRightRadius: 6,
    zIndex: 3
  }
});