import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme} from '@/context/ThemeContext';
import styled from 'styled-components';

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
  const {isDarkMode, theme} = useTheme();

  return (
    <HeaderContainer isDarkMode={isDarkMode}>
      <LeftContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Image
            source={require('../../assets/image/back2.png')}
            style={[
              styles.backIcon,
              {tintColor: isDarkMode ? '#FFFFFF' : '#2B2B2B'},
            ]}
          />
        </TouchableOpacity>
        <SearchText isDarkMode={isDarkMode}>{searchKeyword}</SearchText>
      </LeftContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(View)<{isDarkMode: boolean}>`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const LeftContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const SearchText = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: 18px;
  font-weight: 500;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily};
`;

const styles = StyleSheet.create({
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
