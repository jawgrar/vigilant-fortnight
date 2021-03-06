import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, SafeAreaView, Button as RNButton } from 'react-native';
import { Title } from 'react-native-paper';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';
import GlobalStyles from '../GlobalStyles';

const auth = Firebase.auth();

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <StatusBar style='dark-content' />
      <Title style={{color: '#000'}}>Create new account</Title>
      <InputField
        // inputStyle={{
        //   fontSize: 14
        // }}
        // containerStyle={{
        //   backgroundColor: '#fff',
        //   marginBottom: 20
        // }}
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <InputField
        // inputStyle={{
        //   fontSize: 14
        // }}
        // containerStyle={{
        //   backgroundColor: '#fff',
        //   marginBottom: 20
        // }}
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        rightIcon={rightIcon}
        value={password}
        onChangeText={text => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      <Button
        onPress={onHandleSignup}
        backgroundColor='#f57c00'
        title='Signup'
        // tileColor='#fff'
        // titleSize={20}
        // containerStyle={{
        //   marginBottom: 24
        // }}
      />
      <RNButton
        onPress={() => navigation.navigate('Login')}
        title='Go to Login'
        // color='#fff'
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#e93b81',
    // paddingTop: 50,
    // paddingHorizontal: 12
  },
  title: {
    // fontSize: 24,
    // fontWeight: '600',
    // color: '#fff',
    // alignSelf: 'center',
    // paddingBottom: 24
  }
});
