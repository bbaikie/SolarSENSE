from django.test import TransactionTestCase
from SolarSENSE.models import Video
from SolarSENSE.models import CustomTag

class TaggsTestCase(TransactionTestCase):
    videos = []
    def setUp(self):
        min = [15, 40, 1, 1.5, 32, 12]
        max = [30, 80, 2, 1.9, 91, 24]
        type = ["Temp", "Phos", "Temp", "Phos", "Temp", "Phos"]
        name = ["1", "2", "3", "4", "5", "6"]
        for x in range(6):
            v = Video.objects.create(name=str(x), content=str(x)+".jpg")
            t = CustomTag.objects.create(type=type[x], min=min[x], max=max[x], name=name[x])
            v.tags.add(t)
            if type[x] == "Temp":
                self.videos.append(v)

    def testQuery(self):
        res = Video.objects.filter(tags__type__exact="Temp")
        self.assertEqual(len(res), 3)



