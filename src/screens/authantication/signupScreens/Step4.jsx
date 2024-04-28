import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../components/CustomText';
import {businessTimes, daysOfWeek} from '../../../utils/data';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {appColors} from '../../../utils/appColors';
import axios from 'axios';
import {BASE_URL} from '../../../utils/URL';

const Step4 = props => {
  const userDetails = props?.route?.params?.userData;
  const [nclm, setNclm] = useState(2);
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[2]);
  const [activeDays, setActiveDays] = useState(daysOfWeek?.slice(0, 2));
  const [selectedTime, setSelectedTime] = useState([]);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const handleSignup = async () => {
    setLoader(true);
    let business_hours = {
      day: selectedTime,
    };
    let dayname = selectedDay;
    business_hours[dayname] = business_hours['day'];
    const user = {
      ...userDetails,
      ...business_hours,
      device_token: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
      type: 'email/facebook/google/apple',
      social_id: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
    };

    await axios
      .post(`${BASE_URL}/user/register`, user)
      .then(res => {
        console.log(res.data);
        setSelectedDay(daysOfWeek[2]);
        setSelectedTime([]);
        setActiveDays(daysOfWeek?.slice(0, 2));
        setLoader(false);
        navigation.navigate('done');
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };
  return (
    <View className="flex-1 h-full px-3 bg-white ">
      <CustomText className="mt-5 text-gray-900 ">FarmerEats</CustomText>
      <View className="mt-10 ">
        <CustomText className="my-5 text-gray-400 ">Signup 4 of 4</CustomText>
        <CustomText font="bold" className="text-4xl text-gray-900 ">
          Business Hours
        </CustomText>
        <CustomText className="mt-5 text-gray-400 ">
          Choose the hours your farm is open for pickups. This will allow
          customers to order deliveries.
        </CustomText>
        <View className="mt-8 ">
          <FlatList
            data={daysOfWeek}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  setSelectedDay(item);
                  setActiveDays(daysOfWeek?.slice(0, index + 1));
                  console.log(activeDays, 'ksjdyjsy');
                }}
                style={{marginHorizontal: 4.4}}>
                <View
                  className={` p-4 rounded-md ${
                    selectedDay === item
                      ? 'bg-appRed '
                      : `${
                          activeDays.includes(item)
                            ? 'bg-gray-300'
                            : 'bg-white border border-gray-300'
                        }`
                  } `}>
                  <CustomText
                    font="medium"
                    className={`  text-lg  ${
                      selectedDay === item
                        ? 'text-white'
                        : ` ${
                            activeDays.includes(item)
                              ? 'text-gray-700'
                              : ' text-gray-300'
                          }`
                    } `}>
                    {item}
                  </CustomText>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View className="mt-8 ">
          <FlatList
            data={businessTimes}
            numColumns={nclm}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  let arr = [...selectedTime];
                  if (arr?.includes(item)) {
                    return setSelectedTime(
                      arr.filter((p, i) => p?.id !== item?.id && p),
                    );
                  }
                  arr.push(item);
                  setSelectedTime(arr);
                }}
                key={item?.id}
                style={{width: '48%', margin: 5}}>
                <View
                  className={` flex-row items-center justify-center py-5 rounded-lg ${
                    selectedTime.includes(item) ? 'bg-appYellow' : 'bg-gray-300'
                  } `}>
                  <CustomText className="text-gray-900 ">
                    {item.from} - {item?.to}
                  </CustomText>
                </View>
              </TouchableOpacity>
            )}
          />
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
              title="Signup"
              className="py-1 "
              disabled={loader}
              loader={loader}
              onPress={() => handleSignup()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Step4;
