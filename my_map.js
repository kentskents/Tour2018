
import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import MapView from "react-native-maps";
import AsyncStorageREPL from 'async-storage-repl';

AsyncStorageREPL().connect();
const TODO ="@todoapp.todo";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

class MyMaps extends Component {
  state = {
    scrolledX: 0,
    points:[],
    points:[
      {
        id:0,
        map_id:1,
        name: "割烹　おかめ",
        latitude: 39.641728,
        longitude: 141.9486043,
      },
      {
        id:1,
        map_id:1,
        name: "魚彩亭　すみよし",
        latitude: 39.6408461,
        longitude: 141.9441934,
      },
      {
        id:2,
        map_id:1,
        name: "レストラン　汐菜",
        latitude: 39.6390527,
        longitude: 141.9677524,
      },
      {
        id:3,
        map_id:1,
        name: "浄土ヶ浜レストハウス",
        latitude: 39.6523041,
        longitude: 141.9754433,
      },
      {
        id:4,
        map_id:1,
        name: "味処　海舟",
        latitude: 39.6421364,
        longitude: 141.9558502,
      },
      {
        id:5,
        map_id:1,
        name: "めし屋　頂。",
        latitude: 39.6465428,
        longitude: 141.9440859,
      },
    ],
    // posts:[
    //   {
    //     id:0,
    //     point_id:0,
    //     title: "Best Place",
    //     detail: "45.524548",
    //     uri: "https://dl.dropboxusercontent.com/s/aohqm9w3ziesatt/171113tyasiro2.JPG",
    //   },
    //   {
    //     id:1,
    //     point_id:1,
    //     title: "Best Place",
    //     detail: "45.524698",
    //     uri: "https://dl.dropboxusercontent.com/s/rszs59dc6smwz5a/171003sirokuro1.jpg",
    //   },
    //   {
    //     id:2,
    //     point_id:2,
    //     title: "Best Place",
    //     detail: "45.5230786",
    //     uri: "https://dl.dropboxusercontent.com/s/simhof9go66h8so/170821kizitora1.jpg",
    //   },
    //   {
    //     id:3,
    //     point_id:3,
    //     title: "Best Place",
    //     detail: "45.521016",
    //     uri: "https://dl.dropboxusercontent.com/s/aohqm9w3ziesatt/171113tyasiro2.JPG",
    //   },
    // ],
    posts:[],
    region: {
      latitude: 39.6374725,
      longitude: 141.9450314,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
    post:[],
  };



  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    this.loadTodo()

    //外部サーバから場所情報取ってくる
    // fetch("http://192.168.1.86:7000/points.json")
    //   .then(response => response.json())
    //   .then(responseJson => this.setState({
    //     points: responseJson,
    //   }))
    //   .catch(e => console.log(e));

    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if(index >= this.state.points.length) {
        index = this.state.points.length - 1;
      }
      if(index <= 0) {
        index = 0;
      }
      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if(this.index !== index) {
          this.index = index;
          this.map.animateToRegion({
             // ...coordinate,
            latitude: this.state.points[index].latitude,
            longitude: this.state.points[index].longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta,
          }, 350);
        }
      }, 10);
    });
  }

  loadTodo = async () => {
    try{
      const todoString = await AsyncStorage.getItem(TODO)
      if (todoString){
        const posts = JSON.parse(todoString)
        this.setState({posts: posts})
      }
    } catch(e){
      console.log(e)
    }
  }

  _handleButtonPress = () => {
   CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });
   };


  gotoPostsScreen = (point) => {
    this.props.navigation.navigate('List', point)
  }


  render() {
    // const interpolations = this.state.markers.map((marker, index) => {
    const interpolations = this.state.points.map((point, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    point_name = () => {
      let selTrue = false
      let selView = null
      this.state.imageSel.map((sel) => {
        if (sel.uri == img.uri && sel.selected == true){
          selTrue = true
        }
      })

      return (
        <TouchableHighlight
          style={styles.tphoto}
          key={img.uri}
          // onPress={() => this._setImageUri(img)}>
          onPress={() => this.setState({ isModalVisible: !this.state.isModalVisible, imageUri: img.uri })}>
          <View>
            <Image style={styles.image} source={{uri: img.uri}} />
          </View>
        </TouchableHighlight>
      )
    }

    return(
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.points.map((point, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              // <MapView.Marker key={index} coordinate={marker.coordinate}>
              <MapView.Marker
                key={index}
                title={point.name}
                pinColor = {pinColor}
                coordinate={{latitude: point.latitude, longitude: point.longitude}}
                onCalloutPress={() => this.gotoPostsScreen(point)}
                >
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.View
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          <Carousel
            style={styles.carouselStyle}
            ref={(c) => { this._carousel = c; }}
            data={this.state.posts}
            // renderItem={this._renderItem}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Detail', item)}
              >
              <View style={styles.card} key={index}>
                  <Image source={{uri:item.uri}} style={styles.cardImage} resizeMode="cover" />
                  <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardDescription}>
                      {item.detail}
                    </Text>
                  </View>
              </View>
              </TouchableOpacity>
            )}
            sliderWidth={width}
            itemWidth={120}
            onScroll={(event)=>{
              this.animation.setValue(event.nativeEvent.contentOffset.x);
            }}
            useScrollView={true}

          />
        </Animated.View>

      </View>);
  }
}

const pinColor = '#000000';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  carouselStyle: {
    padding: 25,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "rgba(244,255,244, 1)",
    marginHorizontal: 10,
    margin: 30,
    shadowColor: "rgba(0,72,51, 0.9)",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 0 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0,153,102, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0,153,102, 0.5)",
    position: "absolute",
    borderWidth: 0.5,
    borderColor: "rgba(0,153,102, 0.5)",
  },
});

export default MyMaps
