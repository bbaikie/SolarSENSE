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
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from SolarSENSE.models import Video, SensorCollections
from django.urls import reverse
from django.db.models import Case, CharField, Value, When, Count
from django.contrib.contenttypes.models import ContentType
from django.views.generic import ListView

# For testing purposes
def test(request):
    return HttpResponse('This is a test page')

# Shows list of videos
class VideosView(ListView):
    paginate_by = 7
    model = Video
    template_name = "list.html"

    def get_queryset(self):
        if SensorCollections.objects.all().count() > 0:
            latest = SensorCollections.objects.order_by('-id')[0]
            result = self.determine_boundary(latest.sunlight, latest.phosphate, latest.moisture, 
            latest.temperature)
            return latest.filter(tags__name__in=result)
        else: 
            return super().get_queryset()
    
    def determine_boundary(self, sun, phos, moisture, temp):
        tags = []
        if sun > 100:
            tags.append("High Sunlight")
        elif sun > 50:
            tags.append("Medium Sunlight")
        else:
            tags.append("Low Sunlight")

        if sun > 100:
            tags.append("High Phosphate")
        elif sun > 50:
            tags.append("Medium Phosphate")
        else:
            tags.append("Low Phosphate")

        if sun > 100:
            tags.append("High Moisture")
        elif sun > 50:
            tags.append("Medium Moisture")
        else:
            tags.append("Low Moisture")

        if sun > 100:
            tags.append("High Moisture")
        elif sun > 50:
            tags.append("Medium Moisture")
        else:
            tags.append("Low Moisture")
        return tags

# Writes uploaded videos to database and handles upload to file system
def uploadVideos(request):
    if request.method == "POST":
        files = request.FILES.getlist('videos')
        for f in files:
            Video.objects.create(name=f.name, content=f)
    return HttpResponseRedirect(reverse("admin:SolarSENSE_video_changelist"))

# Generates the page to add tags to all videos selected in admin.
def changeTags(request):
    if request.method == "GET":
        request.session["ct"] = request.GET["ct"]
        request.session["ids"] = request.GET["ids"].split(",")
        return render(request, "admin/set_tag_page.html", {})
    elif request.method == "POST":
        objType = ContentType.objects.get_for_id(request.session["ct"])
        video_query_set = []
        for id in request.session["ids"]:
            video_query_set.append(objType.get_object_for_this_type(pk=id))
        
        for video in video_query_set:
            for tag in request.POST.getlist("Option"):
                video.tags.add(tag)
    return HttpResponseRedirect(reverse("admin:SolarSENSE_video_changelist"))

# Renders the statistics page
def stats(request):
    sensorQuery = SensorCollections.objects.all() 
    context = {
        "query":sensorQuery 
    }
    return render(request,'stats.html',context)  
