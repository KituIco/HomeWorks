import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

export default function Header ( props ) {
  const title = props.title;
  const screen = props.screen;
  const services = props.listings;

  return (
    <View style={styles.contentheader}>
      <Text style={styles.contentname}>{title}</Text>
      <TouchableWithoutFeedback style={{alignSelf:'flex-end'}} onPress= {() => props.navigation.navigate(screen, {service: services})}>
        <Text style={styles.viewall}>View all</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
   contentheader: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginHorizontal: 16
  },
  contentname: {
    fontFamily:'quicksand-bold', 
    fontSize: 18, 
    color:"#9C54D5", 
    letterSpacing: -0.5
  },
  viewall: { 
    fontFamily:'quicksand', 
    fontSize: 14, 
    alignSelf:'flex-end', 
    letterSpacing: -0.5 
  },
})