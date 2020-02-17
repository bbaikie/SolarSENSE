from SolarSENSE.models import Video
from SolarSENSE.models import CustomTag
import random

def run():

    vidNum = 5
    tempTagNum = 5
    sunTagNum = 5
    waterTagNum = 5
    phosTagNum = 5

    # Videos
    for x in range(vidNum):
        Video.objects.create(name="Test" + str(x), content="Test" + str(x) + ".jpg")

    # Temperature
    for x in range(tempTagNum):
        min = random.uniform(0, 100)
        max = random.uniform(0, 100)
        num = random.randrange(0, vidNum)

        t = CustomTag.objects.create(min=min ,max=max , name=str(min) + " <-> " + str(max), type="temperature")
        v = Video.objects.get(name="Test" + str(num))
        v.tags.add(t)

    # Sunlight
    for x in range(sunTagNum):
        min = random.uniform(0, 100)
        max = random.uniform(0, 100)
        num = random.randrange(0, vidNum)

        CustomTag.objects.create(min=min ,max=max , name=str(min) + " <-> " + str(max), type="sunlight")
        v = Video.objects.get(name="Test" + str(num))
        v.tags.add(t)

    # Water
    for x in range(waterTagNum):
        min = random.uniform(0, 100)
        max = random.uniform(0, 100)
        num = random.randrange(0, vidNum)

        t = CustomTag.objects.create(min=min ,max=max , name=str(min) + " <-> " + str(max), type="water")
        v = Video.objects.get(name="Test" + str(num))
        v.tags.add(t)

    # Phosphate
    for x in range(phosTagNum):
        min = random.uniform(0, 100)
        max = random.uniform(0, 100)
        num = random.randrange(0, vidNum)

        t = CustomTag.objects.create(min=min ,max=max , name=str(min) + " <-> " + str(max), type="phosphate")
        v = Video.objects.get(name="Test" + str(num))
        v.tags.add(t)
