from django.shortcuts import render,HttpResponse
#for the index page index.html
def index(request):
    return render(request,'templates/html/index.html')
    