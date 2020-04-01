from django.urls import path
from . import views
from jsonrpc import jsonrpc_site


urlpatterns = [
    path('', views.test, name='test'),
    path('templateTest/', views.templateTest, name='templateTest'),
    path('tagTest/', views.tagTest, name="tagTest"),
    path('tagTest/showTags/', views.showTags, name="showTags"),
    path('uploadVideos/', views.uploadVideos, name="uploadVideos"),
    path('changeTags/', views.changeTags, name="changeTags"),
    url(r'^json/$', jsonrpc_site.dispatch, name='jsonrpc_mountpoint'),
]
