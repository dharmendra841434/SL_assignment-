import {View, TextInput, StyleSheet} from 'react-native';
import React, {useState, useRef} from 'react';
import {appColors} from '../../utils/appColors';

const OtpInputs = ({
  setPin1,
  setPin2,
  setPin3,
  setPin4,
  setPin5,
  setPin6,
  setOtpStatus,
}) => {
  const [pin1Status, setPin1Status] = useState(false);
  const [pin2Status, setPin2Status] = useState(false);
  const [pin3Status, setPin3Status] = useState(false);
  const [pin4Status, setPin4Status] = useState(false);
  const [pin5Status, setPin5Status] = useState(false);
  const pin1Ref = useRef();
  const pin2Ref = useRef();
  const pin3Ref = useRef();
  const pin4Ref = useRef();
  const pin5Ref = useRef();

  return (
    <View style={Styles.Container}>
      <TextInput
        maxLength={1}
        ref={pin1Ref}
        autoFocus={true}
        cursorColor={appColors.appBlack}
        keyboardType="number-pad"
        onFocus={() => setPin1Status(true)}
        onBlur={() => setPin1Status(false)}
        style={[Styles.input]}
        className={` ${pin1Status ? ' bg-appYellow' : 'bg-gray-300'} `}
        onChangeText={p1 => {
          setPin1(p1);
          setOtpStatus('');
          if (p1 !== '') {
            pin2Ref.current.focus();
          }
        }}
      />
      <TextInput
        style={[Styles.input]}
        className={` ${pin2Status ? ' bg-appYellow' : 'bg-gray-300'} `}
        maxLength={1}
        ref={pin2Ref}
        cursorColor={appColors.appBlack}
        onFocus={() => setPin2Status(true)}
        onBlur={() => setPin2Status(false)}
        keyboardType="number-pad"
        onChangeText={p2 => {
          setPin2(p2);
          setOtpStatus('');
          if (p2 !== '') {
            pin3Ref.current.focus();
          }
        }}
        onKeyPress={function (e) {
          if (e.nativeEvent.key === 'Backspace') {
            pin1Ref.current.focus();
          }
        }}
      />
      <TextInput
        style={[Styles.input]}
        className={` ${pin3Status ? ' bg-appYellow' : 'bg-gray-300'} `}
        maxLength={1}
        ref={pin3Ref}
        cursorColor={appColors.appBlack}
        onFocus={() => setPin3Status(true)}
        onBlur={() => setPin3Status(false)}
        keyboardType="number-pad"
        onChangeText={p3 => {
          setPin3(p3);
          setOtpStatus('');
          if (p3 !== '') {
            pin4Ref.current.focus();
          }
        }}
        onKeyPress={function (e) {
          if (e.nativeEvent.key === 'Backspace') {
            pin2Ref.current.focus();
          }
        }}
      />
      <TextInput
        style={[Styles.input]}
        className={` ${pin4Status ? ' bg-appYellow ' : 'bg-gray-300'} `}
        maxLength={1}
        ref={pin4Ref}
        cursorColor={appColors.appBlack}
        onFocus={() => setPin4Status(true)}
        onBlur={() => setPin4Status(false)}
        keyboardType="number-pad"
        onChangeText={p4 => {
          setPin4(p4);
          setOtpStatus('');
          if (p4 !== '') {
            pin5Ref.current.focus();
          }
        }}
        onKeyPress={function (e) {
          if (e.nativeEvent.key === 'Backspace') {
            pin3Ref.current.focus();
          }
        }}
      />
      <TextInput
        style={[Styles.input]}
        className={` ${pin5Status ? ' bg-appYellow ' : 'bg-gray-300'} `}
        maxLength={1}
        ref={pin5Ref}
        cursorColor={appColors.appBlack}
        onFocus={() => setPin5Status(true)}
        onBlur={() => setPin5Status(false)}
        keyboardType="number-pad"
        onChangeText={p5 => {
          setPin5(p5);
          setOtpStatus('');
        }}
        onKeyPress={function (e) {
          if (e.nativeEvent.key === 'Backspace') {
            pin4Ref.current.focus();
          }
        }}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '8%',
  },
  input: {
    borderRadius: 5,
    width: '18%',
    paddingVertical: 6,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default OtpInputs;
