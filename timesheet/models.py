import numbers
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from typing import List, Optional
from rest_framework import serializers
from django.core import serializers as core_serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class Daily(models.Model):
    creation_date = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    day = models.DateField(blank=False, null=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.TextField()
    class Meta:
        unique_together = ('day', 'user',)    

class Task(models.Model):
    daily = models.ForeignKey(Daily, related_name="tasks", on_delete=models.CASCADE, blank=False, null=False)
    comment = models.TextField(blank=True, null=True)
    number_of_hours = models.FloatField(blank=False, null=False)
    project = models.CharField(max_length=255, blank=False, null=False)

class Commit(models.Model):
    task = models.ForeignKey(Task, related_name="commits", on_delete=models.CASCADE)
    commit = models.URLField(blank=False, null=False)

class CommitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    commits = CommitSerializer(many=True)

    class Meta:
        model = Task
        fields = '__all__'

class DailySerializer(serializers.ModelSerializer):
    user = UserSerializer()
    tasks = TaskSerializer(many=True)

    class Meta:
        model = Daily
        fields = '__all__'

