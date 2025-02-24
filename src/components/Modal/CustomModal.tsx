import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext'; 

interface ModalProps {
  visible: boolean;
  title: string;
  message: string;
  leftButton?: string;
  rightButton?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const CustomModal: React.FC<ModalProps> = ({
  visible,
  title,
  message,
  leftButton = '',
  rightButton = '',
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <ModalContainer>
        <ModalContent>
          <ModalText style={{ fontFamily: theme.fontFamily }}>{title}</ModalText> 
          <SubModalText style={{ fontFamily: theme.fontFamily }}>{message}</SubModalText> 
          <ModalButtons singleButton={!onCancel || !onConfirm}>
            {onCancel && (
              <CancelButton onPress={onCancel}>
                <ModalButtonText style={{ fontFamily: theme.fontFamily }}>{leftButton}</ModalButtonText>
              </CancelButton>
            )}
            {onConfirm && (
              <ConfirmButton onPress={onConfirm}>
                <ModalButtonText style={{ fontFamily: theme.fontFamily }}>{rightButton}</ModalButtonText>
              </ConfirmButton>
            )}
          </ModalButtons>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default CustomModal;

// 스타일
const ModalContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled(View)`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`;

const ModalButtonText = styled(Text)`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
    font-family: ${({theme}) => theme.fontFamily};
`;

const ModalText = styled(Text)`
  font-size: 18px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text};
    font-family: ${({theme}) => theme.fontFamily};
`;

const SubModalText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkGray};
    font-family: ${({theme}) => theme.fontFamily};
  margin-bottom: 20px;
`;

const ModalButtons = styled(View)<{ singleButton?: boolean }>`
  flex-direction: row;
  gap: 12px;
  ${({ singleButton }) => singleButton && 'justify-content: center;'}
`;

const CancelButton = styled(TouchableOpacity)<{ singleButton?: boolean }>`
  width: 45%;
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: 10px 20px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  width: ${({ singleButton }) => (singleButton ? '100%' : '45%')};
`;

const ConfirmButton = styled(TouchableOpacity)<{ singleButton?: boolean }>`
  padding: 10px 20px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  width: ${({ singleButton }) => (singleButton ? '100%' : '45%')};
`;
