import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Material from 'react-native-vector-icons/MaterialIcons';
import CustomText from './CustomText';
import {indianStates} from '../utils/data';
import {appColors} from '../utils/appColors';

const DropDown = ({className, selectedOption, setSelectedOption}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View
      className={`bg-gray-200  rounded-xl  items-center justify-center  ${className} `}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomText className=" text-gray-900">
          {selectedOption ? selectedOption : 'State'}
        </CustomText>
        <Material name="arrow-drop-down" size={45} color={appColors.appBlack} />
      </TouchableOpacity>
      {isOpen && (
        <ScrollView
          style={{zIndex: 30, elevation: 5}}
          className="absolute  bg-white left-0 border border-gray-200  right-0 rounded-xl  top-14 h-[11rem] z-30 ">
          <FlatList
            data={indianStates}
            scrollEnabled={false}
            renderItem={({item, index}) => (
              <View key={index} className=" p-2">
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setSelectedOption(item);
                    setIsOpen(!isOpen);
                  }}>
                  <CustomText>{item}</CustomText>
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default DropDown;
