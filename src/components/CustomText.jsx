import React from 'react';
import {Text} from 'react-native';
import {appFonts} from '../utils/appFonts';

const CustomText = ({font, ...rest}) => {
  let fontFamily;
  switch (font) {
    case 'bold':
      fontFamily = appFonts.Bold;
      break;
    case 'extraBold':
      fontFamily = appFonts.ExtraBold;
      break;
    case 'medium':
      fontFamily = appFonts.Medium;
      break;
    case 'semibold':
      fontFamily = appFonts.Semibold;
      break;
    default:
      fontFamily = appFonts.Regular;
  }
  return <Text style={[{fontFamily: fontFamily}]} {...rest} />;
};

export default CustomText;
