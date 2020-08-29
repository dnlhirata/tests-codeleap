from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


def user_create(username: str, email: str, password: str) -> User:
    user = User.objects.create_user(username=username, email=email, password=password)
    return user


def user_get_token(*, user: User) -> str:
    token, created = Token.objects.get_or_create(user=user)
    return token.key


def user_login(*, username: str, password: str) -> User:
    user = authenticate(username=username, password=password)
    if not user:
        raise PermissionError("Invalid email or password")
    return user
