from django.db import models
from django.utils.translation import ugettext_lazy as _
from taggit.managers import TaggableManager
from taggit.models import TagBase, GenericTaggedItemBase

class CustomTag(TagBase):
    type = models.CharField(max_length=255)
    min = models.DecimalField(max_digits=5, decimal_places=2)
    max = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        verbose_name = _("Tag")
        verbose_name_plural = _("Tags")

class DataTagged(GenericTaggedItemBase):
    tag = models.ForeignKey(
        CustomTag,
        on_delete=models.CASCADE,
        related_name="%(app_label)s_%(class)s_items"
    )

class Video(models.Model):

    def __str__(self):
        return self.name

    name = models.CharField(max_length=255)
    content = models.FileField()
    tags = TaggableManager(blank=True)
