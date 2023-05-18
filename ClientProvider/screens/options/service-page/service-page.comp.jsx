import { View, Text, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Loading from '../../../hooks/loading';

import styles from './service-page.style';
import hook from './service-page.hook';

export default function ServicePage({ navigation, route }) {
  const {
    loading,
  } = hook({ route });

  if (loading)
    return <Loading/>
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Service Page</Text>
      </View>

      
    </View>
  );
}
