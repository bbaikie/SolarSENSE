from django.urls import path
from . import views
from SolarSENSE.views import VideosView

urlpatterns = [
    path('test/', views.test, name='test'),
    path('uploadVideos/', views.uploadVideos, name="uploadVideos"),
    path('changeTags/', views.changeTags, name="changeTags"),
    path('', VideosView.as_view()),
]
