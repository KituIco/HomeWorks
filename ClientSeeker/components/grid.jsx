import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Grid( props ) {
  const services = props.listings

  const iconsGrid = data => {
    return (
      <View style={styles.cards}  key={data.typeName}>
        <TouchableWithoutFeedback onPress= {() => 
        props.navigation.navigate('RequestStack', { data })}>
          <View style={styles.touchables}>
            <MaterialCommunityIcons name={data.icon} size={58}/>
            <Text style={styles.item}>{data.typeName}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <View style={styles.grid}>
      {services.map((value, index) => {
        return iconsGrid(value);
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    paddingVertical: 15,
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  item: {
    fontFamily: 'quicksand',
    paddingTop: 10,
    maxWidth: 80,
    letterSpacing: -0.5,
    textAlign: "center"
  },
  cards: {
    marginVertical: 15,
    width: '33%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  touchables: {
    alignItems: 'center'
  }
})