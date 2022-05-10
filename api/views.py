from django.shortcuts import render

# Create your views here.
from rest_framework.authentication import BasicAuthentication

from api.filters import ContractorFilter, ObjectFilter, SiteTypeFilter
from api.serializers import ContractorSerializer, ObjectSerializer, SiteTypeSerializer
from webstart.models import Contractor, Object, SiteType
from rest_framework import viewsets


class ContractorViewSet(viewsets.ModelViewSet):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    filter_class = ContractorFilter
    model = Contractor

class ObjectViewSet(viewsets.ModelViewSet):
    queryset = Object.objects.all()
    serializer_class = ObjectSerializer
    filter_class = ObjectFilter
    model = Object

class SiteTypeViewSet(viewsets.ModelViewSet):
    queryset = SiteType.objects.all()
    serializer_class = SiteTypeSerializer
    filter_class = SiteTypeFilter
    model = SiteType
    pagination_class = None