from django.contrib import admin
from .models import Video

class BatchUploadAdmin(admin.ModelAdmin):
    change_list_template = "admin/video_upload_list.html"
    
    # def changelist_view(self, request, extra_context=None):
    #     extra_context = extra_context or {}
    #     return super(BatchUploadAdmin, self).changelist_view(request, extra_context=extra_context)

admin.site.register(Video, BatchUploadAdmin)

