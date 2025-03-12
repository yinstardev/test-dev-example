import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { Action, HostEvent, LiveboardEmbed } from '@thoughtspot/react-native-embed-sdk';

export const LiveboardView = ({navigation, route}) => {

  const {viewConfig} = route.params;
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<any>(null);

  const reloadView = () => {
    Alert.alert("Reloading")
    if(webViewRef?.current) {
      webViewRef?.current?.trigger(HostEvent.Reload)
    }
  }

  const goBack = () => {
    if(webViewRef?.current) {
      webViewRef.current.trigger(HostEvent.Share)
    }
    setLoading(!loading);
  }


  return (
  <> 
   <View style={lbstyles.embedContainer}>
          <View style={lbstyles.headerRow}>
            <Text>Liveboard View</Text>
          </View>
          <View style={lbstyles.headerRow}>
            <Text style={lbstyles.headerText}>My Custom App</Text>
            <View style={lbstyles.actionButtonsRow}>
              <TouchableOpacity onPress={reloadView} style={lbstyles.actionButton}>
                <Text style={lbstyles.actionButtonText}>Reload</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goBack} style={lbstyles.actionButton}>
                <Text style={lbstyles.actionButtonText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </View>
          {loading && <Text>Loading...</Text>}
          <View style={lbstyles.content}>
            <LiveboardEmbed
              ref = {webViewRef}
              liveboardId={viewConfig.liveboardId}
              onAuthInit={() => {alert("Auth Init EmbedEvent");setLoading(false)}}
              onError={(error) => {alert(`Error hai bhai ${JSON.stringify(error)}`)}}
              onLiveboardRendered={() => {alert("Liveboard Rendered")}}
              visibleActions={[Action.Pin, Action.Edit, Action.DrillDown, Action.AddFilter]}
              // defaultActionsDisabled = {false}
              // visibleActions={[Action.Share]}
              // hideLiveboardHeader = {true}
            />
          </View>
          <View style={lbstyles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={lbstyles.footerText}>Go to Homepage</Text>
            </TouchableOpacity>
          </View>
      </View>
      </>
  );
};

const lbstyles = StyleSheet.create({
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