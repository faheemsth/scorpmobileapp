import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {postForm, putForm} from '../utils/axios';
import {useDispatch, useSelector} from 'react-redux';
import {storeFarmData} from '../redux/slices/farmSlice';

const FarmImageSelection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const farmImages = [
    require('../../assets/images/image168.png'),
    require('../../assets/images/image180.png'),
    require('../../assets/images/image169.png'),
    require('../../assets/images/image171.png'),
    require('../../assets/images/image176.png'),
    require('../../assets/images/Ellipse3960.png'),
    require('../../assets/images/image175.png'),
    require('../../assets/images/image174.png'),
    require('../../assets/images/image177.png'),
    // Add more image paths as needed
  ];

  const [image, setImage] = useState(null);
  const {farmData} = useSelector(state => state.farm);
  console.log('farmData=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', farmData);
  const handleImageUpload = async () => {
    console.log('DDDDDDDDDDDDDDDD',image)
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        type: 'image/jpeg', // adjust the type according to your image type
        name: 'farmImage.jpg', // adjust the name accordingly
      });
      // Make a POST request with Axios
      console.log('farmData?.id', farmData?.id);
      const response = await putForm(`add-farm-pic/${farmData?.id}`, formData);

      console.log(response.data); // Handle response
      if (response.data.success) {
        dispatch(storeFarmData(null));
        // navigation.navigate('bottom_navigation', {});
        navigation.replace('bottom_navigation');
      }
    } catch (error) {
      navigation.replace('bottom_navigation');
      console.error('Error uploading image:', error);
    }
  };
  // http://localhost:8081/assets/assets/images/image180.png?platform=android&hash=165d0ce39236307d2e6ce97c542253d6
  const renderFarmImages = () => {
    return farmImages.map((farmImage, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setImage(Image.resolveAssetSource(farmImage).uri);
          handleImageSelection(farmImage);
        }}
        style={[
          styles.imageContainer,
          selectedImage === farmImage && styles.selectedImage,
          {marginLeft: index % 3 === 0 ? 0 : 10}, // Adjust marginLeft for every 3rd image
        ]}>
        <Image source={farmImage} style={styles.image} />
      </TouchableOpacity>
    ));
  };
  const handleImageSelection = selectedFarmImage => {
    setSelectedImage(selectedFarmImage);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/image1451.png')}
        style={styles.backgroundImage}
        blurRadius={12}>
        <View style={styles.overlay}>
          <View style={styles.selectionContainer}>
            <TouchableOpacity
              onPress={() => console.log('Circular image selected')}>
              <Image
                source={
                  selectedImage
                    ? selectedImage
                    : require('../../assets/images/Ellipse3950.png')
                }
                style={[
                  styles.circularImage,
                  selectedImage && styles.selectedCircularImage,
                ]}
              />
            </TouchableOpacity>
            <View style={{paddingHorizontal: 60, alignItems: 'center'}}>
              <Text style={styles.text}>{farmData?.farmName || ''}</Text>
              <Text style={styles.subText}>
                Select A Picture For The Farm From The Following
              </Text>
            </View>
          </View>

          <View style={styles.imagesGrid}>{renderFarmImages()}</View>

          {selectedImage && (
            <View style={{width: '60%'}}>
              <TouchableOpacity
                onPress={handleImageUpload}
                style={{
                  paddingVertical: 12,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 30,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    lineHeight: 27,
                    color: '#000000',
                    fontWeight: '600',
                  }}>
                  Finish
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    // backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust opacity as needed
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionContainer: {
    alignItems: 'center',
    bottom: 10,
  },
  circularImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    // borderColor: 'white',
  },
  selectedCircularImage: {
    // borderColor: 'black', // Change the border color for the selected image
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 10,
    lineHeight: 27,
    color: '#000000',
  },
  subText: {
    fontSize: 18,
    marginTop: 5,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 27,
    color: '#1D2324',
    // marginHorizontal:50,
  },

  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Use space-between to arrange images in 3 rows
    marginHorizontal: 15,
    marginVertical: 10,
  },
  imageContainer: {
    overflow: 'hidden',
    marginVertical: 10,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 58,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  finishButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginTop: 20,
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default FarmImageSelection;
