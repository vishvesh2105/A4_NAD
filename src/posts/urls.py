from django.urls import path
from .views import post_list_and_create
from .views import hello_world_view
from .views import load_post_data_view

app_name = 'posts'

urlpatterns = [
    path('', post_list_and_create, name='main-board'),
    path('data/', load_post_data_view, name='post-data'),

    path ('hello-world/', hello_world_view, name='hello-world'),
]
