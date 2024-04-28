import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {appColors} from '../utils/appColors';
import {appFonts} from '../utils/appFonts';

const CustomButton = ({style, title, onPress, disabled, loader}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      style={[{...styles?.conatiner, ...style}]}>
      {loader ? (
        <ActivityIndicator color={appColors.appWhite} size={25} />
      ) : (
        <Text style={styles?.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet?.create({
  conatiner: {
    backgroundColor: appColors?.appRed,
    paddingHorizontal: '5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 15,
  },
  title: {
    color: appColors?.appWhite,
    fontFamily: appFonts.medium,
    fontSize: 18,
  },
});

export default CustomButton;
