import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../components/CustomText';
import OtpInputs from '../../components/otpInputs';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const OtpScreen = () => {
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [status, setStatus] = useState(false);

  const navigation = useNavigation();
  return (
    <View className=" flex-1  h-full bg-white px-3">
      <CustomText className=" text-gray-900 mt-5">FarmerEats</CustomText>
      <View className=" mt-40">
        <CustomText font="bold" className=" text-4xl text-gray-900">
          Verify OTP
        </CustomText>
        <View className=" flex-row items-center my-6">
          <CustomText>Remember your pasword? </CustomText>
          <TouchableOpacity
            onPress={() => navigation.navigate('login')}
            activeOpacity={0.6}>
            <CustomText className=" text-appRed">Login</CustomText>
          </TouchableOpacity>
        </View>
        <View>
          <OtpInputs
            setPin1={setPin1}
            setPin2={setPin2}
            setPin3={setPin3}
            setPin4={setPin4}
            setPin5={setPin5}
            setOtpStatus={setStatus}
          />
        </View>
        <View className=" mt-12">
          <CustomButton
            title="Send Code"
            style={{paddingVertical: 10}}
            onPress={() => navigation.navigate('reset')}
          />
        </View>
        <View className=" items-center py-6">
          <TouchableOpacity activeOpacity={0.6}>
            <CustomText className=" text-gray-900 underline">
              Resend Code
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtpScreen;
