import {View, Text} from 'react-native';
import React from 'react';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {appColors} from '../../../utils/appColors';
import {useNavigation} from '@react-navigation/native';

const Done = () => {
  const navigation = useNavigation();
  setTimeout(() => {
    navigation.navigate('login');
  }, 2000);
  return (
    <View className=" flex-1 bg-white items-center pt-[50%] px-7">
      <Icon name="checkmark-done-sharp" size={100} color={appColors.appGreen} />

      <CustomText font="bold" className="mt-10 text-4xl text-gray-900 ">
        You’re all done!
      </CustomText>
      <CustomText className="mt-2 text-center text-gray-400 ">
        Hang tight! We are currently reviewing your account and will follow up
        with you in 2-3 business days. In the meantime, you can setup your
        inventory.
      </CustomText>

      <View className="absolute left-0 right-0 px-3 bottom-5">
        <CustomButton
          title="Got it!"
          className="py-0 "
          onPress={() => navigation.navigate('done')}
        />
      </View>
    </View>
  );
};

export default Done;
