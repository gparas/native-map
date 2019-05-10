import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const query = 'food';
const latitude = 37.773972;
const longitude = -122.431297;

const params = {
  v: '20190501',
  ll: [latitude, longitude].join(','),
  query,
  limit: 100,
  intent: 'checkin',
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
            dataSource: data.response.venues,
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
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
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={styles.map}
          ref={ref => {
            this.map = ref;
          }}
        >
          {this.state.dataSource.map(v => {
            const icon = _.join(_.values(v.categories[0].icon), '32');
            console.log(icon);
            return (
              <Marker
                key={v.id}
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
              >
                <View style={styles.marker}>
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={{ uri: icon }}
                  />
                </View>
              </Marker>
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
  },
});
