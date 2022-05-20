from rest_framework import serializers

from todo.models import Todo


class TodoSerializers(serializers.ModelSerializer):
    class Meta:
        model=Todo
        fields=['id',"title",'status']