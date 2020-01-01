// App.js
import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { createAppContainer } from "react-navigation";

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


import Icon from 'react-native-vector-icons/FontAwesome';



import HomeScreen from './componets/HomeScreen';
import AboutScreen from './componets/AboutScreen';
import DetailScreen from './componets/DetailScreen';
import ModalComposeScreen from './componets/ModalComposeScreen';
import ModalFilterScreen from './componets/ModalFilterScreen';

export default class App extends React.Component {
  
  render() {
    return <AppContainer />;
  }
}
const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  About: AboutScreen,
});
//createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const AppNavigator2 = createMaterialTopTabNavigator(  
  {  
      Home: HomeScreen,  
      About: AboutScreen,  
  },  
  {  
      tabBarOptions: {  
          activeTintColor: 'white',  
          showIcon: true,  
          showLabel:false,  
          style: {  
              backgroundColor:'blue'  
          }  
      },  
  }  
)  

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
   
    navigationOptions: ({ navigation }) => {
      return {
        headerRight: () => (
          <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
          <TouchableOpacity activeOpacity = {.5} 
              onPress = {() => navigation.navigate("ModalCompose")} >
               <Icon name="pencil-square-o" size={30} color="#fff" />
          </TouchableOpacity>
            
              <Text>     </Text>
              <TouchableOpacity activeOpacity = {.5} 
              onPress = {() => navigation.navigate("About")} >
               <Icon name="user-circle" size={30} color="#fff" />
          </TouchableOpacity>
          
            <Text>  </Text>
        </View>
         
        ),
      };
    }
  },
  About: {
    screen: AboutScreen
  },
  Detail:{
    screen: DetailScreen,
    navigationOptions: {
      title: 'Go Back',
    }
  },
  ModalCompose: {
    screen: ModalComposeScreen,
  },
  ModalFilter:{
    screen: ModalFilterScreen,
  }
},
{
        initialRouteName: "Home",
        defaultNavigationOptions: {

          title:'UNDER 500!',
          headerStyle: {
            backgroundColor: '#0ca379',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontStyle: 'italic',
          },
        },
        
},
{
  mode: 'modal',
  headerMode: 'none',
},
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Box from './componets/Box'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


export default function App() {
  return (
    <View style={styles.container}>
      <Text >Open up App.js to start working on your app!</Text>
      <Text >Hello there!</Text>
      <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Box value={item.key}/>}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
  },
});

*/

/*
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import Box from './componets/Box'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 2, backgroundColor:'#aaa' }}>
        <Text>Home Screen</Text>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Box value={item.key} root = {RootStack} nav = {this.state.navigation}/>}
        />
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>
          itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>
        <Text>
          otherParam:{' '}
          {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
      </View>
    );
  }
}

class OtherScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>
          itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>
        <Text>
          otherParam:{' '}
          {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
});

export default createAppContainer(RootStack);*/