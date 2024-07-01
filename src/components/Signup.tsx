import {View, Text, Alert, TextInput, Pressable} from 'react-native';
import React from 'react';
import axios from 'axios';
import {useFormik} from 'formik';

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async values => {
      try {
        const response = await axios.post(
          'http://10.0.2.2:4000/api/v1/register',
          values,
        );
        console.log('Successful Signup...');
        Alert.alert('Signup Successful', 'User Registered successfully..');
      } catch (error) {
        console.log(error);
        Alert.alert('Signup Failed', 'Error while registering user');
      }
    },
  });

  const handlePress = () => {
    formik.handleSubmit();
  };
  return (
    <View className=" border p-1 rounded-xl">
      <TextInput
        id="name"
        placeholder="Name"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        className=" border-b-2 text-xl font-semibold px-2 "
      />
      <TextInput
        id="email"
        placeholder="Email"
        keyboardType="email-address"
        value={formik.values.email}
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
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

export default Signup;
