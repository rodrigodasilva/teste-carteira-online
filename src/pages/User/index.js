import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  Info,
  Title,
  Author,
} from './styled';

export default function User({ navigation }) {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const user = navigation.getParam('user');

  useEffect(() => {
    async function loadStars() {
      const perPage = 15;

      const response = await api.get(`users/${user.login}/repos`, {
        params: {
          page,
          per_page: perPage,
        },
      });

      setRepositories(
        page >= 2 ? [...repositories, ...response.data] : response.data
      );
      setLoading(false);
    }

    loadStars();
  }, [page]);

  function loadMore() {
    setPage(page + 1);
  }

  function handleNavigate(repository) {
    navigation.navigate('Repository', { repository });
  }

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar_url }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      {loading ? (
        <ActivityIndicator color="#e9794b" size={30} marginTop={20} />
      ) : (
        <Stars
          data={repositories}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred onPress={() => handleNavigate(item)}>
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      )}
    </Container>
  );
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
