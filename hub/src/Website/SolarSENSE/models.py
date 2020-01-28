from django.db import models

class Videos(models.Model):

    def __str__(self):
        return self.name

    content = models.FileField(_(""), upload_to="puppy1.jpg", max_length=100)
)