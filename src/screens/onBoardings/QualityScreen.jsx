import {View, StatusBar, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {appColors} from '../../utils/appColors';
import bg from '../../assets/images/qlt.png';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../components/CustomText';

const QualityScreen = () => {
  const navigation = useNavigation();
  return (
    <View className=" flex-1 bg-appGreen">
      <StatusBar
        barStyle="dark-content"
        backgroundColor={appColors?.appGreen}
      />
      <Image source={bg} className=" w-[100%] h-[50%]" />

      <View className=" bg-white absolute left-0 right-0 bottom-0 rounded-t-[50px] overflow-hidden items-center pt-6 px-5">
        <CustomText font="bold" className=" text-gray-900 text-2xl">
          Quality
        </CustomText>
        <CustomText className=" text-center w-[95%] text-gray-900 mt-7">
          Sell your farm fresh products directly to consumers, cutting out the
          middleman and reducing emissions of the global supply chain.{' '}
        </CustomText>
        <View className=" flex-row my-14">
          {[1, 2, 3]?.map((item, index) => (
            <View
              key={item}
              className={` bg-gray-900 h-2 mx-1  ${
                index === 0 ? ' w-7 rounded-xl' : ' w-2 rounded-full'
              } `}
            />
          ))}
        </View>
        <CustomButton
          title="Join the movement!"
          style={{backgroundColor: appColors?.appGreen}}
          onPress={() => navigation?.navigate('convenient')}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('login')}
          activeOpacity={0.6}
          style={{marginBottom: '6%', marginTop: '4%'}}>
          <CustomText
            font="semibold"
            className=" text-gray-900 text-lg underline">
            Login
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QualityScreen;
