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


class SensorCollections(models.Model):
    date_time = models.DateTimeField(auto_now_add=True)
    moisture = models.DecimalField(max_digits=5, decimal_places=2 , default='0')
    temperature = models.DecimalField(max_digits=5, decimal_places=2, default='0')
    sunlight = models.DecimalField(max_digits=5, decimal_places=2, default='0')
    phosphate = models.DecimalField(max_digits=5, decimal_places=2, default='0')
