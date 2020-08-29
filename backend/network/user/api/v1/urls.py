from django.urls import path

from user.api.v1.views import LoginView, CreateUserView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login-view'),
    path('create/', CreateUserView.as_view(), name='create-user-view'),
]
