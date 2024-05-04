import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../../../components/CustomText';
import google from '../../../assets/images/google.png';
import apple from '../../../assets/images/apple.png';
import facebook from '../../../assets/images/fb.png';
import InputField from '../../../components/InputField';
import IoniCon from 'react-native-vector-icons/Ionicons';
import {appColors} from '../../../utils/appColors';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
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
import axios from 'axios';
import {BASE_URL} from '../../../utils/URL';

const Step1 = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [passError, setPassError] = useState(false);

  const handlecontinue = () => {
    if ([fullName, email, phone, password].some((it, ind) => it === '')) {
      console.log('errr');
      return setEmptyError(true);
    }
    if (password !== rePassword) {
      return setPassError(true);
    }
    const basicDetails = {
      full_name: fullName,
      email: email,
      phone: `+91${phone}`,
      password: password,
    };
    navigation.navigate('signup_step2', {
      userBasic_details: basicDetails,
    });

    // console.log(basicDetails, 'kaiu');
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(async result => {
        // console.log(result?.user);
        const userdata = {
          full_name: result?.user?.email,
          email: result?.user?.email,
          phone: '+19876543210',
          password: '',
          role: 'farmer',
          business_name: 'Dairy Farm',
          informal_name: 'London Dairy',
          address: '3663 Marshville Road',
          city: 'Poughkeepsie',
          state: 'New York',
          zip_code: 12601,
          registration_proof: 'my_proof.pdf',
          business_hours: {},
          device_token: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
          type: 'google',
          social_id: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
        };
        await axios
          .post(`${BASE_URL}/user/register`, userdata)
          .then(res => {
            console.log(res.data);

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
              navigation.navigate('done');
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    } catch (error) {
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
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
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
                console.log('Error fetching email:', error);
              } else {
                console.log(result, 'fb res');
                const userdata = {
                  full_name: result?.name,
                  email: result?.email,
                  phone: '+19876543210',
                  password: '',
                  role: 'farmer',
                  business_name: 'Dairy Farm',
                  informal_name: 'London Dairy',
                  address: '3663 Marshville Road',
                  city: 'Poughkeepsie',
                  state: 'New York',
                  zip_code: 12601,
                  registration_proof: 'my_proof.pdf',
                  business_hours: {},
                  device_token: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
                  type: 'facebook',
                  social_id: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
                };
                await axios
                  .post(`${BASE_URL}/user/register`, userdata)
                  .then(res => {
                    console.log(res.data);

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
                      navigation.navigate('done');
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
            },
          );

          new GraphRequestManager().addRequest(fetchRequest).start();

          // Navigate to the next screen or perform any other action
        } else {
          console.log('Failed to get access token');
        }
      }
    } catch (error) {
      console.log('Error occurred while logging in:', error);
    }
  };

  useEffect(() => {
    Settings.setAppID('742274741030237');
    Settings.initializeSDK();
    let cfg = GoogleSignin.configure({
      webClientId:
        '878129512651-vseg43r8rmuequ1mrfke0a8147hvfqe5.apps.googleusercontent.com',
      offlineAccess: true,
    });

    return () => {
      cfg;
    };
  }, []);

  const navigation = useNavigation();
  return (
    <ScrollView className="flex-1 px-3 bg-white ">
      <View>
        <CustomText className="mt-5 text-gray-900 ">FarmerEats</CustomText>
        <View className="">
          <CustomText className="my-5 text-gray-400 ">Signup 1 of 4</CustomText>
          <CustomText font="bold" className="text-4xl text-gray-900 ">
            Welcome!
          </CustomText>
          <View className="flex-row items-center my-5 ">
            <TouchableOpacity onPress={handleGoogleLogin} activeOpacity={0.6}>
              <View className="items-center w-32 px-5 py-3 border border-gray-300 rounded-full ">
                <Image source={google} className="w-10 h-10 " />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <View className="items-center w-32 px-5 py-3 mx-4 border border-gray-300 rounded-full ">
                <Image source={apple} className="w-10 h-10 " />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFacebookLogin} activeOpacity={0.6}>
              <View className="items-center w-32 px-5 py-3 border border-gray-300 rounded-full ">
                <Image source={facebook} className="w-10 h-10 " />
              </View>
            </TouchableOpacity>
          </View>
          <CustomText className="my-3 text-center text-gray-400 underline ">
            or signup with
          </CustomText>
          <View className="mt-1">
            <View className="items-end h-10 py-2 ">
              {emptyError && (
                <CustomText className=" text-[12px] text-red-500">
                  All fields are required!!
                </CustomText>
              )}
            </View>
            <InputField
              onChangeText={t => {
                setFullName(t);
              }}
              onFocus={() => {
                setEmptyError(false);
              }}
              Icon={
                <IoniCon
                  name="person-outline"
                  size={25}
                  color={appColors.appBlack}
                />
              }
              placeholder="Full Name"
              isPassword={false}
            />
            <InputField
              Icon={<IoniCon name="at" size={25} color={appColors.appBlack} />}
              placeholder="Email Address"
              className="mt-5 "
              onChangeText={t => {
                setEmail(t);
              }}
              onFocus={() => {
                setEmptyError(false);
              }}
            />

            <InputField
              Icon={
                <IoniCon
                  name="call-outline"
                  size={25}
                  color={appColors.appBlack}
                />
              }
              onFocus={() => {
                setEmptyError(false);
              }}
              onChangeText={t => {
                setPhone(t);
              }}
              placeholder="Phone Number"
              className="mt-5 "
            />
            <InputField
              Icon={
                <IoniCon
                  name="lock-closed-outline"
                  size={25}
                  color={appColors.appBlack}
                />
              }
              onFocus={() => {
                setEmptyError(false);
                setPassError(false);
              }}
              isPassword={true}
              placeholder="Password"
              className="mt-5"
              onChangeText={t => {
                setPassword(t);
              }}
            />
            <InputField
              Icon={
                <IoniCon
                  name="lock-closed-outline"
                  size={25}
                  color={appColors.appBlack}
                />
              }
              onFocus={() => {
                setEmptyError(false);
                setPassError(false);
              }}
              isPassword={true}
              placeholder="Re-enter Password"
              className="mt-5"
              onChangeText={t => {
                setRePassword(t);
              }}
            />
            <View className="h-10 py-2 ">
              {passError && (
                <CustomText className=" text-[12px] text-red-500">
                  Password does not match
                </CustomText>
              )}
            </View>
            <View className="flex-row items-center justify-between pl-4 mt-8 ">
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('login')}>
                <CustomText
                  font="semibold"
                  className="text-gray-900 underline ">
                  Login
                </CustomText>
              </TouchableOpacity>
              <View className="w-[70%]">
                <CustomButton
                  title="Continue"
                  className="py-1 "
                  onPress={() => handlecontinue()}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Step1;
