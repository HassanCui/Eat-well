import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

export default class addReview extends React.Component {
  state = {
    image: null,
  };

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
    });
    if (!cancelled) this.setState({ image: uri });
  };

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });
    this.setState({ image: uri });
  };
uploadPic = ()=>{}

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.image }} />
        <View style={styles.row}>
          <Button onPress={this.selectPicture}>Gallery</Button>
          <Button onPress={this.takePicture}>Camera</Button>
        </View>
        <Button onPress={this.uploadPic} color='#2196F3'>Upload</Button>
      </View>
    );
  }
}

const Button = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
  },
  row: { flexDirection: 'row' },
  image: { width: 300, height: 300, backgroundColor: 'gray' },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
  },
  container: {
    flex: 1,
    backgroundColor: '#ebffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
