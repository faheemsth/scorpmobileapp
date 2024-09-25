import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
  ImageBackground,
} from 'react-native';
import CustomComponent from './customComponent';
import {Path, Svg} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {storeFarmData} from '../redux/slices/farmSlice';
import {get} from '../utils/axios';
import CropList from './List';

const FarmSelectionModal = ({
  visible,
  onFarmFieldSelect,
  onFarmNameChange,
  onSubmit,
  onClose,
  dispatch,
  reset,
}) => {
  const [selectedFarmField, setSelectedFarmField] = useState('Farm 1');
  const [selectedCorp, setSelectedCorp] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigation = useNavigation();
  const {farmData} = useSelector(state => state.farm);

  const [cropOptions, setCropOptions] = useState([]);
  console.log('selectedCorp', selectedCorp);

  const getCrops = async () => {
    try {
      const response = await get('/get-crops');
      setCropOptions(
        response?.data?.data?.crops.map(item => {
          return {
            ...item,
            label: item?.name,
            value: item?.id,
            selected: false,
          };
        }),
      );
    } catch (err) {
      console.log('error', err);
    }
  };

  const handleFarmFieldChange = farmField => {
    setSelectedFarmField(farmField);
    onFarmFieldSelect(farmField);
  };

  const handleCropOptionSelect = index => {
    setCropOptions(prevCropOptions => {
      const updatedOptions = [...prevCropOptions]; // Copy the array
      const isSelected = updatedOptions[index].selected;

      updatedOptions[index] = {...updatedOptions[index], selected: !isSelected}; // Toggle selected

      return updatedOptions; // Return the updated array
    });

    setSelectedCorp(prevSelectedCorp => {
      const cropId = cropOptions[index].id;

      if (prevSelectedCorp.includes(cropId)) {
        // If already selected, remove it
        return prevSelectedCorp.filter(id => id !== cropId);
      } else {
        // If not selected, add it
        return [...prevSelectedCorp, cropId];
      }
    });
  };

  const [farmName, setFarmName] = useState('');
  const handleContinue = () => {
    const isAnyCropSelected = cropOptions.some(crop => crop.selected);
    const isFarmNameProvided = !!farmName;
    if (!isFarmNameProvided && !isAnyCropSelected) {
      alert(
        'Please provide a farm name and choose at least one crop before continuing.',
      );
    } else if (!isFarmNameProvided) {
      alert('Please provide a farm name before continuing.');
    } else if (!isAnyCropSelected) {
      alert('Please choose at least one crop before continuing.');
    } else {
      setShowConfirmation(true);

      // navigation.navigate('FarmImageSelection')
    }
  };

  const handleYes = () => {
    // setShowConfirmation(false);
    // onClose()
    console.log('ineeeeeeeeeeeeeeeee');
    onSubmit( farmName, selectedCorp, true);
  };

  const handleNo = () => {
    // setShowConfirmation(false);
    onSubmit( farmName, selectedCorp, false);
    // dispatch(storeFarmData(null))
    // navigation.navigate('FarmImageSelection');
    reset();
  };

  useEffect(() => {
    getCrops();
  }, []);

  return (
    // <Modal
    //     transparent={true}
    //     animationType="slide"
    //     // visible={visible}
    //     // onRequestClose={onClose}
    // >
    <ImageBackground
      source={require('../../assets/images/image145.png')}
      style={styles.imageBackground}
      blurRadius={9}>
      <View style={styles.topContainer}>
        <Text style={styles.modalTitle}>Name for the farm</Text>
        <CustomComponent>
          <TextInput
            style={styles.textInput}
            placeholder="Farm 01"
            onChangeText={text => setFarmName(text)}
            value={farmName}
          />
        </CustomComponent>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.modalContent}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.modalTitle}>Select the Crops of the farm</Text>
          </View>
          <CropList options={cropOptions}  onPress={(_, index)=>handleCropOptionSelect(index)} />
          {/* <FlatList
            data={cropOptions}
            keyExtractor={item => item.value}
            scrollEnabled={true} 
            renderItem={({item, index}) => (
              <>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleCropOptionSelect(index)}>
                  <Text style={styles.cropOptionText}>{item.label}</Text>
                  {item.selected && (
                    <Svg
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <Path
                        d="M16 1.26174L5.02857 12L0 7.0783L1.28914 5.81656L5.02857 9.46756L14.7109 0L16 1.26174Z"
                        fill="black"
                      />
                    </Svg>
                  )}
                </TouchableOpacity>
                {item.label !== 'Sugar' && <View style={styles.whiteLine} />}
              </>
            )}
          /> */}
        </View>
        <View style={{width: '60%'}}>
          <TouchableOpacity
            onPress={handleContinue}
            style={{
              top: 80,
              paddingVertical: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 30,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, color: '#000000', fontWeight: '600'}}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ConfirmationModal
        visible={showConfirmation}
        onYes={handleYes}
        onNo={handleNo}
      />
    </ImageBackground>
    // </Modal>
  );
};
const ConfirmationModal = ({visible, onYes, onNo}) => {
  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => {}}>
      {/* <ImageBackground
                source={require('../../assets/images/image145.png')}
                style={styles.imageBackground}
                blurRadius={10}
            > */}
      <View style={styles.confirmationModalContainer}>
        <View style={styles.confirmationModalContent}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              marginBottom: 10,
              color: '#3D4142',
              paddingHorizontal: 25,
              lineHeight: 24,
            }}>
            Do You Want To Draw The Area Of The Crops In Your Farm?
          </Text>
          <TouchableOpacity style={styles.confirmationOption} onPress={onYes}>
            <Text style={{color: '#1D2324', fontSize: 14}}>Yes</Text>
          </TouchableOpacity>
          <View style={styles.blackLine} />
          <TouchableOpacity style={styles.confirmationOption} onPress={onNo}>
            <Text style={{color: '#1D2324', fontSize: 14}}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ImageBackground> */}
    </Modal>
  );
};
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },

  topContainer: {
    // justifyContent: 'flex-end',
    padding: 30,
    marginTop: 40,
  },

  bottomContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 70,
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 10, // Add padding to top and bottom
    borderRadius: 25,
    // elevation: 5,
    width: '80%',
    // alignItems: 'center',
  },

  whiteLine: {
    height: 1,
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 10, // Adjust as needed for spacing
  },

  modalTitle: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: 10,
    color: '#3D4142',
  },

  textInput: {
    borderColor: '#ccc',
    padding: 5,
    left: 15,
    borderRadius: 5,
    height: 50,
  },
  checkboxContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center', // Align items vertically
    marginVertical: 5,
    paddingRight: 20,
  },
  cropOptionText: {
    flex: 1,
    textAlign: 'center',
    // marginStart:120,
    paddingVertical: 5,
    // textAlignVertical: 'center',
    color: '#1D2324',
  },
  checkbox: {
    width: 20,
    height: 20,
    // marginLeft: 10,
    // justifyContent: 'center',
    alignItems: 'flex-end',
  },

  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  confirmationModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Adjust the alpha value for the overlay color
  },
  confirmationModalContent: {
    backgroundColor: 'white',
    // paddingHorizontal: 10,
    borderRadius: 25,
    paddingVertical: 15,
    lineHeight: 24,

    elevation: 5,
    width: '80%',
    alignItems: 'center',
  },
  confirmationOption: {
    padding: 10,
    width: '90%',
    alignItems: 'center',
  },
  blackLine: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
    marginVertical: 5,
  },
});

export default FarmSelectionModal;
