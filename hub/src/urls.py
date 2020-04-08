from django.conf.urls.defaults import *
from jsonrpc import jsonrpc_site
import src.main.main # you must import the views that need connected

urlpatterns = patterns('', url(r'^json/', jsonrpc_site.dispatch, name="jsonrpc_mountpoint"))
