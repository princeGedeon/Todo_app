from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView

from todo.models import Todo
from todo.serializers import TodoSerializers


class ListTask(ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializers

class CreateTask(CreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializers

class UpdateTask(UpdateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializers

class DestroyTask(DestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializers