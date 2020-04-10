"""
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.test, name='test'),
    path('templateTest/', views.templateTest, name='templateTest'),
    path('tagTest/', views.tagTest, name="tagTest"),
    path('tagTest/showTags/', views.showTags, name="showTags"),
    path('uploadVideos/', views.uploadVideos, name="uploadVideos"),
    path('changeTags/', views.changeTags, name="changeTags"),
    path('statistics/', views.stats, name='statistics'),
]
