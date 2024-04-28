import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../../../components/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import {appColors} from '../../../utils/appColors';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const Step3 = props => {
  const userBasicDetails = props?.route?.params?.userdetail;
  //console.log(userBasicDetails);
  const navigation = useNavigation();
  const handleNext = () => {
    const userData = {
      ...userBasicDetails,
      registration_proof: 'my_proof.pdf',
    };
    navigation.navigate('signup_step4', {
      userData: userData,
    });
  };

  return (
    <View className="flex-1 h-full px-3 bg-white ">
      <View className="mt-10 ">
        <CustomText className="mt-5 text-gray-900 ">FarmerEats</CustomText>
        <CustomText className="my-5 text-gray-400 ">Signup 3 of 4</CustomText>
        <CustomText font="bold" className="text-4xl text-gray-900 ">
          Verification
        </CustomText>
        <CustomText className="mt-5 text-gray-400 ">
          Attached proof of Department of Agriculture registrations i.e. Florida
          Fresh, USDA Approved, USDA Organic
        </CustomText>
        <View className="flex-row items-center justify-between mt-10 ">
          <CustomText className="text-gray-900 ">
            Attach proof of registration
          </CustomText>
          <TouchableOpacity activeOpacity={0.6}>
            <View className="p-2 rounded-full bg-appRed">
              <Icon
                name="camera-outline"
                size={30}
                color={appColors.appWhite}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between px-3 py-3 mt-20 bg-gray-300 rounded-lg">
          <CustomText className="text-gray-900 ">
            usda_registration.pdf
          </CustomText>
          <TouchableOpacity>
            <Icon name="close-outline" size={25} color={appColors.appBlack} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="absolute left-0 right-0 px-3 bottom-5">
        <View className="flex-row items-center justify-between mt-48 ">
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}>
            <Icon2
              name="arrow-top-left-thin"
              size={45}
              style={{transform: [{rotate: '-45deg'}]}}
              color={appColors.appBlack}
            />
          </TouchableOpacity>
          <View className="w-[70%]">
            <CustomButton
              title="Continue"
              className="py-1 "
              onPress={() => handleNext()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Step3;
