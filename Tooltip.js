import React, { Component } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

class Tooltip extends Component {
  render() {
    const { name, type, course } = this.props;
    console.log(this.props.navigation);
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text>{type}</Text>
            <Text>{course}</Text>
            <Button
              title='Go to Details'
              onPress={() => {
                console.log('pressed');
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Details', {
                  name: name,
                  course: course,
                });
              }}
            />
          </View>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

export default Tooltip;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  // Callout bubble
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  // Character name
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
