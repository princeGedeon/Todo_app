from django.db import models

# Create your models here.
class Todo(models.Model):
    title=models.CharField(max_length=300)
    status=models.BooleanField(default=False)
    date_created=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)