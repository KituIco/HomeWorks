import { View, Text } from 'react-native';

import styles from './notifs.style';
import hook from './notifs.hook';

export default function Notifications() {
  const {} = hook();

  return (
    <View style={styles.container}>
      <Text style={styles.content}> Notifications!</Text>
    </View>
  );
}