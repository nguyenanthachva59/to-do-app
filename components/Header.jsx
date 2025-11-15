import React from 'react';
import { Text, View } from 'react-native';
import { headerStyles } from '../styles/header';

export default function Header({ title }) {
  return (
    <View style={headerStyles.container}>
      <Text style={headerStyles.title}>{title}</Text>
    </View>
  );
}
