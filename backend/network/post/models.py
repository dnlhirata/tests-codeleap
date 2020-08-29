from django.contrib.auth.models import User
from django.db import models
from django_extensions.db.models import TimeStampedModel


class Post(TimeStampedModel):
    title = models.CharField(max_length=50)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='posts')
