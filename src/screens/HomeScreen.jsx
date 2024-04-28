import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="items-center justify-center flex-1 bg-white ">
      <CustomText font="bold" className="text-3xl text-appGreen">
        HomeScreen
      </CustomText>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <CustomText>Logout</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
