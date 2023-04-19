import { StyleSheet, View, Text } from 'react-native';

export default function Listing( props ) {
  const messages = props.listings;
  const userID = props.userID;
  const messagesList = data => {
    if (data.userID == userID)
    return (
      <View key={data.messageID} style={styles.containerSelf}>
        <View style={styles.backgroundSelf}>
          <Text style={styles.textSelf}>{data.message}</Text>    
        </View>
      </View>
    );

    else 
    return (
      <View key={data.messageID} style={styles.containerOther}>
        <View style={styles.backgroundOther}>
          <Text style={styles.textOther}>{data.message}</Text>    
        </View>
      </View>
    );
  };

  return (
    <View style={{marginVertical:16}}>
    {messages.map((value, index) => {
      return messagesList(value);
    })}
    </View>
  )
}

const styles = StyleSheet.create({
  containerSelf: {
    maxWidth:'70%', 
    alignItems:'flex-start', 
    alignSelf:'flex-end'
  },
  containerOther: {
    maxWidth:'70%', 
    alignItems:'flex-start', 
    alignSelf:'flex-start'
  },

  backgroundSelf: {
    backgroundColor:'#9C54D5', 
    marginBottom:10, 
    padding: 16,
    paddingTop:10,
    borderRadius: 20, 
    marginHorizontal:10 
  },
  backgroundOther: {
    backgroundColor:'#EFEFEF', 
    marginBottom:10, 
    padding: 16,
    paddingTop:10,
    borderRadius: 20, 
    marginHorizontal:10,
  },

  textSelf: {
    color:'#F9F9F9',
    fontFamily:'quicksand',
    fontSize: 16,
    textAlign:'right'
  },
  textOther: {
    color:'#000000',
    fontFamily:'quicksand',
    fontSize: 16,
    textAlign:'left'
  },
});