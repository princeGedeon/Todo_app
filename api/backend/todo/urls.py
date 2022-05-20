from django.urls import path

from todo.views import ListTask, CreateTask,UpdateTask, DestroyTask


urlpatterns = [

    path('list-task/', ListTask.as_view(),name="list_tasks"),
    path("create-task/",CreateTask.as_view(),name="task_add"),
    path("update/<pk>/task/", UpdateTask.as_view(), name="task_add"),
    path("destroy/<pk>/task/", DestroyTask.as_view(), name="task_delete")
]