from django.db import models

class Video(models.Model):

    def __str__(self):
        return self.name

    name = models.CharField(max_length=255)
    content = models.FileField(upload_to='', max_length=100)

