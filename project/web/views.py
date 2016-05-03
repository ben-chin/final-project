from django.shortcuts import render, redirect
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required


# TODO: refactor this to somewhere else
import os
from project.settings import BASE_DIR
from autocat import ACSerializer

PATH_TO_AC_PKL = os.path.join(BASE_DIR, 'data', 'ac', 'categorizer.pkl')
print 'loading cat'
ac = ACSerializer.load(PATH_TO_AC_PKL)
print 'fully loaded cat'


def index(request):
    return render(request, 'web/index.html')


@login_required(login_url='/')
def profile(request):
    return render(request, 'web/profile.html')


@login_required(login_url='/')
def logout(request):
    auth_logout(request)
    return redirect('index')
