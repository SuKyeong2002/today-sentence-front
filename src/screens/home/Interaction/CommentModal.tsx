import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import styled from 'styled-components';
import {useCommentMutation} from '@/hooks/useCommentMutation';
import {useComments} from '@/hooks/useComment.ts';
import {formatDate} from '@/utils/formatDate';
import {Image} from 'react-native';

interface CommentModalProps {
  postId: number;
  isVisible: boolean;
  onClose: () => void;
  onCommentAdded: () => void;
}

const CommentModal = ({
  postId,
  isVisible,
  onClose,
  onCommentAdded,
}: CommentModalProps) => {
  const [newComment, setNewComment] = useState('');
  const {data: comments, isLoading} = useComments(postId);
  const commentMutation = useCommentMutation(postId);

  // 댓글 등록
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await commentMutation.mutateAsync(newComment);
      setNewComment('');
      onCommentAdded();
    } catch (error) {
      Alert.alert('댓글 등록 실패', '댓글 등록 중 오류 발생');
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <ModalContainer>
        <ModalContent>
          <TitleContainer>
            <Title>댓글</Title>
            <TouchableOpacity onPress={onClose}>
              <CancelImage
                source={require('@/assets/image/cancel.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </TitleContainer>
          {isLoading ? (
            <LoadingText>불러오는 중...</LoadingText>
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <CommentItem>
                  <ProfileContainer>
                    <ProfileImage
                      source={require('@/assets/image/other_user.png')}
                      resizeMode="contain"
                    />
                    <ProfileTextContainer>
                      <ProfileTextWrapper>
                        <Nickname>{item.nickname}</Nickname>
                        <CommentDate>{formatDate(item.createdAt)}</CommentDate>
                      </ProfileTextWrapper>
                      <CommentText>{item.content}</CommentText>
                    </ProfileTextContainer>
                  </ProfileContainer>
                </CommentItem>
              )}
            />
          )}

          <InputContainer>
            <CommentInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="댓글을 입력해주세요."
            />
            <TouchableOpacity
              onPress={() => {
                handleAddComment();
              }}>
              <SendImage
                source={require('@/assets/image/send.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </InputContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default CommentModal;

// 스타일
const ModalContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const TitleContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ModalContent = styled(View)`
  width: 90%;
  height: 80%;
  background-color: ${({theme}) => theme.colors.white};
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.xLarge}px;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${({theme}) => theme.colors.text};
`;

const LoadingText = styled(Text)`
  text-align: center;
  font-size: 16px;
  margin: 10px;
`;

const CommentItem = styled(View)`
  padding: 20px 0 20px 0;
`;

// 프로필
const ProfileContainer = styled(View)`
  gap: 5px;
  flex-direction: row;
  justify-content: flex-start;
`;

const ProfileTextContainer = styled(View)`
  gap: 5px;
  width: 80%;
  flex-direction: column;
`;

const ProfileTextWrapper = styled(View)`
  gap: 8px;
  width: 90%;
  flex-direction: row;
  align-items: center;
`;

const Nickname = styled(Text)`
  font-weight: 600;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  color: ${({theme}) => theme.colors.text};
`;

// 댓글
const CommentText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;

const CommentDate = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.darkGray};
`;

const InputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  display: flex;
  padding: 10px 0 0px 10px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const CommentInput = styled(TextInput)`
  width: 90%;
  padding: 10px;
  background-color: #F0F0F0;
  border-radius: 30px;
`;

// 이미지
const ProfileImage = styled(Image)`
  margin-right: 10px;
  width: 32px;
  height: 32px;
`;

const CancelImage = styled(Image)`
  width: 24px;
  height: 24px;
`;

const SendImage = styled(Image)`
  width: 24px;
  height: 24px;
`;
