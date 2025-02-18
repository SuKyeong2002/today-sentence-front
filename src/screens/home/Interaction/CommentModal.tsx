import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Modal, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components";
import { useCommentMutation } from "@/hooks/useCommentMutation";
import { useComments } from "@/hooks/useComment.ts";
import { formatDate } from "@/utils/formatDate";

interface CommentModalProps {
  postId: number;
  isVisible: boolean;
  onClose: () => void;
  onCommentAdded: () => void;
}

const CommentModal = ({ postId, isVisible, onClose, onCommentAdded }: CommentModalProps) => {
  const [newComment, setNewComment] = useState("");
  const { data: comments, isLoading } = useComments(postId);
  const commentMutation = useCommentMutation(postId);

  // 댓글 등록
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await commentMutation.mutateAsync(newComment);
      setNewComment(""); 
      onCommentAdded();
    } catch (error) {
      Alert.alert("댓글 등록 실패", "댓글 등록 중 오류 발생");
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <ModalContainer>
        <ModalContent>
          <Title>댓글</Title>
          {isLoading ? (
            <LoadingText>불러오는 중...</LoadingText>
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <CommentItem>
                  <Nickname>{item.nickname}</Nickname>
                  <CommentText>{item.content}</CommentText>
                  <CommentDate>{formatDate(item.createdAt)}</CommentDate>
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
            <SendButton onPress={handleAddComment}>
              <SendButtonText>등록</SendButtonText>
            </SendButton>
          </InputContainer>

          <CloseButton onPress={onClose}>
            <CloseButtonText>닫기</CloseButtonText>
          </CloseButton>
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

const ModalContent = styled(View)`
  width: 90%;
  height: 80%;
  background-color: ${({theme}) => theme.colors.white};
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const LoadingText = styled(Text)`
  text-align: center;
  font-size: 16px;
  margin: 10px;
`;

const CommentItem = styled(View)`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const Nickname = styled(Text)`
  font-weight: bold;
`;

const CommentText = styled(Text)`
  margin-top: 5px;
`;

const CommentDate = styled(Text)`
  font-size: 12px;
  color: gray;
  margin-top: 5px;
`;

const InputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const CommentInput = styled(TextInput)`
  flex: 1;
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  border-radius: 5px;
`;

const SendButton = styled(TouchableOpacity)`
  margin-left: 10px;
  padding: 10px;
  background-color: blue;
  border-radius: 5px;
`;

const SendButtonText = styled(Text)`
  color: white;
  font-weight: bold;
`;

const CloseButton = styled(TouchableOpacity)`
  margin-top: 10px;
  padding: 10px;
  background-color: gray;
  border-radius: 5px;
  align-items: center;
`;

const CloseButtonText = styled(Text)`
  color: white;
  font-weight: bold;
`;
