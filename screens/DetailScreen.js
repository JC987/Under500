// DetailScreen.js
import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
export default class Aboutscreen extends Component {
    
    
  render() {
      let b = this.props.navigation.getParam('body','no body');
      let a = " "+this.props.navigation.getParam('author','no author');
      let t = this.props.navigation.getParam('title','no title');
      let sum = this.props.navigation.getParam('summary','no summary');
      console.log("b is " + b);
    let s = "He was late home that night due to some ongoing release activities at his office. \nHe came home around 11:40 PM.\n He had already informed her to not wait for him and go to sleep.\n He refreshed himself and entered the bed room.\n He could see her deeply engaged in sleep. Her calm face remarked her innocence and the wait she did for him.\n He knelt down on the floor before the bed at her legs. He kissed her feet very gently so as not to disturb her from sleep.\n The gentle touch of his lips on her soft feet made her nerves solicitous.\n She immediately woke up and was surprised to see him at her legs.\n She playfully took him into her arms and made him sit on the bed besides her.\n Having woken up in the middle of a deep sleep, she leaned towards him and rested her forehead onto his.\n He started caressing her nose with his nose, while she responded the same.\n They stared playing their favorite game \"Nose-Nose\" at that hour in the night. \nThe clock struck 12 and he bent down towards the bed, took out a cake which he had hid it under to surprise her.\n She was so surprised and got emotional on seeing the cake that wished– Happiest Birthday Mom!" + "He was late home that night due to some ongoing release activities at his office. \nHe came home around 11:40 PM.\n He had already informed her to not wait for him and go to sleep.\n He refreshed himself and entered the bed room.\n He could see her deeply engaged in sleep. Her calm face remarked her innocence and the wait she did for him.\n He knelt down on the floor before the bed at her legs. He kissed her feet very gently so as not to disturb her from sleep.\n The gentle touch of his lips on her soft feet made her nerves solicitous.\n She immediately woke up and was surprised to see him at her legs.\n She playfully took him into her arms and made him sit on the bed besides her.\n Having woken up in the middle of a deep sleep, she leaned towards him and rested her forehead onto his.\n He started caressing her nose with his nose, while she responded the same.\n They stared playing their favorite game \"Nose-Nose\" at that hour in the night. \nThe clock struck 12 and he bent down towards the bed, took out a cake which he had hid it under to surprise her.\n She was so surprised and got emotional on seeing the cake that wished– Happiest Birthday Mom!" + "He was late home that night due to some ongoing release activities at his office. \nHe came home around 11:40 PM.\n He had already informed her to not wait for him and go to sleep.\n He refreshed himself and entered the bed room.\n He could see her deeply engaged in sleep. Her calm face remarked her innocence and the wait she did for him.\n He knelt down on the floor before the bed at her legs. He kissed her feet very gently so as not to disturb her from sleep.\n The gentle touch of his lips on her soft feet made her nerves solicitous.\n She immediately woke up and was surprised to see him at her legs.\n She playfully took him into her arms and made him sit on the bed besides her.\n Having woken up in the middle of a deep sleep, she leaned towards him and rested her forehead onto his.\n He started caressing her nose with his nose, while she responded the same.\n They stared playing their favorite game \"Nose-Nose\" at that hour in the night. \nThe clock struck 12 and he bent down towards the bed, took out a cake which he had hid it under to surprise her.\n She was so surprised and got emotional on seeing the cake that wished– Happiest Birthday Mom!" + "He was late home that night due to some ongoing release activities at his office. \nHe came home around 11:40 PM.\n He had already informed her to not wait for him and go to sleep.\n He refreshed himself and entered the bed room.\n He could see her deeply engaged in sleep. Her calm face remarked her innocence and the wait she did for him.\n He knelt down on the floor before the bed at her legs. He kissed her feet very gently so as not to disturb her from sleep.\n The gentle touch of his lips on her soft feet made her nerves solicitous.\n She immediately woke up and was surprised to see him at her legs.\n She playfully took him into her arms and made him sit on the bed besides her.\n Having woken up in the middle of a deep sleep, she leaned towards him and rested her forehead onto his.\n He started caressing her nose with his nose, while she responded the same.\n They stared playing their favorite game \"Nose-Nose\" at that hour in the night. \nThe clock struck 12 and he bent down towards the bed, took out a cake which he had hid it under to surprise her.\n She was so surprised and got emotional on seeing the cake that wished– Happiest Birthday Mom!";
    let j = "He was late home that night due to some ongoing release activities at his office. \nHe came home around 11:40 PM.\n He had already informed her to not wait for him and go to sleep.\n He refreshed himself and entered the bed room.\n He could see her deeply engaged in sleep. Her calm face remarked her innocence and the wait she did for him.\n He knelt down on the floor before the bed at her legs. He kissed her feet very gently so as not to disturb her from sleep.\n The gentle touch of his lips on her soft feet made her nerves solicitous.\n She immediately woke up and was surprised to see him at her legs.\n She playfully took him into her arms and made him sit on the bed besides her.\n Having woken up in the middle of a deep sleep, she leaned towards him and rested her forehead onto his.\n He started caressing her nose with his nose, while she responded the same.\n They stared playing their favorite game \"Nose-Nose\" at that hour in the night. \nThe clock struck 12 and he bent down towards the bed, took out a cake which he had hid it under to surprise her.\n She was so surprised and got emotional on seeing the cake that wished– Happiest Birthday Mom!";
  //  let t = "It was good to be on the water again.  I had come down from a landlocked town at the behest of a distant friend who had made it big.  Jim had more toys than he knew what to do with, and a few that he couldn’t play with alone.  The schooner was one of the latter.  What had possessed him to buy a full-rigged seventy five foot schooner? I ran him through the basics of setting up the boat, got him situated in the cockpit, and started the diesel up to get us away from the dock. Jim was a fair dinkum motorer, I found out.  He could point the boat in a direction and go there, avoid buoys and sandbars if they were pointed out to him, and he kept a smile on his face the whole while.  I like confidence in a sailor. We came out of the channel into the sound, and I headed forward to set the sails.  I suddenly had a pilot with split attention.  Jim had to keep the boat pointed into the wind for me, but he wanted to watch what I was doing at the same time.  I blessed him with first-timer’s amnesty, and gently let him know if he was about to kill me with a jib sheet across the throat.  As the sails were unfurled and caught the wind, the boat suddenly came to life, and I had Jim cut the engine.  He got that right the first time. Silence came over us, and Jim was blessed with the serenity of the sailor.  He didn’t have that need to fill the space with talk, and I sat back and enjoyed the wind in my face as he learned to sail his new toy.  I was intrigued by his ability to take this all in stride, and he explained that for the past five years he had been studying Zen Buddhism when not working and making gobs of money.  The dichotomy was stunning.  A filthy rich Buddhist.  What do you know. I finally felt comfortable enough to go below and get us a couple of beers.  There is nothing like drifting along with the wind in your face and a beer in your hand.  Luckily Jim hadn’t fallen head over heels into vegetarianism and abstinence, so the beer was welcomed.  We sat back, listened to the waves at the bow, and remembered our past together."

    let story = "";
    for( let i = 0; i < b.length; i++){
        story += (b[i] + "\n");
    }
    return (
            
       <View style={styles.container}>
        <View style = {styles.title}>
           <Text style = {styles.titleText}>{t}</Text>
        </View>

        <View style = {styles.author}>
            <Text style = {styles.authorText}>{a}</Text>
        </View>
          
        

        <View style = {styles.body}>
        
            <Text style = {styles.bodyText}>
                {story}
            </Text>
            
          
        </View>
        
        <View style = {styles.footer}>
            <View style ={{padding:20}}> 
                <Button color = "forestgreen" onPress = {()=>{this.props.navigation.navigate('Home');}}  title="Go Home"/>
             </View>
            <View style ={{padding:20}}> 
                <Button color = "darkorange" title="Favourite" onPress = {() => {
                    console.log("FAV");
                }}/> 
            </View>
            
            
        </View>
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
        marginTop:64
    }
})