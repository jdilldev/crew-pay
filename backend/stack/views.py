import typing
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer
from .models import User
import requests
from stytch import Client as Stytch_Client
import os
from django.http import HttpResponse, JsonResponse
from typing import Literal, Type
from django.http import Http404
from django.http import HttpResponseNotFound

print(os.environ['STYTCH_SECRET'])

# Create your views here.
stytch_client = Stytch_Client(
    project_id=os.environ['STYTCH_PROJECT_ID'],
    secret=os.environ['STYTCH_SECRET'],
    environment="test",
)


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


def login_or_create_user(request):
    print(request.GET.get('authType'))
    authType: str = request.GET.get('authType')
    print()
    if (authType == 'PHONE'):
        resp = stytch_client.otps.sms.login_or_create('+10000000000').json()
    else:
        resp = stytch_client.otps.email.login_or_create(
            'sandbox@stytch.com').json()
        # save phone_id response and use that as method_id to authenticate
    return JsonResponse(resp)


def authenticate_otp(request):
    code = request.GET.get('passcode')
    method_id = request.GET.get('methodID')
    resp = stytch_client.otps.authenticate(
        method_id,
        code
    ).json()
    print()
    print(resp)
    return JsonResponse(resp)
