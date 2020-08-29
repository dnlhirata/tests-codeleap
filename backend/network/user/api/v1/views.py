from django.contrib.auth.models import User
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from user import services


class LoginView(APIView):
    class InputSerializer(serializers.Serializer):
        username = serializers.CharField(required=True)
        password = serializers.CharField(required=True)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = (
                "id",
                "username",
                "first_name",
                "last_name",
                "email",
            )

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = services.user_login(**serializer.validated_data)
        token = services.user_get_token(user=user)

        return Response(
            {
                "token": token,
                "user": self.OutputSerializer(instance=user).data,
            },
            status=status.HTTP_200_OK,
        )
