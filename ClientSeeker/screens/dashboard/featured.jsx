import { StyleSheet, ScrollView, View } from 'react-native';
import Listing from '../../components/serviceListing';
import ListHeader from '../../components/listheader';


export default function Featured() {
  const featured = [
    {providerID: 'A', name: 'Alex Guerrero', location: 'Taguig City', serviceRatings: '4.3', typeName: 'Car Mechanic', initialCost: '420', src: require("../../assets/providers/provider-a.png")},
    {providerID: 'B', name: 'Precious Trinidad', location: 'Los Baños', serviceRatings: '4.6', typeName: 'House Cleaning', initialCost: '360', src: require("../../assets/providers/provider-b.png")},
    {providerID: 'C', name: 'Fe Mercado', location: 'Antipolo', serviceRatings: '4.2', typeName: 'Laundry', initialCost: '330', src: require("../../assets/providers/provider-c.png")},
    {providerID: 'D', name: 'Edgardo Dela Cena', location: 'Bacoor City', serviceRatings: '4.8', typeName: 'Roof Cleaning', initialCost: '410', src: require("../../assets/providers/provider-d.png")},
    {providerID: 'E', name: 'Ricardo Pollicar', location: 'Mandaluyong City', serviceRatings: '4.4', typeName: 'Meal Preparation', initialCost: '300', src: require("../../assets/providers/provider-e.png")},
    {providerID: 'F', name: 'Ced Montenegro', location: 'Manila', serviceRatings: '4.6', typeName: 'Plumbing', initialCost: '350', src: require("../../assets/providers/provider-f.png")},
  ]

  return (
    <View style={{justifyContent: 'flex-end', backgroundColor: '#FFFFFF',}}>
      <ListHeader title={"Featured"}/>
      <ScrollView>
        <View style={styles.container}>
          <Listing listings={featured}/>
        </View>
      </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
});