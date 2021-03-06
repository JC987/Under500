// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, FlatList, Modal } from 'react-native';
import StoryItem from '../components/StoryItem';
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
      userFav:[],
      count:0,
      searched: false,
      appliedFilters:""
    }
    this.fetchFeed();
  
  }

  searchTextChanged = (text) =>{
    this.setState({
      searchText: text
    })

  }

  fetchFeedSearched = (e) => {
    //TODO: Try out using an array for the title using array-contains in the querey, instead of using firesql
    if(this.state.searchText == ""){
      this.fetchFeed();
      return ;
    }
      const dbh = firebase.firestore();
      const fSQL = new FireSQL.FireSQL(dbh);
      let category = this.props.navigation.getParam('category', ['all']);
      let showFavorites = this.props.navigation.getParam('showFavorites', false);
      let sortOrder = this.props.navigation.getParam('showNewest', true);
      let query  = '';

      //const dbh = firebase.firestore();
     /* let storiesRef = this.props.navigation.getParam('filter', dbh.collection('stories').orderBy('createdAt', 'desc'));
      let allStories = storiesRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if(!this.state.fetched){

            this.setState({
              list: [...this.state.list, {title : doc['title'], author : doc['author'], summary : doc['summary'], body : doc['body'],  
                time: doc['createdAt'], storyId: doc['storyId'] , favList: this.state.userFav }],
            }
            );
          }

        })
      });
      */
     this.setState({
      appliedFilters:"Categories filtered: " + category.join(', ') + "\t \t Sorting options: " +( (sortOrder) ? "Newset First" : "Oldest First" )+ ((showFavorites) ? "\t \t Showing only favorites" : "")
    })
      if( category != 'all')
        query = 'SELECT * FROM stories WHERE titleUpper LIKE '+ '"'+ String(this.state.searchText).toUpperCase() +'%" AND category LIKE "' + category + '" ORDER BY titleUpper'
      else
        query = 'SELECT * FROM stories WHERE titleUpper LIKE '+ '"'+ String(this.state.searchText).toUpperCase() +'%"'
      
      fSQL.query(query).then(documents => {
      documents.forEach(doc => {
        if(!this.state.fetched){

        this.setState({
          list: [...this.state.list, {title : doc['title'], author : doc['author'], summary : doc['summary'], body : doc['body'],  
            time: doc['createdAt'], storyId: doc['storyId'] , favList: this.state.userFav, category: doc['category'] }],
        }
        );
      } 
      
      });
  }).then(()=>{
    this.setState({
        fetched: true,
        searched: true,
    }
    );
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
    

}

  loadMoreFeed = (e) => {
    if(this.state.count != undefined){
      const dbh = firebase.firestore();
     
      let storiesRef = this.props.navigation.getParam('filter', dbh.collection('stories').orderBy('createdAt', 'desc'));
      let category = this.props.navigation.getParam('category', []);
          
      let showFavorites = this.props.navigation.getParam('showFavorites', false);
      let sortOrder = this.props.navigation.getParam('showNewest', true);
      this.setState({
        appliedFilters:"Categories filtered: " + category.join(', ') + "\t \t Sorting options: " +( (sortOrder) ? "Newset First" : "Oldest First" )+ ((showFavorites) ? "\t \t Showing only favorites" : "")
      })
      let allStories = storiesRef.startAfter(this.state.count.data().createdAt).limit(5).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //console.log("load more " + doc.data()['title']);
            this.setState({
              list: [...this.state.list, {title : doc.data()['title'], author : doc.data()['author'], summary : doc.data()['summary'],body : doc.data()['body'],  time: doc.data()['createdAt'], storyId: doc.data()['storyId'] , favList: this.state.userFav,  category: doc.data()['category'] }],
              fetched: true,
              
            },
            ); 
        });

        
        this.setState({
          count: snapshot.docs[snapshot.docs.length -1],
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

    } 
  }

  fetchFeed =  (e) => {
      console.log("FECTH FEED");
      
     firebase.auth().onAuthStateChanged( async (user) => {

      if (user) {
        // User is signed in.
        
       // console.log("verified : " + firebase.auth().currentUser.emailVerified)
        if(!this.state.fetched)
          this.state.list = [];
        const dbh = firebase.firestore();
        await dbh.collection('users').where("userId", "==", user.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
              this.setState({
                userFav: doc.data()['fav'],
              }) 
            
          });

        }).then( () => {
          this.getAllStories();
        })

      }

      else {
        this.getAllStories();
      }

    });

    
  
}

getAllStories(){
  const dbh = firebase.firestore();
  console.log("get all stories");
  
  let storiesRef = this.props.navigation.getParam('filter', dbh.collection('stories').orderBy('createdAt', 'desc'));
  let category = this.props.navigation.getParam('category', ['all']);
  let showFavorites = this.props.navigation.getParam('showFavorites', false);
  let sortOrder = this.props.navigation.getParam('showNewest', true);

  this.setState({
    appliedFilters:"Categories filtered: " + category.join(', ') + "\t \t Sorting options: " +( (sortOrder) ? "Newset First" : "Oldest First" )+ ((showFavorites) ? "\t \t Showing only favorites" : "")
  });
  
  let allStories = storiesRef.limit(5).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        //console.log("doc is " + doc.data()['title'] + doc.data()['category']);
        if(!this.state.fetched){
          this.setState({
            list: [...this.state.list, {title : doc.data()['title'], author : doc.data()['author'], summary : doc.data()['summary'], 
              body : doc.data()['body'],  time: doc.data()['createdAt'], storyId: doc.data()['storyId'] , favList: this.state.userFav,  category: doc.data()['category'] }]
          },
          ); 
        }
      });

      

      this.setState({
        count: snapshot.docs[snapshot.docs.length - 1],
      });
        
    })
    .then(() => {
      this.setState({
            fetched: true,
            searched: false
      })
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}

render() {
  let user = firebase.auth().currentUser;
    return (
      <ScrollView>
        <View style={{ flex: 2, backgroundColor:'#fff' }}>
          <View style={{height:75, flexDirection:'row'}}>
          <TextInput style={{borderWidth:1,height:50, backgroundColor: '#fff', margin:4, padding: 0, flex:9}} value={this.state.searchText} onChangeText = {(text) =>{this.searchTextChanged(text)}} placeholder=" Search for a story"/>
              <View style = {{ height:50, marginTop: 8, padding: 2}}>
                    <Button  color = "#0ca379" style={{flex:1, textAlign:'center', height:50}} onPress={() =>  {
                      this.setState({
                        list:[],
                        fetched:false,
                      });
                      this.fetchFeedSearched();
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
          {
            !this.state.fetched &&
            <ProgressBar width={null} indeterminate={true} />
          }
          {this.state.fetched &&
            <Text>
              {this.state.appliedFilters}
            </Text>
          }
          <FlatList
            refreshing = {true}
            data={this.state.list}
            renderItem={({item}) => <StoryItem title = {item.title} author = {item.author} summary = {item.summary} body = {item.body} nav = {this.props} time = {item.time} favList = {item.favList} storyId = {item.storyId} category = {item.category} /> }
          />
          {!this.state.searched && this.state.fetched && this.state.list.length >= 5 &&
            <Button title = "Load More"
            onPress = {() => {
              this.loadMoreFeed();
            }}/>
          }
        </View>
      </ScrollView>
    );
}
}
