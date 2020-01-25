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
        }
    }
    
  render() {
    let body = this.props.navigation.getParam('body','no body');
    let displayAuthor = "Written by: "+this.props.navigation.getParam('author','no author');
    let title = this.props.navigation.getParam('title','no title');
    // let sum = this.props.navigation.getParam('summary','no summary');
    let author = this.props.navigation.getParam('author','no author');
    let time = this.props.navigation.getParam('time','no time');
    
    let story = "";
    for( let i = 0; i < body.length; i++){
        story += (body[i] + "\n");
    }
    return (
        
            
       <View style={styles.container}>
           <ScrollView style = {{padding:32}}>
        <View style = {styles.title}>
           <Text style = {styles.titleText}>{title}</Text>
        </View>

        <View style = {styles.author}>
            <Text style = {styles.authorText}>{displayAuthor}</Text>
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
                <Button color = "darkorange" title={this.state.favButtonText} onPress={async () => {
                    if(this.state.favButtonText == "Unfavorite"){
                        this.setState({
                            favButtonText: "Favorite"
                        });
                        console.log("Unfavorited");
                    }
                    else{
                        this.setState({
                            favButtonText: "Unfavorite"
                        });
                    
                    console.log("presssd fav");
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

                    let tmp = author + time;
                   // console.log(tmp);
                    arr.push(tmp);
                   // console.log(arr);
                    let x =  db.collection('users').doc(user.uid).update(
                        {
                          fav: arr
                        }
                  ).catch((error) => {

                    console.log( error.code);
                    console.log(error.message);
                  
                });

                }}

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