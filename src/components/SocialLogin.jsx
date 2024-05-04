import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
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
} from 'react-native-fbsdk-next';

const App = () => {
  //SH1 Key - 5B:EC:E4:82:02:7D:77:F1:BA:67:0B:F5:C5:F0:A0:04:F0:D5:E9:48
  //Pz9rcBE/Pz9zfj8/Pz8/Pz9XPz8=
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

  const GoogleSingUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(result => {
        console.log(result);
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

  const handleLogin = async () => {
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

          Profile.getCurrentProfile().then(function (currentProfile) {
            if (currentProfile) {
              console.log(currentProfile, 'user');
              console.log(
                'The current logged user is: ' +
                  currentProfile.name +
                  '. His profile id is: ' +
                  currentProfile.userID,
              );
            }
          });

          // Navigate to the next screen or perform any other action
        } else {
          console.log('Failed to get access token');
        }
      }
    } catch (error) {
      console.log('Error occurred while logging in:', error);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={GoogleSingUp} title="Google Login" />
      <Button onPress={handleLogin} title="FaceBook Login" />
      {/* <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      /> */}
    </View>
  );
};

export default App;
