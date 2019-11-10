from django.shortcuts import render,HttpResponse
#for the index page index.html
def index(request):
	#changed the path to try fix the rendering
	#issue is that the website pops up as cannot find template
	#possible solutions is fixing the path
    return render(request,'index.html')
    