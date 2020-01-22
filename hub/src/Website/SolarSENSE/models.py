from django.db import models

class SensorData(models.Model):
	temperature = models.DecimalField(max_digits=5, decimal_places=2)
	water = models.DecimalField(max_digits=5, decimal_places=2)
	phosphate = models.DecimalField(max_digits=5, decimal_places=2)
	sunshine = models.DecimalField(max_digits=5, decimal_places=2)
