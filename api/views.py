from django.shortcuts import render

# Create your views here.
from rest_framework.authentication import BasicAuthentication

from api.filters import WebStudioFilter, ObjectFilter
from api.serializers import WebStudioSerializer, ObjectSerializer
from webstart.models import WebStudio, Object
from rest_framework import viewsets


class WebStudioViewSet(viewsets.ModelViewSet):
    queryset = WebStudio.objects.all()
    serializer_class = WebStudioSerializer
    filter_class = WebStudioFilter
    model = WebStudio

class ObjectViewSet(viewsets.ModelViewSet):
    queryset = Object.objects.all()
    serializer_class = ObjectSerializer
    filter_class = ObjectFilter
    model = Object
