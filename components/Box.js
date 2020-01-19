import React from 'react';
import {View,Text,Button} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as firebase from 'firebase';


import '@firebase/firestore';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';


function Box({title, author, body, summary, nav, time, storyId, isFav, favList}){
  
    
    let user = firebase.auth().currentUser;
    
    let favBtnName = "favorite";
    for(let i = 0; i < favList.length; i++){
      if(favList[i] == storyId){
        isFav = true;
        favBtnName = "favorited!!!"
        break;
      }
    }

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
                        authorText: auth,
                        title: title,
                        time: time,
                        author: author
                    });
                    }}
                title="Read"
                color="#0ca379"
                /> 
                { isFav &&
                <CardButton
                onPress={async () => {

                console.log("pressed");

                }}
                title={favBtnName}
                color="darkorange"
                />}
               

            </CardAction>
        </Card>
        
    </View>
    );
}

export default Box;
