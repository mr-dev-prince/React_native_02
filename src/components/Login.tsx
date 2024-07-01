import {View, Text, Alert, TextInput, Pressable} from 'react-native';
import React from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      try {
        const response = await axios.post(
          'http://10.0.2.2:4000/api/v1/login',
          values,
        );
        const {accessToken, refreshToken} = response?.data?.data;

        await AsyncStorage.setItem('access-token', accessToken);
        await AsyncStorage.setItem('refresh-token', refreshToken);

        console.log('Successful Login...');
        Alert.alert('Login Successful', 'User logged-in successfully..');
      } catch (error) {
        console.log(error);
        Alert.alert('Login Failed', 'Error while logging in user');
      }
    },
  });

  const handlePress = () => {
    formik.handleSubmit();
  };
  return (
    <View className=" border p-1 rounded-xl mt-4">
      <TextInput
        id="email"
        placeholder="Email"
        value={formik.values.email}
        keyboardType="email-address"
        onChangeText={formik.handleChange('email')}
        className=" border-b-2 text-xl font-semibold px-2 "
      />
      <TextInput
        id="password"
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
        textContentType="password"
        className=" border-b-2 text-xl font-semibold px-2 "
      />
      <Pressable onPress={handlePress} className=" mt-4">
        <Text className="text-center font-bold text-white text-xl bg-sky-400 p-2 rounded-xl">
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;
