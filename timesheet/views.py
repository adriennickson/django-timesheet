from datetime import datetime, timedelta
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponseNotFound, JsonResponse
from django.shortcuts import redirect
from django.conf import settings
import json
from django.core import serializers
from simplejson import dumps, loads


from timesheet.models import Commit, Daily, DailySerializer, Task

# Create your views here.
def index(request):
    context = {}
    return render(request, 'timesheet/index.html', context)

# @login_required(login_url='/admin')
def list(request):
    if not request.user.is_authenticated:
        return redirect('%s?next=%s' % (settings.LOGIN_URL, request.path))

    # TOTO: Find daily by user and dates
    today = datetime.today()
    date_list = [today - timedelta(days=x) for x in range(30)]
    querryset = Daily.objects.filter(day__in = date_list, user=request.user)
    date_list = {x : querryset.filter(day=x).first() for x in date_list}
    context = {"date_list": date_list}
    return render(request, 'timesheet/list.html', context)

def show(request):
    context = {}
    return render(request, 'timesheet/form.html', context)


def edit(request, id = None):
    if not request.user.is_authenticated:
        return redirect('%s?next=%s' % (settings.LOGIN_URL, request.path))

    context = {}

    if(id):
        daily = Daily.objects.prefetch_related('user', 'tasks', 'tasks__commits').select_related('user').get(pk=id)

        if not daily or daily.user != request.user :
            return HttpResponseNotFound('<h1>Page not found</h1>')

        context = {
            "daily": loads(dumps(DailySerializer(instance=daily).data)),
            "day": daily.day.strftime('%Y-%m-%d')
        }
    else:
        context = {
            "day": request.GET.get('day')
        }


    if request.method =='POST':  # comes here when you are making a post request via submitting the form
        daily_data = json.loads(request.body)
        new_daily = None
        if 'daily' in context:
            new_daily = Daily.objects.prefetch_related('user', 'tasks', 'tasks__commits').select_related('user').get(pk=id)
            new_daily.tasks.all().delete()
            # remove all tasks
        else:
            Daily.objects.filter(day = datetime.strptime(context['day'], "%Y-%m-%d"), user = request.user).delete()
            new_daily = Daily(day = datetime.strptime(context['day'], "%Y-%m-%d") )
            # set day
        
        # set daily data
        new_daily.comment = daily_data['comment']

        new_daily.user = request.user
        new_daily.save()
        print(str(type(daily_data['tasks'])))
        if 'tasks' in daily_data and str(type(daily_data['tasks'])) == "<class 'dict'>":
            print("\n\n__")
            print(daily_data['tasks'])
            print(str(type(daily_data['tasks'])))
            print("\n\n__")
            for task in daily_data['tasks'].values():
                t = Task(
                    daily = new_daily,
                    comment = task['comment'] if 'comment' in task else None,
                    number_of_hours = task['number_of_hours'],
                    project=task['project'])
                t.save()
                for commit in task['commits'].values():
                    c = Commit(task = t, commit = commit['commit'])
                    c.save()

        
        return JsonResponse(daily_data, safe=False)
    
    return render(request, 'timesheet/form.html', context)

