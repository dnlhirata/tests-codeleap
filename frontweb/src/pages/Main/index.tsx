import React, { useRef, useEffect, useState, useCallback } from 'react';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Post from '../../components/Post';

import api from '../../services/api';

import { useAuth, User } from '../../hooks/auth';

import { Container, Content, Form } from './styles';
import TextAreaInput from '../../components/TextAreaInput';

interface Post {
  id: number;
  title: string;
  content: string;
  created: string;
  user: User;
}

interface PostFormData {
  title: string;
  content: string;
}

const Main: React.FC = () => {
  const formRef = useRef(null);

  const { user, token } = useAuth();

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

  const handleCreate = useCallback(
    async (data: PostFormData) => {
      try {
        const response = await api.post('/post/api/v1/post/', data, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const post = response.data as Post;

        const newPosts = [post].concat(posts);

        setPosts(newPosts);
      } catch (err) {
        // Tratamento de erro
      }
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
          <Form ref={formRef} onSubmit={handleCreate}>
            <h4>What's on your mind?</h4>
            <TextInput name="title" label="Titulo" placeholder="Hello World" />
            <TextAreaInput
              name="content"
              label="Mensagem"
              placeholder="Content here"
              rows={6}
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
