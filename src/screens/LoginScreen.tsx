import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    if (!email || !password) {
      Alert.alert('Missing Details', 'Please enter email and password.');
      return;
    }

    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>✓</Text>
      </View>

      <Text style={styles.title}>TaskFlow</Text>

      <Text style={styles.subtitle}>
        Organize your day. Achieve more.
      </Text>

      <Text style={styles.label}>Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={login}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.register}>
          New to TaskFlow?{' '}
          <Text style={styles.registerBold}>
            Create Account
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 28,
    backgroundColor: '#F6F7FB',
  },

  logo: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: '#5B5FEF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 18,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#20212B',
  },

  subtitle: {
    textAlign: 'center',
    color: '#777985',
    marginTop: 8,
    marginBottom: 35,
    fontSize: 15,
  },

  label: {
    marginBottom: 8,
    fontWeight: '600',
    color: '#33343D',
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },

  loginButton: {
    backgroundColor: '#5B5FEF',
    padding: 17,
    borderRadius: 12,
    marginTop: 5,
  },

  loginText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  register: {
    textAlign: 'center',
    marginTop: 25,
    color: '#777985',
  },

  registerBold: {
    color: '#5B5FEF',
    fontWeight: 'bold',
  },
});