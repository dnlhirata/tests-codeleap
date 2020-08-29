from django.urls import path

from user.api.v1.views import LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login-view'),
]
