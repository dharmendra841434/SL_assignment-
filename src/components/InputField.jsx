import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {appFonts} from '../utils/appFonts';
import {appColors} from '../utils/appColors';
import IoniCon from 'react-native-vector-icons/Ionicons';

const InputField = ({Icon, placeholder, className, isPassword, ...rest}) => {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <View
      className={` bg-gray-200 rounded-xl pl-2 flex-row items-center ${className} `}>
      <View>{Icon}</View>
      <TextInput
        placeholder={placeholder}
        style={{fontFamily: appFonts?.Regular}}
        placeholderTextColor={appColors.appGray}
        cursorColor={appColors.appBlack}
        className="w-full pl-2 "
        secureTextEntry={isPassword ? isSecure : false}
        {...rest}
      />
      {isPassword && (
        <View className="absolute right-3">
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setIsSecure(!isSecure)}>
            {isSecure ? (
              <IoniCon
                name="eye-off-outline"
                size={22}
                color={appColors?.appBlack}
              />
            ) : (
              <IoniCon
                name="eye-outline"
                size={22}
                color={appColors?.appBlack}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default InputField;
