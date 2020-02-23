from django.urls import path
from . import views

urlpatterns = [
    path('', views.test, name='test'),
    path('templateTest/', views.templateTest, name='templateTest'),
    path('tagTest/', views.tagTest, name="tagTest"),
    path('tagTest/showTags/', views.showTags, name="showTags")
]
