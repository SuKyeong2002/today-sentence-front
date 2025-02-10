import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Search: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;

interface BackHeaderProps {
  searchKeyword?: string;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
}

export const ProfileBackHeader: React.FC<BackHeaderProps> = ({
  searchKeyword,
  onBackPress,
  onNotificationPress,
}) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Image
            source={require('../../assets/image/back2.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.searchText}>{searchKeyword}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coinText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262627',
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  searchText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
