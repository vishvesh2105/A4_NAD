from django.urls import path
from .views import post_list_and_create
from .views import load_post_data_view
from .views import like_unlike_post
from .views import post_detail_data_view
from .views import post_detail

app_name = 'posts'

urlpatterns = [
    path('', post_list_and_create, name='main-board'),
    path('like-unlike/', like_unlike_post, name='like-unlike'),
    path('<pk>', post_detail, name='post-detail'),

    path('data/<int:num_posts>/', load_post_data_view, name='posts-data'),
    path('<pk>/data/', post_detail_data_view, name='post-detail-data'),
]