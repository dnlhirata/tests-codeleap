import React, { useRef, useEffect, useState, useCallback } from 'react';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Post from '../../components/Post';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import { Container, Content, Form } from './styles';

interface Post {
  id: number;
  title: string;
  content: string;
  created: string;
  user: {
    username: string;
    email: string;
  };
}

const Main: React.FC = () => {
  const formRef = useRef(null);

  const { token } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get('/post/api/v1/post/').then(response => {
      const posts = response.data.results;

      setPosts(posts);
    });
  }, []);

  const handleDelete = useCallback(
    async postId => {
      await api.delete(`/post/api/v1/post/${postId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const updatedPosts = posts.filter(post => post.id !== postId);

      setPosts(updatedPosts);
    },
    [posts, token],
  );

  return (
    <Container>
      <Content>
        <h1>
          <span>CodeLeap Network</span>
        </h1>

        <div>
          <Form ref={formRef} onSubmit={() => {}}>
            <h4>What's on your mind?</h4>
            <TextInput
              name="username"
              label="Username"
              placeholder="Hello World"
            />
            <TextInput
              name="password"
              label="Password"
              type="password"
              placeholder="Content here"
            />
            <div className="create-button">
              <Button>Create</Button>
            </div>
          </Form>
        </div>

        {posts.map(post => (
          <Post key={post.id} post={post} handleDelete={handleDelete} />
        ))}
      </Content>
    </Container>
  );
};

export default Main;
