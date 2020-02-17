from SolarSENSE.models import Video
from SolarSENSE.models import CustomTag
import random

def run():
    # Temperature
    for x in range(5):
        min = random.uniform(0, 100)
        max = random.uniform(0, 100)
        Video.objects.create(min=min ,max=max , name=str(min) + " -> " + str(max), type="temperature")

    # Sunlight
    for x in range(5):
        min = random.uniform(0, 100)
        max = random.uniform(0, 100)
        Video.objects.create(min=min ,max=max , name=str(min) + " -> " + str(max), type="sunlight")

    # Water
    for x in range(5):
        min = random.uniform(0, 100)
        max = random.uniform(0, 100)
        Video.objects.create(min=min ,max=max , name=str(min) + " -> " + str(max), type="water")

    # Phosphate
    for x in range(5):
        min = random.uniform(0, 100)
        max = random.uniform(0, 100)
        Video.objects.create(min=min ,max=max , name=str(min) + " -> " + str(max), type="phosphate")