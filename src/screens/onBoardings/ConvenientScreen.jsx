import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {appColors} from '../../utils/appColors';
import bg from '../../assets/images/cnv.png';
import CustomButton from '../../components/CustomButton';
import {appFonts} from '../../utils/appFonts';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../components/CustomText';

const ConvenientScreen = () => {
  const navigation = useNavigation();
  return (
    <View className=" flex-1 bg-appRed">
      <StatusBar barStyle="dark-content" backgroundColor={appColors?.appRed} />
      <Image source={bg} className=" w-[100%] h-[50%]" />

      <View className=" bg-white absolute left-0 right-0 bottom-0 rounded-t-[50px] overflow-hidden items-center pt-6 px-5">
        <CustomText font="bold" className=" text-gray-900 text-2xl">
          Convenient
        </CustomText>
        <CustomText className=" text-center w-[95%] text-gray-900 mt-7">
          Our team of delivery drivers will make sure your orders are picked up
          on time and promptly delivered to your customers.
        </CustomText>
        <View className=" flex-row my-14">
          {[1, 2, 3]?.map((item, index) => (
            <View
              key={item}
              className={` bg-gray-900 h-2 mx-1  ${
                index === 1 ? ' w-7 rounded-xl' : ' w-2 rounded-full'
              } `}
            />
          ))}
        </View>
        <CustomButton
          title="Join the movement!"
          style={{backgroundColor: appColors?.appRed}}
          onPress={() => navigation?.navigate('local')}
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
const styles = StyleSheet?.create({
  screen: {
    flex: 1,
    backgroundColor: appColors?.appRed,
  },
  bottonSheet: {
    position: 'absolute',
    backgroundColor: appColors?.appWhite,
    bottom: 0,
    left: 0,
    right: 0,
    top: '55%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  heading: {
    fontSize: 24,
    color: appColors.appBlack,
    fontFamily: 'BeVietnamPro-Bold',
  },
});

export default ConvenientScreen;
