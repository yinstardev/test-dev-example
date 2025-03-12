import React, { useState, useRef } from 'react';
import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  View,
  Alert
} from 'react-native';
import { init, AuthType } from '@thoughtspot/react-native-embed-sdk';
import { STYLE_VARS } from './utils';
import { getAuthToken } from './Auth';


export default function Home({navigation}) {
  const [credentials, setCredentials] = useState({
    tsHost: 'https://colleagues-radio-describes-myself.trycloudflare.com',
    username: 'tsadmin',
    password: '',
    secretKey: ''
  });
  const [viewConfig, setViewConfig] = useState({
    liveboardId: '9bd202f5-d431-44bf-9a07-b4f7be372125'
  });

  const handleAuthentication = async () => {
    try {
      init({
        thoughtSpotHost: credentials.tsHost,
        authType: AuthType.TrustedAuthTokenCookieless,
        getAuthToken: async () => {
            return await getAuthToken(credentials);
        },
        loginFailedMessage: "Login Failed",
        customizations: {
          style: {
            customCSS: {
              variables: STYLE_VARS,
            },
          },
        }, 
          
      });

      navigation.navigate('Liveboard', { viewConfig });
    } catch (error) {
      console.error('Authentication failed:', error);
      Alert.alert(
        "Error",
        `Authentication failed: ${error as string}`,
        [{ text: "OK" }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="ThoughtSpot Host"
            value={credentials.tsHost}
            onChangeText={(text) => setCredentials(prev => ({ ...prev, tsHost: text }))}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={credentials.username}
            onChangeText={(text) => setCredentials(prev => ({ ...prev, username: text }))}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password (Optional)"
            value={credentials.password}
            secureTextEntry
            onChangeText={(text) => setCredentials(prev => ({ ...prev, password: text }))}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Secret Key (Optional)"
            value={credentials.secretKey}
            secureTextEntry
            onChangeText={(text) => setCredentials(prev => ({ ...prev, secretKey: text }))}
          />

          <TextInput 
            style={styles.input}
            placeholder="Liveboard-ID"
            value={viewConfig.liveboardId}
            onChangeText={(text) => setViewConfig(prev => ({...prev, liveboardId: text}))}
          />
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleAuthentication}
          >
            <Text style={styles.buttonText}>Connect</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  formContainer: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#2770EF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  embedContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
   headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2E2E2E', 
    paddingHorizontal: 10,
    height: 50,
  },
  headerText: {
    color: '#FFFFFF', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F39C12',
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#FFFFFF', 
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  embed: {
    flex: 1,
  },
  footer: {
    height: 50,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
  },
});
