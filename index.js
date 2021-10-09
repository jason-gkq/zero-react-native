/**
 * @format
 */

// import { AppRegistry } from 'react-native';
// import App from './App';
// import App from './src/pages/index';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import './src/pages/index';
import './src/pages/home';
import './src/pages/user';

// // In index.js of a new project
// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { Navigation } from 'react-native-navigation';

// // Home screen declaration
// const HomeScreen = (props) => {
//   return (
//     <View style={styles.root}>
//       <Text>Hello React Native Navigation 👋</Text>
//       <Button
//         title="Push Settings Screen"
//         color="#710ce3"
//         onPress={() => {
//           console.log(props);
//           Navigation.push(props.componentId, {
//             component: {
//               name: 'Settings',
//               options: {
//                 topBar: {
//                   title: {
//                     text: 'Settings',
//                   },
//                 },
//               },
//             },
//           });
//         }}
//       />
//     </View>
//   );
// };
// HomeScreen.options = {
//   topBar: {
//     title: {
//       text: 'Home',
//       color: 'white',
//     },
//     background: {
//       color: '#4d089a',
//     },
//   },
// };

// // Settings screen declaration - this is the screen we'll be pushing into the stack
// const SettingsScreen = () => {
//   return (
//     <View style={styles.root}>
//       <Text>Settings Screen</Text>
//     </View>
//   );
// };

// Navigation.registerComponent('Home', () => HomeScreen);
// Navigation.registerComponent('Settings', () => SettingsScreen);

// Navigation.events().registerAppLaunchedListener(async () => {
//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               name: 'Home',
//             },
//           },
//         ],
//       },
//     },
//   });
// });

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'whitesmoke',
//   },
// });
