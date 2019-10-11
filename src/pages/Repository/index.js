import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default function Repository({ navigation }) {
  const repository = navigation.getParam('repository');

  return <WebView style={{ flex: 1 }} source={{ uri: repository.html_url }} />;
}

Repository.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repository').name,
});

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
