import React from 'react';
import {View,Text,Button} from 'react-native';
//import DetailScreen from './DetailScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as firebase from 'firebase';


import '@firebase/firestore';
//import HomeScreen from './HomeScreen';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
//import { makeStyles } from '@material-ui/core/styles';
/*import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
*/
/*
const AppNavigator = createStackNavigator({
    Detail:{
        screen: DetailScreen,
        navigationOptions: {
          title: 'Go Back',
        }
    }
});


const AppContainer = createAppContainer(AppNavigator);*/

function Box({title, author, body, summary, nav, time, storyId}){
    //console.log("nav \n" + nav);
    let auth = "by "+ author + ":   " + time;
    return(
    <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
        
        <Card isDark = {false}style = {{backgroundColor:'#f6f6f6', overflow:'hidden'}}>
            <CardTitle  style={{overflow:'hidden'}}
                title={title}
                subtitle={auth}
            >
              </CardTitle>  
            <CardContent >
                <Text style={{margin:4, overflow:'hidden'}}>
                    {summary}
                </Text>    
            </CardContent>
            <CardAction 
                separator={true}
                style={{backgroundColor:'#f0f0f0'}} 
                inColumn={false}>
                <CardButton
                    onPress={() => {console.log("pressed");
                    nav.navigation.navigate('Detail', {
                        body: body,
                        author: auth,
                        title: title,
                    });
                    }}
                title="Read"
                color="#0ca379"
                />  
                <CardButton
                onPress={async () => {
                  let user = firebase.auth().currentUser;
    
                  const db = firebase.firestore();
                  let arr = [];
                  let storiesRef =  db.collection('users').where('userId', '==', user.uid);
                  let allStories = await storiesRef.get()
                  .then(snapshot => {
                    snapshot.forEach(doc => {
                      console.log(doc.data());
                      arr = doc.data()['fav'];
                      console.log(arr);
                      
                    });
                  })
                  .catch(err => {
                    console.log('Error getting documents', err);
                  });

                    let tmp = author + time;
                    console.log(tmp);
                    arr.push(tmp);
                    console.log(arr);
                  let x =  db.collection('users').doc(user.uid).update(
                      {
                        fav: arr
                      }
                  ).catch((error) => {

                    console.log( error.code);
                    console.log(error.message);
                  
                });

                }}
                title="Favorite"
                color="darkorange"
                />
               

            </CardAction>
        </Card>
        
    </View>
    );
}

export default Box;

/*
 <CardButton
                onPress={() => {}}
                title="Favorite"
                color="dodgerblue"
                />
                  <CardButton
                onPress={() => {}}
                title="Favorite2"
                color="rebeccapurple"
                />
                  <CardButton
                onPress={() => {}}
                title="Favorite3"
                color="#0483B0"
                />
                  <CardButton
                onPress={() => {}}
                title="Favorite4"
                color="indigo"
                />
                  <CardButton
                onPress={() => {}}
                title="Favorite5"
                color="#790ca3"
                />
                  <CardButton
                onPress={() => {}}
                title="Favorite6"
                color="#097356"
                />
                <CardButton
                onPress={() => {}}
                title="Favorite7"
                color="#E673E6"
                />
                <CardButton
                onPress={() => {}}
                title="Favorite8"
                color="#9F72B0"
                />
                <CardButton
                onPress={() => {}}
                title="Favorite9"
                color="#2C7D5A"
                />
                <CardButton
                onPress={() => {}}
                title="Favorite10"
                color="#2CA0B0"
                />
                <CardButton
                onPress={() => {}}
                title="Favorite11"
                color="#B37000"
                />
                <CardButton
                onPress={() => {}}
                title="Favorite10"
                color="#0ebb8b"
                />
                <CardButton
                onPress={() => {}}
                title="Favorite10"
                color="#0c82a3"
                />
*/