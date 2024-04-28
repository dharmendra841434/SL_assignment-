import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import IoniCon from 'react-native-vector-icons/Ionicons';
import InputField from '../../components/InputField';
import {appColors} from '../../utils/appColors';
import CustomButton from '../../components/CustomButton';

const ResetPassword = () => {
  return (
    <View className=" flex-1  h-full bg-white px-3">
      <CustomText className=" text-gray-900 mt-5">FarmerEats</CustomText>
      <View className=" mt-32">
        <CustomText font="bold" className=" text-4xl text-gray-900">
          Reset Password
        </CustomText>
        <View className=" flex-row items-center my-6">
          <CustomText>Remember your pasword? </CustomText>
          <TouchableOpacity
            onPress={() => navigation.navigate('login')}
            activeOpacity={0.6}>
            <CustomText className=" text-appRed">Login</CustomText>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <InputField
          Icon={
            <IoniCon
              name="lock-closed-outline"
              size={25}
              color={appColors.appBlack}
            />
          }
          isPassword={true}
          placeholder="Password"
          className="mt-5"
        />
        <InputField
          Icon={
            <IoniCon
              name="lock-closed-outline"
              size={25}
              color={appColors.appBlack}
            />
          }
          isPassword={true}
          placeholder="Re-enter Password"
          className="mt-5"
        />

        <View className=" mt-20">
          <CustomButton
            title="Submit"
            style={{paddingVertical: 10}}
            onPress={() => navigation.navigate('reset')}
          />
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;
