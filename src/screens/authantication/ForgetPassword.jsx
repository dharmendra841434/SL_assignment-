import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import IoniCon from 'react-native-vector-icons/Ionicons';
import {appColors} from '../../utils/appColors';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';

const ForgetPassword = () => {
  const navigation = useNavigation();
  return (
    <View className=" flex-1  h-full bg-white px-3">
      <CustomText className=" text-gray-900 mt-5">FarmerEats</CustomText>
      <View className=" mt-40">
        <CustomText font="bold" className=" text-4xl text-gray-900">
          Forgot Password?
        </CustomText>
        <View className=" flex-row items-center my-6">
          <CustomText>Remember your pasword? </CustomText>
          <TouchableOpacity
            onPress={() => navigation.navigate('login')}
            activeOpacity={0.6}>
            <CustomText className=" text-appRed">Login</CustomText>
          </TouchableOpacity>
        </View>
        <InputField
          Icon={
            <IoniCon name="call-outline" size={25} color={appColors.appBlack} />
          }
          placeholder="Phone Number"
          className=" mt-5"
        />

        <View className=" mt-12">
          <CustomButton
            title="Send Code"
            style={{paddingVertical: 10}}
            onPress={() => navigation.navigate('otp')}
          />
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;
