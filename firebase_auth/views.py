from django.conf import settings
from django.shortcuts import redirect
from timesheet.views import list as timesheet_list
from django.http import HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
def firebaseAuth(request):
    context = {}
    # return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
    # return HttpResponseRedirect("/timesheet/list/")
    return redirect(timesheet_list)

