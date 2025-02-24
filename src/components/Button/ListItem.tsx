import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';

interface ListItemProps {
  title: string;
  subtitle: string;
  imageSource: any;
  onPress: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  imageSource,
  onPress,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <ItemContainer isDarkMode={isDarkMode}>
        <CategoryImage source={imageSource} resizeMode="contain" />
        <TitleWrapper>
          <TitleText isDarkMode={isDarkMode}>{title}</TitleText>
          <SubTitleText isDarkMode={isDarkMode}>{subtitle}</SubTitleText>
        </TitleWrapper>
      </ItemContainer>
    </TouchableOpacity>
  );
};

export default ListItem;

// 스타일 정의
const ItemContainer = styled(View)<{ isDarkMode: boolean }>`
  width: 90%;
  padding: 10px;
  align-items: center;
  gap: 32px;
  align-self: stretch;
  margin: 0px 20px 10px 20px;
  flex-direction: row;
  border-radius: 10px;
  background-color: ${({ isDarkMode, theme }) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
`;

const CategoryImage = styled(Image)`
  width: 64px;
  height: 64px;
`;

const TitleWrapper = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  flex: 1 0 0;
`;

const TitleText = styled(Text)<{ isDarkMode: boolean; theme: any }>`
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  font-weight: 700;
  color: ${({ isDarkMode, theme }) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamily};
`;

const SubTitleText = styled(Text)<{ isDarkMode: boolean; theme: any }>`
  font-size: ${({ theme }) => theme.fontSizes.regular}px;
  font-weight: 500;
  color: ${({ isDarkMode, theme }) =>
    isDarkMode ? theme.colors.white : theme.colors.dark};
  font-family: ${({ theme }) => theme.fontFamily};
`;
