// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, FlatList } from 'react-native';
import { createAppContainer } from "react-navigation";
import Box from './Box';

import { createStackNavigator } from 'react-navigation-stack';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
/*
function Box({value, nav}){
    return(
    <View style={{flex: 10, flexDirection: 'column', justifyContent: 'flex-start'}}>
        
        <Card style = {{flex: 1}}>
            <CardTitle 
                title="Short story dd1" 
                subtitle={value}
            />
            <CardContent text="This will be a temporay body and or summary to show what the short story is about kind of like an abstract or what ever it is called when you have a description of the book on the back of a book. This is just nonsence filler content anyways soooooooo......" />
            <CardAction 
                separator={true} 
                inColumn={false}>
                <CardButton
                    onPress={() => {
                        this.props.navigation.navigate('About', {
                          itemId: 86,
                          otherParam: 'anything you want here',
                        });
                      }}
                title="Read"
                color="blue"
                /> 
                <CardButton
                onPress={() => {}}
                title="Favorite"
                color="blue"
                />
                <CardButton
                onPress={() => {}}
                title="Download"
                color="blue"
                />

            </CardAction>
        </Card>
        
    </View>
    );
}
*/
export default class Homescreen extends Component {
    
render() {
    console.log(this.props);
    console.log(this.props.navigation);
    return (
      <View style={{ flex: 2, backgroundColor:'#aaa' }}>
        <View style={{height:75, flexDirection:'row'}}>
          <TextInput style={{height:50, backgroundColor: '#fff', margin: 8, padding: 4, flex:9}} placeholder="Search for a story"/>
          <View style={{ justifyContent: 'center'}}>   
             <Button style={{flex:1, textAlign:'center'}} onPress={() => {this.props.navigation.navigate("ModalFilter")}} title="Filter"/>
          </View>
       </View>
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
          renderItem={({item}) => <Box value={item.key} nav = {this.props}/>}
        />
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate('MyModal', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
        />
      </View>
    );
  }
}

/*import React from 'react';
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
}*/