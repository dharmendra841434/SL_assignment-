import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QualityScreen from '../screens/onBoardings/QualityScreen';
import ConvenientScreen from '../screens/onBoardings/ConvenientScreen';
import LocalScreen from '../screens/onBoardings/LocalScreen';
import LoginScreen from '../screens/authantication/LoginScreen';
import Step1 from '../screens/authantication/signupScreens/Step1';
import Step2 from '../screens/authantication/signupScreens/Step2';
import Step3 from '../screens/authantication/signupScreens/Step3';
import Step4 from '../screens/authantication/signupScreens/Step4';
import Done from '../screens/authantication/signupScreens/Done';
import ForgetPassword from '../screens/authantication/ForgetPassword';
import OtpScreen from '../screens/authantication/OtpScreen';
import ResetPassword from '../screens/authantication/ResetPassword';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="first">
        <Stack.Screen name="first" component={QualityScreen} />
        <Stack.Screen name="local" component={LocalScreen} />
        <Stack.Screen name="convenient" component={ConvenientScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup_step1" component={Step1} />
        <Stack.Screen name="signup_step2" component={Step2} />
        <Stack.Screen name="signup_step3" component={Step3} />
        <Stack.Screen name="signup_step4" component={Step4} />
        <Stack.Screen name="forget" component={ForgetPassword} />
        <Stack.Screen name="otp" component={OtpScreen} />
        <Stack.Screen name="done" component={Done} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="reset" component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
