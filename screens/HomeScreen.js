// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, FlatList, Modal } from 'react-native';
import Box from '../components/Box';
import ProgressBar from 'react-native-progress/Bar';
import * as FireSQL from 'firesql';
import * as firebase from 'firebase';


import '@firebase/firestore';
import ConfigFirebase from './ConfigFirebase';


export default class Homescreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:[],
      fetched: false,
      searchText:this.props.navigation.getParam('search',""),
    }
    this.fetchFeed = this.fetchFeed.bind(this);
    this.searchTextChanged = this.searchTextChanged.bind(this);
  }

  searchTextChanged = (text) =>{
    this.setState({
      searchText: text
    })

  }
/*
  // I am using a second fecthFeed because I want the other feed to limit by X and if I used this func with a limit not all 
  // data where doc.data()['title'].includes(this.state.searchText) will show. Only if it is true in the first X entires.
  fetchFeedFromButton = (e) => {
      if(this.state.searchText == "")
        return ;
      const dbh = firebase.firestore();
      //get filter params for querey
      let storiesRef = this.props.navigation.getParam('filter', dbh.collection('stroies').orderBy("createdAt", "desc"));
      let allStories = storiesRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
            //I want to replicate the LIKE operator from SQL this was the simplest way to do so but it also gets every story from firebase.
            //This is a lot of reads and I want to find a way to reduce this.
            //Simplest option seems to be use the library Querybase which I think will let me do something like this ' WHERE title LIKE Sto% '
            //The trade off here is I can't check if title contians a value, only starts with a value. So no ' WHERE title LIKE %to% '.
            //Another option to try is elastic search (double check name and do more research on this).

            //TODO: limit to 5 and loadMore: I still want this to be limited to 5 items at a time. So I will need a counter in the forEach statement 
            //to count to 5 then add a loadMore functionality to loadMore data when needed. 
          if( doc.data()['title'].includes(this.state.searchText)){ 
            this.setState({
              list: [...this.state.list, {title : doc.data()['title'], author : doc.data()['author'], summary : doc.data()['summary'], body : doc.data()['body'],  time: doc.data()['createdAt'] }],
              fetched: true,
            },
            ); 
          }
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  
}
  


*/

  fetchFeedSearched = (e) => {
    if(this.state.searchText == "")
      return ;
      const dbh = firebase.firestore();
      const fSQL = new FireSQL.FireSQL(dbh);
    let cat = this.props.navigation.getParam('category', 'all');
    let s = '';
    if( cat != 'all')
       s = 'SELECT * FROM stroies WHERE titleUpper LIKE '+ '"'+ String(this.state.searchText).toUpperCase() +'%" AND category LIKE "' + cat + '" ORDER BY titleUpper LIMIT 2';
    else
       s = 'SELECT * FROM stroies WHERE titleUpper LIKE '+ '"'+ String(this.state.searchText).toUpperCase() +'%" LIMIT 2';
    console.log(cat);
    console.log(s);
      fSQL.query(s).then(documents => {
//      console.log(documents);
      documents.forEach(doc => {
//        console.log(doc);
        this.setState({
          list: [...this.state.list, {title : doc['title'], author : doc['author'], summary : doc['summary'], body : doc['body'],  time: doc['createdAt'] }],
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
    const dbh = firebase.firestore();

    //get filter params for querey
    let storiesRef = this.props.navigation.getParam('filter', dbh.collection('stroies').orderBy('createdAt', 'desc'));
    let allStories = storiesRef.limit(5).get()
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

    if(this.state.searchText=="")
      this.fetchFeed();
    else
      this.fetchFeedSearched();
      
    //Return view with progress bar
    return(
      <View>
        <View style={{ flex: 2, backgroundColor:'#aaa', }}>
          <View style={{height:75, flexDirection:'row'}}>
            <TextInput style={{height:50, backgroundColor: '#fff', margin: 8, padding: 4, flex:9}}  placeholder="Loading data..."/>
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
    //return view with feed
    return (
      <View style={{ flex: 2, backgroundColor:'#aaa' }}>
        <View style={{height:75, flexDirection:'row'}}>
        <TextInput style={{height:50, backgroundColor: '#fff', margin: 8, padding: 4, flex:9}} value={this.state.searchText} onChangeText = {(text) =>{this.searchTextChanged(text)}} placeholder="Search for a story"/>
            <View style={{ justifyContent: 'center'}}>   
             <Button style={{flex:1, textAlign:'center'}} onPress={() => {
                this.props.navigation.navigate("ModalFilter", {
                  search: this.state.searchText,
                });
                }} title="Filter"/>
                <Button color = "green" style={{flex:1, textAlign:'center'}} onPress={() => {
                  console.log("buttom pressed   " + this.state.searchText);
                  this.setState({
                    list:[],
                    fetched:false,
                  })
                }} title="Search"/>
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
