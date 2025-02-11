import {View, Text, Alert, Switch} from 'react-native';
import styled from 'styled-components';
import React from 'react';


export const ToggleSettingItem = ({
  title,
  value,
  onToggle,
}: {
  title: string;
  value: boolean;
  onToggle: () => void;
}) => {
  return (
    <Container>
      <Row>
        <NewsText>{title}</NewsText>
        <ToggleSwitch
          trackColor={{false: '#A9A9A955', true: '#8A715D'}}
          thumbColor="#FFF"
          ios_backgroundColor="#D3D3D3"
          onValueChange={onToggle}
          value={value}
        />
      </Row>
    </Container>
  );
};


const Container = styled(View)`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 20px 0 20px;
  padding: 16px;
  border-radius: 10px;
  background: ${({theme}) => theme.colors.white};
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const NewsText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;

const ToggleSwitch = styled(Switch)`
`;
