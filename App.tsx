import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
export default function App() {
  const [localUri, setLocalUrl] = useState<string>('');
  /**
   * 打开选择图片
   */
  async function openImagePickerAsync() {
    // 选择图片
    // 获取权限
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(permissionResult);
    if (!permissionResult.granted) {
      // 用户不同意
      console.log('需要访问相册的权限');
      return;
    }

    // 获取权限成功
    // 异步打开手机相册，让用户选择图片
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled) {
      // 用户没有选择图片
      return;
    }

    setLocalUrl(pickerResult.assets[0].uri);
  }

  function goBack() {
    setLocalUrl('');
  }

  // 分享图片
  async function openShareImageAsync() {
    if (Platform.OS === 'web') {
      console.log('当前平台无法share');
      return;
    }
    await Sharing.shareAsync(localUri);
  }

  if (localUri) {
    // 根据localUri显示图片
    return (
      <>
        <View style={styles.container}>
          <Image source={{uri: localUri}} style={styles.thumbnail} />
          {/* 分享照片 */}
          <TouchableOpacity style={styles.button} onPress={openShareImageAsync}>
            <Text style={styles.buttonText}>分享图片</Text>
          </TouchableOpacity>
          {/* 重新选择 */}
          <TouchableOpacity style={styles.button} onPress={goBack}>
            <Text style={styles.buttonText}>重新选择</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      {/* logo图片 */}
      <Image source={require('./assets/logo.png')} />
      {/* 提示文字 */}
      <Text style={styles.instructions}>按下按钮，与朋友分享手机中的图片</Text>
      {/* 分享照片的按钮 */}
      <TouchableOpacity style={styles.button} onPress={openImagePickerAsync}>
        <Text style={styles.buttonText}>选择图片</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
