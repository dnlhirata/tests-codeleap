import React, { useState, useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import EditSvg from '../../assets/icons/edit.svg';
import DeleteSvg from '../../assets/icons/delete.svg';
import TextInput from '../TextInput';
import TextAreaInput from '../TextAreaInput';
import Button from '../Button';

import api from '../../services/api';

import { useAuth, User } from '../../hooks/auth';

import { Container } from './styles';

interface PostProps {
  post: {
    id: number;
    title: string;
    content: string;
    created: string;
    user: User;
  };
  handleDelete(postId: number): Promise<void>;
}

interface PostData {
  title: string;
  content: string;
}

const Post: React.FC<PostProps> = ({ post, handleDelete }) => {
  const formRef = useRef<FormHandles>(null);

  const { user, token } = useAuth();

  const [aboutToDelete, setAboutToDelete] = useState(false);
  const [isEditting, setIsEditting] = useState(false);

  const handleEdit = useCallback(
    async (data: PostData) => {
      try {
        const response = await api.put(`/post/api/v1/post/${post.id}/`, data, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (response.status === 200) {
          post.title = data.title;
          post.content = data.content;
        }
      } catch (err) {
        // Tratamento do erro
      }

      setIsEditting(false);
    },
    [post, token],
  );

  if (aboutToDelete) {
    return (
      <Container>
        <div className="post-header">
          <span>{post.title}</span>

          <div>
            <button onClick={() => setAboutToDelete(true)}>
              <img src={DeleteSvg} alt="" />
            </button>
            <button>
              <img src={EditSvg} alt="" />
            </button>
          </div>
        </div>

        <div className="post-to-delete">
          <p>Tem certeza que deseja deletar?</p>

          <div>
            <Button colorType="danger" onClick={() => handleDelete(post.id)}>
              Sim
            </Button>
            <Button
              colorType="secondary"
              onClick={() => setAboutToDelete(false)}
            >
              Não
            </Button>
          </div>
        </div>
      </Container>
    );
  } else if (isEditting) {
    return (
      <Container>
        <Form ref={formRef} onSubmit={handleEdit}>
          <div className="post-header">
            <TextInput name="title" defaultValue={post.title} />
          </div>

          <div className="post-info">
            <p>
              <strong>@{post.user.username}</strong>
            </p>
            <p>{post.created}</p>
          </div>

          <TextAreaInput name="content" defaultValue={post.content} rows={5} />

          <div className="save-btn">
            <Button type="submit">Save</Button>
            <Button colorType="secondary" onClick={() => setIsEditting(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    );
  } else {
    return (
      <Container>
        <div className="post-header">
          <span>{post.title}</span>

          {user.id === post.user.id && (
            <div>
              <button onClick={() => setAboutToDelete(true)}>
                <img src={DeleteSvg} alt="" />
              </button>
              <button onClick={() => setIsEditting(true)}>
                <img src={EditSvg} alt="" />
              </button>
            </div>
          )}
        </div>

        <div className="post-info">
          <p>
            <strong>@{post.user.username}</strong>
          </p>
          <p>{post.created}</p>
        </div>

        <div className="post-content">{post.content}</div>
      </Container>
    );
  }
};

export default Post;
