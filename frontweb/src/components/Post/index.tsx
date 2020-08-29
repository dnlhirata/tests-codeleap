import React, { useState, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import EditSvg from '../../assets/icons/edit.svg';
import DeleteSvg from '../../assets/icons/delete.svg';

import TextInput from '../TextInput';

import Button from '../Button';

import { Container } from './styles';

interface PostProps {
  post: {
    id: number;
    title: string;
    content: string;
    created: string;
    user: {
      username: string;
      email: string;
    };
  };
  handleDelete(postId: number): Promise<void>;
}

const Post: React.FC<PostProps> = ({ post, handleDelete }) => {
  const formRef = useRef<FormHandles>(null);

  const [aboutToDelete, setAboutToDelete] = useState(false);
  const [isEditting, setIsEditting] = useState(false);

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
            <Button colorType="secondary">Não</Button>
          </div>
        </div>
      </Container>
    );
  } else if (isEditting) {
    return (
      <Container>
        <Form ref={formRef} onSubmit={() => {}}>
          <div className="post-header">
            <TextInput name="title" defaultValue={post.title} />
          </div>

          <div className="post-info">
            <p>
              <strong>@{post.user.username}</strong>
            </p>
            <p>{post.created}</p>
          </div>

          <TextInput name="content" defaultValue={post.content} />
        </Form>
      </Container>
    );
  } else {
    return (
      <Container>
        <div className="post-header">
          <span>{post.title}</span>

          <div>
            <button onClick={() => setAboutToDelete(true)}>
              <img src={DeleteSvg} alt="" />
            </button>
            <button onClick={() => setIsEditting(true)}>
              <img src={EditSvg} alt="" />
            </button>
          </div>
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
