import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../components/CustomText';
import google from '../../../assets/images/google.png';
import apple from '../../../assets/images/apple.png';
import facebook from '../../../assets/images/fb.png';
import InputField from '../../../components/InputField';
import IoniCon from 'react-native-vector-icons/Ionicons';
import {appColors} from '../../../utils/appColors';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const Step1 = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [passError, setPassError] = useState(false);

  const handlecontinue = () => {
    if ([fullName, email, phone, password].some((it, ind) => it === '')) {
      console.log('errr');
      return setEmptyError(true);
    }
    if (password !== rePassword) {
      return setPassError(true);
    }
    const basicDetails = {
      full_name: fullName,
      email: email,
      phone: `+91${phone}`,
      password: password,
    };
    navigation.navigate('signup_step2', {
      userBasic_details: basicDetails,
    });

    // console.log(basicDetails, 'kaiu');
  };

  const navigation = useNavigation();
  return (
    <ScrollView className="flex-1 px-3 bg-white ">
      <View>
        <CustomText className="mt-5 text-gray-900 ">FarmerEats</CustomText>
        <View className="">
          <CustomText className="my-5 text-gray-400 ">Signup 1 of 4</CustomText>
          <CustomText font="bold" className="text-4xl text-gray-900 ">
            Welcome!
          </CustomText>
          <View className="flex-row items-center my-5 ">
            <TouchableOpacity activeOpacity={0.6}>
              <View className="items-center w-32 px-5 py-3 border border-gray-300 rounded-full ">
                <Image source={google} className="w-10 h-10 " />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <View className="items-center w-32 px-5 py-3 mx-4 border border-gray-300 rounded-full ">
                <Image source={apple} className="w-10 h-10 " />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <View className="items-center w-32 px-5 py-3 border border-gray-300 rounded-full ">
                <Image source={facebook} className="w-10 h-10 " />
              </View>
            </TouchableOpacity>
          </View>
          <CustomText className="my-3 text-center text-gray-400 underline ">
            or signup with
          </CustomText>
          <View className="mt-1">
            <View className="items-end h-10 py-2 ">
              {emptyError && (
                <CustomText className=" text-[12px] text-red-500">
                  All fields are required!!
                </CustomText>
              )}
            </View>
            <InputField
              onChangeText={t => {
                setFullName(t);
              }}
              onFocus={() => {
                setEmptyError(false);
              }}
              Icon={
                <IoniCon
                  name="person-outline"
                  size={25}
                  color={appColors.appBlack}
                />
              }
              placeholder="Full Name"
              isPassword={false}
            />
            <InputField
              Icon={<IoniCon name="at" size={25} color={appColors.appBlack} />}
              placeholder="Email Address"
              className="mt-5 "
              onChangeText={t => {
                setEmail(t);
              }}
              onFocus={() => {
                setEmptyError(false);
              }}
            />

            <InputField
              Icon={
                <IoniCon
                  name="call-outline"
                  size={25}
                  color={appColors.appBlack}
                />
              }
              onFocus={() => {
                setEmptyError(false);
              }}
              onChangeText={t => {
                setPhone(t);
              }}
              placeholder="Phone Number"
              className="mt-5 "
            />
            <InputField
              Icon={
                <IoniCon
                  name="lock-closed-outline"
                  size={25}
                  color={appColors.appBlack}
                />
              }
              onFocus={() => {
                setEmptyError(false);
                setPassError(false);
              }}
              isPassword={true}
              placeholder="Password"
              className="mt-5"
              onChangeText={t => {
                setPassword(t);
              }}
            />
            <InputField
              Icon={
                <IoniCon
                  name="lock-closed-outline"
                  size={25}
                  color={appColors.appBlack}
                />
              }
              onFocus={() => {
                setEmptyError(false);
                setPassError(false);
              }}
              isPassword={true}
              placeholder="Re-enter Password"
              className="mt-5"
              onChangeText={t => {
                setRePassword(t);
              }}
            />
            <View className="h-10 py-2 ">
              {passError && (
                <CustomText className=" text-[12px] text-red-500">
                  Password does not match
                </CustomText>
              )}
            </View>
            <View className="flex-row items-center justify-between pl-4 mt-8 ">
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('login')}>
                <CustomText
                  font="semibold"
                  className="text-gray-900 underline ">
                  Login
                </CustomText>
              </TouchableOpacity>
              <View className="w-[70%]">
                <CustomButton
                  title="Continue"
                  className="py-1 "
                  onPress={() => handlecontinue()}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Step1;
