import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface ModalProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomModal: React.FC<ModalProps> = ({ visible, title, message, onConfirm, onCancel }) => {
  const { t } = useTranslation();

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <ModalContainer>
        <ModalContent>
          <ModalText>{title}</ModalText>
          <SubModalText>{message}</SubModalText>
          <ModalButtons>
            <CancelButton onPress={onCancel}>
              <ModalButtonText>{t('취소')}</ModalButtonText>
            </CancelButton>
            <ConfirmButton onPress={onConfirm}>
              <ModalButtonText>{t('확인')}</ModalButtonText>
            </ConfirmButton>
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
`;

const ModalText = styled(Text)`
  font-size: 18px;
  margin-bottom: 8px;
`;

const SubModalText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 20px;
`;

const ModalButtons = styled(View)`
  flex-direction: row;
  gap: 12px;
`;

const CancelButton = styled(TouchableOpacity)`
  width: 45%;
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: 10px 20px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const ConfirmButton = styled(TouchableOpacity)`
  width: 45%;
  padding: 10px 20px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;
