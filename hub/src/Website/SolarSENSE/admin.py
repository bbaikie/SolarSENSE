from django.contrib import admin
from .models import Video
from django.http import HttpResponseRedirect
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse

class BatchUploadAdmin(admin.ModelAdmin):
    change_list_template = "admin/video_upload_list.html"
    actions = ["add_tags"]

    def add_tags(self, request, queryset):
        selected = queryset.values_list("pk", flat=True)
        ct = ContentType.objects.get_for_model(queryset.model)
        # self.message_user(request, "Successfully added tag")
        return HttpResponseRedirect("/changeTags/?ct=%s&ids=%s" % (
            ct.pk, ','.join(str(pk) for pk in selected),
        ))
    add_tags.short_description = "Add Tags"

admin.site.register(Video, BatchUploadAdmin)


