import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import lowerCase from 'lower-case';
import { Keyboard, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  FormHeader,
  Input,
  SubmitButton,
  TextMessageError,
  List,
  User,
  ButtonRemove,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default function Main({ navigation }) {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      const usersStorage = await AsyncStorage.getItem('users');

      if (usersStorage) {
        setUsers(JSON.parse(usersStorage));
      }
    }

    loadUsers();
  }, []);

  async function handleAddUser() {
    try {
      Keyboard.dismiss();
      setNewUser('');
      setLoading(true);

      if (!newUser) {
        setInputError(true);
        setMessageError('Insira o nome do usuário');
        setLoading(false);
        return;
      }

      if (users.length > 0) {
        const userAlreadyExists = users.find(
          user => lowerCase(user.login) === lowerCase(newUser)
        );

        if (userAlreadyExists) {
          setInputError(true);
          setMessageError('Usuário já existe na lista');
          setLoading(false);
          return;
        }
      }

      const response = await api.get(`users/${newUser}`);

      const { name, login, bio, avatar_url } = response.data;

      const dataUsersUpdate = [...users, { name, login, bio, avatar_url }];

      setUsers(dataUsersUpdate);
      setMessageError('');
      setInputError(false);

      AsyncStorage.setItem('users', JSON.stringify(dataUsersUpdate));
    } catch (err) {
      Alert.alert('Error', 'Usuário não existe');
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveUser(login) {
    const dataUsers = await users.filter(user => user.login !== login);

    AsyncStorage.setItem('users', JSON.stringify(dataUsers));

    setUsers(dataUsers);
  }

  function handleNavigate(user) {
    navigation.navigate('User', { user });
  }

  return (
    <Container>
      <Form>
        <FormHeader>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => setNewUser(text)}
            returnKeyType="send"
            onSubmitEditing={handleAddUser}
            error={inputError}
          />
          <SubmitButton loading={loading} onPress={handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </FormHeader>
        <TextMessageError>{messageError}</TextMessageError>
      </Form>

      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <ButtonRemove onPress={() => handleRemoveUser(item.login)}>
              <Icon name="clear" size={25} color="#999" />
            </ButtonRemove>

            <Avatar source={{ uri: item.avatar_url }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton onPress={() => handleNavigate(item)}>
              <ProfileButtonText>Ver Repositórios</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
      <List />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Usuários',
};

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
