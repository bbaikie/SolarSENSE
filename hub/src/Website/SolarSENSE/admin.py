from django.contrib import admin
from .models import Video

class BatchUploadAdmin(admin.ModelAdmin):
    change_list_template = "admin/video_upload_list.html"
    actions = ["add_tags"]

    def add_tags(self, request, queryset):
        self.message_user(request, "Successfully added tag")
    add_tags.short_description = "Add Tags"

admin.site.register(Video, BatchUploadAdmin)


