from django.contrib.auth.models import User
from rest_framework import viewsets, serializers, status, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from network.mixins import PaginatorMixin
from post.api.v1.permissions import IsOwnerOrReadOnly
from post.models import Post
from post import services


class PostViewSet(PaginatorMixin, viewsets.ModelViewSet):
    class InputSerializer(serializers.Serializer):
        title = serializers.CharField(max_length=50, required=True)
        content = serializers.CharField(required=True)

    class OutputSerializer(serializers.ModelSerializer):
        class OutputSerializer(serializers.ModelSerializer):
            class Meta:
                model = User
                fields = ('id', 'first_name', 'last_name', 'username', 'email')

        user = OutputSerializer(many=False, read_only=True)

        class Meta:
            model = Post
            fields = '__all__'

    queryset = Post.objects.all()
    serializer_class = InputSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    pagination_class = PageNumberPagination

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        post = services.post_create(user=request.user, **serializer.validated_data)

        return Response(self.OutputSerializer(post).data)

    def list(self, request, *args, **kwargs):
        posts = services.post_get_list()

        page = self.paginate_queryset(posts)
        if page is not None:
            return self.get_paginated_response(self.OutputSerializer(page, many=True).data)

        return Response(self.OutputSerializer(page, many=True).data)

    def retrieve(self, request, *args, **kwargs):
        post = services.post_get(id=kwargs.get('pk'))

        return Response(self.OutputSerializer(post, many=False).data)

    def partial_update(self, request, *args, **kwargs):
        class InputSerializer(serializers.Serializer):
            title = serializers.CharField(max_length=50, required=False)
            content = serializers.CharField(required=False)

        serializer = InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        post = services.post_get(id=kwargs.get('pk'))
        self.check_object_permissions(request, post)

        post = services.post_update(post=post, **serializer.validated_data)

        return Response(self.OutputSerializer(post, many=False).data)

    def update(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        post = services.post_get(id=kwargs.get('pk'))
        self.check_object_permissions(request, post)

        post = services.post_update(post=post, **serializer.validated_data)

        return Response(self.OutputSerializer(post).data)

    def destroy(self, request, *args, **kwargs):
        post = services.post_get(id=kwargs.get('pk'))
        self.check_object_permissions(request, post)

        services.post_destroy(post=post)

        return Response(status=status.HTTP_200_OK)


