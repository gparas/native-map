import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const query = 'food';

const params = {
  v: '20190501',
  near: 'athens',
  categoryId: '4bf58dd8d48988d10e941735',
  // limit: 100,
  // intent: 'global',
  client_id: 'BCUJZ2MSKUWJC2Q5HVIYZLHRWGFJ2OFPKPLBP1NOBNR3VW5R',
  client_secret: 'Q10HUP5APBQOYNTPABSH4CSKRGEAI2CXIYULYGG0EZYUUWUZ',
};

const queryString = Object.keys(params)
  .map(key => key + '=' + params[key])
  .join('&');

export default class FoursquareMap extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch(`https://api.foursquare.com/v2/venues/search?${queryString}`)
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            isLoading: false,
            dataSource: data.response,
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  fitToMarkersToMap() {
    const { dataSource } = this.state;
    this.map.fitToSuppliedMarkers(dataSource.venues.map(v => v.id), true);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      );
    }
    console.log(this.state.dataSource);
    const { dataSource } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={ref => {
            this.map = ref;
          }}
          initialRegion={{
            latitude: dataSource.geocode.feature.geometry.center.lat,
            longitude: dataSource.geocode.feature.geometry.center.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {dataSource.venues.map(v => {
            return (
              <Marker
                key={v.id}
                identifier={v.id}
                coordinate={{
                  latitude: v.location.lat,
                  longitude: v.location.lng,
                }}
                onCalloutPress={() => {
                  this.props.navigation.navigate('Details', {
                    name: v.name,
                    course: v.location.address,
                  });
                }}
                title={v.name}
                description={v.location.address}
              />
            );
          })}
        </MapView>
        <View style={{ marginVertical: 20 }}>
          <TouchableOpacity onPress={() => this.fitToMarkersToMap()}>
            <Text>Fit Markers Onto Map</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    backgroundColor: 'red',
    borderRadius: 999,
  },
});
