from django.contrib import admin
from .models import Video

class BatchUploadAdmin(admin.ModelAdmin):
    change_list_template = "admin/video_upload_list.html"

admin.site.register(Video, BatchUploadAdmin)

