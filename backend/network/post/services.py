from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError

from post.models import Post


def post_create(user: User, title: str, content: str) -> Post:
    return Post.objects.create(user_id=user.id, title=title, content=content)


def post_get_list() -> list:
    return Post.objects.order_by('-created')


def post_get(id: str) -> Post:

    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        raise ValidationError('Post does not exist')

    return post


def post_update(post: Post, **kwargs) -> Post:
    try:
        for (key, value) in kwargs.items():
            setattr(post, key, value)

        post.save()
    except Post.DoesNotExist:
        raise ValidationError('Post does not exist')

    return post


def post_destroy(post: Post) -> None:
    try:
        post.delete()
    except Post.DoesNotExist:
        raise ValidationError('Post does not exist')