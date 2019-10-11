import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View`
  flex-direction: column;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const FormHeader = styled.View`
  flex-direction: row;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  border: ${props => (props.error ? '2px solid #e9794b' : '1px solid #eee')};
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #e9794b;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const TextMessageError = styled.Text`
  font-size: 14px;
  color: #e9794b;
  font-weight: bold;
  text-align: left;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
  position: relative;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #eee;
`;

export const ButtonRemove = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  position: absolute;
  z-index: 2;
  top: 5px;
  right: 0px;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 14px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background: #e9794b;
  height: 36px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;
