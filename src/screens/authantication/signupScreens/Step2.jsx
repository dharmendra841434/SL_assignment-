import {View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../components/CustomText';
import InputField from '../../../components/InputField';
import IoniCon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {appColors} from '../../../utils/appColors';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import DropDown from '../../../components/DropDown';

const Step2 = props => {
  const userBasicDetails = props?.route?.params?.userBasic_details;
  const [businessName, setBusinessName] = useState('');
  const [informalName, setInformalName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const navigation = useNavigation();

  const handleNext = () => {
    if (
      [businessName, informalName, address, city, selectedState, zipcode].some(
        (it, ind) => it === '',
      )
    ) {
      return setEmptyError(true);
    }
    const details = {
      ...userBasicDetails,
      role: 'farmer',
      business_name: businessName,
      informal_name: informalName,
      address: address,
      city: city,
      state: selectedState,
      zip_code: Number(zipcode),
    };
    navigation.navigate('signup_step3', {
      userdetail: details,
    });
    //console.log(details);
  };

  return (
    <ScrollView className="flex-1 h-full px-3 bg-white ">
      <View className="flex-1 h-full ">
        <CustomText className="mt-5 text-gray-900 ">FarmerEats</CustomText>
        <View className="mt-10 ">
          <CustomText className="my-5 text-gray-400 ">Signup 2 of 4</CustomText>
          <CustomText font="bold" className="text-4xl text-gray-900 ">
            Farm Info
          </CustomText>

          <View className="mt-10">
            <View className="items-end h-10 py-2 ">
              {emptyError && (
                <CustomText className=" text-[12px] text-red-500">
                  All fields are required!!
                </CustomText>
              )}
            </View>
            <InputField
              onFocus={() => {
                setEmptyError(false);
              }}
              onChangeText={t => {
                setBusinessName(t);
              }}
              Icon={
                <IoniCon
                  name="pricetag-outline"
                  size={25}
                  color={appColors.appBlack}
                />
              }
              placeholder="Business Name"
            />
            <InputField
              onFocus={() => {
                setEmptyError(false);
              }}
              onChangeText={t => {
                setInformalName(t);
              }}
              Icon={
                <IoniCon
                  name="happy-outline"
                  size={25}
                  color={appColors.appBlack}
                />
              }
              placeholder="Informal Name"
              className="mt-5 "
            />

            <InputField
              onFocus={() => {
                setEmptyError(false);
              }}
              onChangeText={t => {
                setAddress(t);
              }}
              Icon={
                <Octicons name="home" size={25} color={appColors.appBlack} />
              }
              placeholder="Street Address"
              className="mt-5 "
            />
            <InputField
              onFocus={() => {
                setEmptyError(false);
              }}
              onChangeText={t => {
                setCity(t);
              }}
              Icon={
                <IoniCon
                  name="location-outline"
                  size={25}
                  color={appColors.appBlack}
                />
              }
              placeholder="City"
              className="mt-5"
            />
            <View className="flex-row justify-between mt-5">
              <DropDown
                selectedOption={selectedState}
                setSelectedOption={setSelectedState}
                className="w-[40%]"
              />
              <InputField
                onFocus={() => {
                  setEmptyError(false);
                }}
                onChangeText={t => {
                  setZipcode(t);
                }}
                placeholder="Enter Zipcode"
                className=" w-[58%]"
              />
            </View>
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-between mt-40 ">
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}>
          <Icon
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
    </ScrollView>
  );
};

export default Step2;
