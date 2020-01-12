// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, FlatList, Modal } from 'react-native';
import Box from '../components/Box';
import ProgressBar from 'react-native-progress/Bar';

import * as firebase from 'firebase';


import '@firebase/firestore';
import ConfigFirebase from './ConfigFirebase';
import ModalFilterScreen from './ModalFilterScreen';


export default class Homescreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:[],
      fetched: false,
    }
    this.fetchFeed = this.fetchFeed.bind(this);
  }

  
  fetchFeed = (e) => {
    const dbh = firebase.firestore();
    //get filter params for querey
    let storiesRef = this.props.navigation.getParam('filter', dbh.collection('stroies').orderBy("createdAt", "desc"));
    let allStories = storiesRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
          this.setState({
            list: [...this.state.list, {title : doc.data()['title'], author : doc.data()['author'], summary : doc.data()['summary'], body : doc.data()['body'],  time: doc.data()['createdAt'] }],
            fetched: true,
          },
          ); 
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

  
}

render() {
  

  if(!this.state.fetched){
    this.fetchFeed();
    return(
      <View>
        <View style={{ flex: 2, backgroundColor:'#aaa', }}>
          <View style={{height:75, flexDirection:'row'}}>
            <TextInput style={{height:50, backgroundColor: '#fff', margin: 8, padding: 4, flex:9}} placeholder="Search for a story"/>
            <View style={{ justifyContent: 'center'}}>   
              <Button style={{flex:1, textAlign:'center'}} onPress={() => {
                  this.props.navigation.navigate("ModalFilter");
                  }} title="Filter"/>
            </View>
          </View>
        </View>
        <ProgressBar width={null} indeterminate={true} />
      </View>
      
    );
  }
  
  else{
    return (
      <View style={{ flex: 2, backgroundColor:'#aaa' }}>
        <View style={{height:75, flexDirection:'row'}}>
          <TextInput style={{height:50, backgroundColor: '#fff', margin: 8, padding: 4, flex:9}} placeholder="Search for a story"/>
          <View style={{ justifyContent: 'center'}}>   
             <Button style={{flex:1, textAlign:'center'}} onPress={() => {
                this.props.navigation.navigate("ModalFilter");
                }} title="Filter"/>
          </View>
        </View>
        <FlatList
          refreshing = {true}
          data={this.state.list}
          renderItem={({item}) => <Box title = {item.title} author = {item.author} summary = {item.summary} body = {item.body} nav = {this.props} time = {item.time} /> }
        />
      </View>
    );
  }
}
}
