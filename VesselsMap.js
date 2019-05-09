import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { getVesselData } from './mockupDataGenerator';

export default class VesselsMap extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null,
  };
  state = {
    vessels: [],
  };
  componentDidMount() {
    this.setState({
      vessels: getVesselData(1000),
    });
    this.focusMap();
  }
  focusMap(markers, animated) {
    this.map.fitToSuppliedMarkers(markers, animated);
  }
  render() {
    const { vessels } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={ref => {
            this.map = ref;
          }}
        >
          {vessels.map(vessel => {
            return (
              <Marker
                key={vessel.SHIP_ID}
                coordinate={{
                  latitude: vessel.LAT,
                  longitude: vessel.LON,
                }}
                onCalloutPress={() => {
                  this.props.navigation.navigate('Details', {
                    name: vessel.SHIPNAME,
                    course: vessel.COURSE,
                  });
                }}
                title={vessel.SHIPNAME}
                identifier={vessel.SHIPNAME}
                image='https://sirius.searates.com/images/marker-yel.png'
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    backgroundColor: 'red',
    borderRadius: 999,
    width: 16,
    height: 16,
  },
});
