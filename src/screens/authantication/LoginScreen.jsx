import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/appColors';
import CustomText from '../../components/CustomText';
import {appFonts} from '../../utils/appFonts';
import InputField from '../../components/InputField';
import google from '../../assets/images/google.png';
import apple from '../../assets/images/apple.png';
import facebook from '../../assets/images/fb.png';
import IoniCon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../../utils/URL';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginButton,
  AccessToken,
  Settings,
  LoginManager,
  Profile,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const handleLogin = async () => {
    setLoader(true);
    const loginDetails = {
      email: email,
      password: password,
      role: 'farmer',
      device_token: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
      type: 'email/facebook/google/apple',
      social_id: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
    };
    await axios
      .post(`${BASE_URL}/user/login`, loginDetails)
      .then(res => {
        console.log(res.data);

        setLoader(false);
        if (!res?.data?.success) {
          Alert.alert(
            'Error ',
            res?.data?.message,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        }
        if (res?.data?.success) {
          setEmail('');
          setPassword('');
          navigation.navigate('home');
        }
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  const handleGoogleLogin = async () => {
    setLoader(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      await GoogleSignin.signIn().then(async result => {
        // console.log(result?.user);
        await axios
          .post(`${BASE_URL}/user/login`, {
            email: result?.user?.email,
            password: '',
            role: 'farmer',
            device_token: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
            type: 'google',
            social_id: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
          })
          .then(res => {
            console.log(res.data);
            setLoader(false);
            if (!res?.data?.success) {
              Alert.alert(
                'Error ',
                res?.data?.message,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            }
            if (res?.data?.success) {
              setEmail('');
              setPassword('');
              navigation.navigate('home');
            }
          })
          .catch(error => {
            console.log(error);
            setLoader(false);
          });
      });
    } catch (error) {
      setLoader(false);
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('User cancelled the login flow !');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Google play services not available or outdated !');
        // play services not available or outdated
      } else {
        console.log(error);
      }
    }
  };

  const handleFacebookLogin = async () => {
    setLoader(true);
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        setLoader(false);
        console.log('Login cancelled');
      } else {
        const accessToken = await AccessToken.getCurrentAccessToken();
        if (accessToken) {
          //console.log('Logged in successfully!', accessToken);
          const requestParams = {
            accessToken: accessToken.accessToken,
            parameters: {
              fields: {
                string:
                  'id,name,email,first_name,last_name,picture.type(large)',
              },
            },
          };

          const fetchRequest = new GraphRequest(
            '/me',
            requestParams,
            async (error, result) => {
              if (error) {
                setLoader(false);
                console.log('Error fetching email:', error);
              } else {
                console.log(result, 'fb res');
                await axios
                  .post(`${BASE_URL}/user/login`, {
                    email: result?.email,
                    password: '',
                    role: 'farmer',
                    device_token: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
                    type: 'facebook',
                    social_id: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
                  })
                  .then(res => {
                    console.log(res.data);
                    setLoader(false);
                    if (!res?.data?.success) {
                      Alert.alert(
                        'Error ',
                        res?.data?.message,
                        [
                          {
                            text: 'Cancel',

                            style: 'cancel',
                          },
                          {text: 'OK'},
                        ],
                        {cancelable: false},
                      );
                    }
                    if (res?.data?.success) {
                      setEmail('');
                      setPassword('');
                      navigation.navigate('home');
                    }
                  })
                  .catch(error => {
                    console.log(error);
                    setLoader(false);
                  });
              }
            },
          );

          new GraphRequestManager().addRequest(fetchRequest).start();

          // Navigate to the next screen or perform any other action
        } else {
          setLoader(false);
          console.log('Failed to get access token');
        }
      }
    } catch (error) {
      setLoader(false);
      console.log('Error occurred while logging in:', error);
    }
  };

  useEffect(() => {
    Settings.setAppID('742274741030237');
    Settings.initializeSDK();
    let cfg = GoogleSignin.configure({
      webClientId:
        '878129512651-vseg43r8rmuequ1mrfke0a8147hvfqe5.apps.googleusercontent.com',
      iosClientId:'878129512651-vseg43r8rmuequ1mrfke0a8147hvfqe5.apps.googleusercontent.com',
      offlineAccess: true,
    });
    return () => {
      cfg;
    };
  }, []);

  return (
    <View className="flex-1 px-3 bg-white ">
      <StatusBar barStyle="dark-content" backgroundColor={appColors.appWhite} />
      <CustomText className="mt-5 text-gray-900 ">FarmerEats</CustomText>
      <View className="mt-20 ">
        <CustomText font="bold" className="text-4xl text-gray-900 ">
          Welcome back!
        </CustomText>
        <View className="flex-row items-center my-6 ">
          <CustomText>New here?</CustomText>
          <TouchableOpacity
            onPress={() => navigation.navigate('signup_step1')}
            activeOpacity={0.6}>
            <CustomText className=" text-appRed"> Create account</CustomText>
          </TouchableOpacity>
        </View>
        <View className="mt-10">
          <InputField
            onChangeText={t => setEmail(t)}
            value={email}
            Icon={<IoniCon name="at" size={25} color={appColors.appBlack} />}
            placeholder="Email Address"
          />
          <View>
            <InputField
              value={password}
              onChangeText={t => setPassword(t)}
              Icon={
                <IoniCon
                  name="lock-closed-outline"
                  size={25}
                  color={appColors.appBlack}
                />
              }
              isPassword={true}
              placeholder="Password"
              className="mt-8"
            />

            <View className="items-end py-1 ">
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('forget')}>
                <CustomText font="semibold" className=" text-appRed">
                  Forget Password
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <CustomButton
          title="Login"
          style={{marginTop: '10%'}}
          onPress={() => handleLogin()}
          loader={loader}
        />
        <CustomText className="my-10 text-center text-gray-400 underline ">
          or login with
        </CustomText>
        <View className="flex-row items-center ">
          <TouchableOpacity
            onPress={() => handleGoogleLogin()}
            activeOpacity={0.6}>
            <View className="items-center w-32 px-5 py-3 border border-gray-300 rounded-full ">
              <Image source={google} className="w-10 h-10 " />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <View className="items-center w-32 px-5 py-3 mx-4 border border-gray-300 rounded-full ">
              <Image source={apple} className="w-10 h-10 " />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFacebookLogin()}
            activeOpacity={0.6}>
            <View className="items-center w-32 px-5 py-3 border border-gray-300 rounded-full ">
              <Image source={facebook} className="w-10 h-10 " />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet?.create({
  screen: {
    flex: 1,
    backgroundColor: appColors?.appWhite,
    paddingHorizontal: '4%',
  },
  container: {
    paddingTop: '15%',
  },
  heading: {
    fontSize: 35,
    color: appColors.appBlack,
    fontFamily: appFonts.ExtraBold,
  },
});

export default LoginScreen;
