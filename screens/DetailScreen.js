// DetailScreen.js
import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import {  StackActions, NavigationActions, createAppContainer } from "react-navigation";



import '@firebase/firestore';
export default class Detailscreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            favButtonText: (this.props.navigation.getParam('isFav',false)) ? "Unfavorite" : "Favorite",
            author:this.props.navigation.getParam('author','no author'),
            time:this.props.navigation.getParam('time','no time'),
            title: this.props.navigation.getParam('title','no title'),
            displayAuthor: "Written by: "+this.props.navigation.getParam('author','no author'),
            body: this.props.navigation.getParam('body','no body'), 
        }
    }

    async unfavoriteStory(){
        
        let user = firebase.auth().currentUser;

        const db = firebase.firestore();
        let arr = [];
        let storiesRef =  db.collection('users').where('userId', '==', user.uid);
        let allStories = await storiesRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            arr = doc.data()['fav'];
            
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

        let tmp = this.state.author + this.state.time;
        let newArr = [];
        for(let i = 0; i < arr.length; i++){
            if(arr[i]!=tmp)
                newArr.push(arr[i])
        }

        let x =  db.collection('users').doc(user.uid).update(
            {
              fav: newArr
            }
      ).catch((error) => {

        console.log( error.code);
        console.log(error.message);
      
    });

    }

    async favoriteStory(){
        let user = firebase.auth().currentUser;

        const db = firebase.firestore();
        let arr = [];
        let storiesRef =  db.collection('users').where('userId', '==', user.uid);
        let allStories = await storiesRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            arr = doc.data()['fav'];
            
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

        let tmp = this.state.author + this.state.time;
        arr.push(tmp);
        let x =  db.collection('users').doc(user.uid).update(
            {
              fav: arr
            }
      ).catch((error) => {

        console.log( error.code);
        console.log(error.message);
      
    });
    }
    
  render() {

    
    let story = "";
    for( let i = 0; i < this.state.body.length; i++){
        story += (this.state.body[i] + "\n");
    }
    return (
        
            
       <View style={styles.container}>
           <ScrollView style = {{padding:32}}>
        <View style = {styles.title}>
           <Text style = {styles.titleText}>{this.state.title}</Text>
        </View>

        <View style = {styles.author}>
            <Text style = {styles.authorText}>{this.state.displayAuthor}</Text>
        </View>
          
      
        <View style = {styles.body}>
        
        <Text style = {styles.bodyText}>
            {story}
        </Text>

        <View style = {styles.footer}>
            <View style ={{padding:20}}> 
                <Button color = "forestgreen" onPress = {()=>{const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' } )],});
                    this.props.navigation.dispatch(resetAction);}}  
                    title="Go Home"/>
             </View>
            <View style ={{padding:20}}> 
                <Button color = "darkorange" title={this.state.favButtonText} onPress={() => {
                    let user = firebase.auth().currentUser;

                    if(user != null ){
                        if(this.state.favButtonText == "Unfavorite"){
                            this.setState({
                                favButtonText: "Favorite"
                            });
                            console.log("Unfavorited");
                            this.unfavoriteStory();

                        }
                        else{
                            this.setState({
                                favButtonText: "Unfavorite"
                            });
                        
                            console.log("presssd fav");
                            this.favoriteStory();

                        }
                    }
                    else
                        alert("Please log in to favorite");
            }

            }
                />
            </View>
            
            
        </View>
        
       
         </View>

        </ScrollView>
        
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'space-between'
    },
    title: {
       // flex:2,
        padding:20,
    },
    titleText:{
        fontSize:32,
        textAlign:'center'
    },
    author: {
        //flex:1,
        padding:0,
    },
    authorText: {
        fontSize:14,
        color:'#aaa'
    },
    body:{
        //flex:1,
        padding:16,
        flex:9,
    },
    bodyText:{
        fontSize:18
    },
    footer:{
        flex:1,
       // backgroundColor:'#aaa',
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
        marginTop:16
    }
})