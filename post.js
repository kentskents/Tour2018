
import React, { Component } from 'react';
// import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {
  // ListView,
  ActivityIndicator,
  ScrollView,
  Button,
  CameraRoll,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Platform,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import AsyncStorageREPL from 'async-storage-repl';
// import ImagePicker from 'react-native-image-picker';
import Modal from "react-native-modal";




class Post extends Component {
  constructor(props){
    super(props)
    this.state = {images: [], imageSel: [], selPhoto: ""}
  }

  componentDidMount() {
    let svThis = this
    CameraRoll.getPhotos({first:25})
      .then(function(obj){
        console.log(obj)
        svThis.storeImages(obj.edges, svThis)
      })
  }

  storeImages(edges,svThis) {
    const images = edges.map((asset) => {
      //Alert.alert(asset.node.image.uri)
      return asset.node.image
    })

    let imgSel = []
    images.map((img) => {
      imgSel.push({uri: img.uri, selected: false})
    })

    svThis.setState({images: images, imageSel: imgSel})
  }

  logImageError(err) {
    console.log(err)
  }

  handleClick(img) {
    let imgSel = this.state.imageSel.map((sel) => {
      if (sel.uri == img.uri){
        sel.selected = !sel.selected
      }
      return sel
    })

    this.setState({imageSel: imgSel, selPhoto: img.uri})
  }

  // handleUpload(){
  //   let data = new FormData()
  //   let cnt = 1
  //   this.state.imageSel.map((sel) => {
  //     if (sel.selected){
  //       data.append("file_" + cnt, {uri: sel.uri ,name: "photo_" + cnt + ".jpg",type:"image/jpg"})
  //       cnt += 1
  //     }
  //   })
  //
  //   let REQ_URI = "http://192.168.11.3:3000/upload_image_from_native"
  //   axios.post(REQ_URI,data)
  //     .then(function(res){
  //       Alert.alert("good")
  //     })
  //     .catch(function(err){
  //       console.log(err)
  //     })
  // }


  render() {
    let imgs = []
    imgs = this.state.images.map((img) => {

      let selTrue = false
      let selView = null
      this.state.imageSel.map((sel) => {
        if (sel.uri == img.uri && sel.selected == true){
          selTrue = true
        }
      })

      // if (selTrue){
      //   selView = (
      //     <View style={styles.imageSel}>
      //       <Image
      //         style={styles.check}
      //         source={require("../images/check.png")}
      //       />
      //     </View>
      //   )
      // }

      return (
        <TouchableHighlight
          style={styles.tphoto}
          key={img.uri}
          onPress={() => this.handleClick(img)}>
          <View>
            <Image style={styles.image} source={{uri: img.uri}} />
          </View>
        </TouchableHighlight>
      )
    })

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageGrid} >
            {imgs}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  imageSel: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  check: {
    height: 20,
    width: 20,
  }
})



export default Post
