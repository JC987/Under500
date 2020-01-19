// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, FlatList, Modal } from 'react-native';
import Box from '../components/Box';
import ProgressBar from 'react-native-progress/Bar';
import * as FireSQL from 'firesql';
import * as firebase from 'firebase';


import '@firebase/firestore';
import ConfigFirebase from './ConfigFirebase';
import { ScrollView } from 'react-native-gesture-handler';


export default class Homescreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:[],
      fetched: false,
      searchText:this.props.navigation.getParam('search',""),
      userFav:["WOW"],
    }
    this.fetchFeed = this.fetchFeed.bind(this);
    this.searchTextChanged = this.searchTextChanged.bind(this);
                
    this.fetchFeed();
  
  }

  searchTextChanged = (text) =>{
    this.setState({
      searchText: text
    })

  }

  fetchFeedSearched = (e) => {
    
    if(this.state.searchText == ""){
      this.fetchFeed();
      return ;
    }
      const dbh = firebase.firestore();
      const fSQL = new FireSQL.FireSQL(dbh);
      let cat = this.props.navigation.getParam('category', 'all');
      let s = '';
      if( cat != 'all')
        s = 'SELECT * FROM stroies WHERE titleUpper LIKE '+ '"'+ String(this.state.searchText).toUpperCase() +'%" AND category LIKE "' + cat + '" ORDER BY titleUpper LIMIT 2';
      else
        s = 'SELECT * FROM stroies WHERE titleUpper LIKE '+ '"'+ String(this.state.searchText).toUpperCase() +'%" LIMIT 2';
      
      fSQL.query(s).then(documents => {
        console.log(documents);
     
      documents.forEach(doc => {
        console.log(doc);
        
        this.setState({
          list: [...this.state.list, {title : doc['title'], author : doc['author'], summary : doc['summary'], body : doc['body'],  time: doc['createdAt'], storyId: doc['storyId'] , favList: this.state.userFav }],
          fetched: true,
        },
        ); 
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
    
    console.log("Queery base below");
    

}



  fetchFeed =  (e) => {
      console.log("FECTH FEED");

     firebase.auth().onAuthStateChanged( async (user) => {

      if (user) {
        // User is signed in.
        console.log("USER IT TRUE!");

        const dbh = firebase.firestore();


        await dbh.collection('users').where("userId", "==", user.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
              this.setState({
                userFav: doc.data()['fav'],
              }) 
            
          });

        }).then( () => {
          let storiesRef = this.props.navigation.getParam('filter', dbh.collection('stroies').orderBy('createdAt', 'desc'));
          let allStories = storiesRef.limit(5).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              console.log("doc is " + doc.data()['title']);
                this.setState({
                  list: [...this.state.list, {title : doc.data()['title'], author : doc.data()['author'], summary : doc.data()['summary'], body : doc.data()['body'],  time: doc.data()['createdAt'], storyId: doc.data()['storyId'] , favList: this.state.userFav }],
                  fetched: true,
                },
                ); 
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });

        })
        
       

      }

    });

  
}

render() {
  let user = firebase.auth().currentUser;
    

  if(!this.state.fetched){
    //Return view with progress bar
    return(
      <View>
        <View style={{height:75, flexDirection:'row'}}>
        <TextInput style={{borderWidth:1,height:50, backgroundColor: '#fff', margin:4, padding: 0, flex:9}} value={this.state.searchText} onChangeText = {(text) =>{this.searchTextChanged(text)}} placeholder=" Loading data..."/>
            <View style = {{ height:50, marginTop: 8, padding: 2}}>
                    <Button color = "#0ca379" style={{flex:1, textAlign:'center', height:50}} onPress={() => {
                      this.fetchFeedSearched();
                      console.log("buttom pressed   " + this.state.searchText);
                      this.setState({
                        list:[],
                        fetched:false,
                      })

                    }} title="Search"/>
            </View>

            <View style = {{ marginTop: 8, padding: 2}}>
             <Button color = "darkorange" style={{flex:1, textAlign:'center'}} onPress={() => {
                this.props.navigation.navigate("ModalFilter", {
                  search: this.state.searchText,
                  fav: this.state.userFav,
                });
                }} title="Filter"/>

            </View>

        </View>
        <ProgressBar width={null} indeterminate={true} />
      </View>
    );
  }
  
  else{
    //return view with feed
    return (
      <ScrollView>
      <View style={{ flex: 2, backgroundColor:'#fff' }}>
        <View style={{height:75, flexDirection:'row'}}>
        <TextInput style={{borderWidth:1,height:50, backgroundColor: '#fff', margin:4, padding: 0, flex:9}} value={this.state.searchText} onChangeText = {(text) =>{this.searchTextChanged(text)}} placeholder=" Search for a story"/>
            <View style = {{ height:50, marginTop: 8, padding: 2}}>
                    <Button  color = "#0ca379" style={{flex:1, textAlign:'center', height:50}} onPress={() => {
                      this.fetchFeedSearched();
                      console.log("buttom pressed   " + this.state.searchText);
                      this.setState({
                        list:[],
                        fetched:false,
                      })
                    }} title="Search"/>
            </View>

            <View style = {{ marginTop: 8, padding: 2}}>
             <Button color = "darkorange" style={{flex:1, textAlign:'center'}} onPress={() => {
                this.props.navigation.navigate("ModalFilter", {
                  search: this.state.searchText,
                  fav: this.state.userFav,
                });
                }} title="Filter"/>

            </View>

        </View>
        <FlatList
          refreshing = {true}
          data={this.state.list}
          renderItem={({item}) => <Box title = {item.title} author = {item.author} summary = {item.summary} body = {item.body} nav = {this.props} time = {item.time} favList = {item.favList} storyId = {item.storyId} /> }
        />
      </View>
      </ScrollView>
    );
  }
}
}
