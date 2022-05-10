from django.shortcuts import render

# Create your views here.
from rest_framework.authentication import BasicAuthentication

from api.filters import ContractorFilter, ObjectFilter, SiteTypeFilter, PriceFilter
from api.serializers import ContractorSerializer, ObjectSerializer, SiteTypeSerializer, PriceSerializer
from webstart.models import Contractor, Object, SiteType, Price
from rest_framework import viewsets


class ContractorViewSet(viewsets.ModelViewSet):
    queryset = Contractor.objects.all().order_by('obj__name')
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

class PriceViewSet(viewsets.ModelViewSet):
    queryset = Price.objects.all()
    serializer_class = PriceSerializer
    filter_class = PriceFilter
    model = Price
    pagination_class = None