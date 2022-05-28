from django.shortcuts import render

# Create your views here.
from rest_framework.authentication import BasicAuthentication

from api.filters import ContractorFilter, ObjectFilter, SiteTypeFilter, PriceFilter, ToolFilter, ConstructorFilter, \
    TargetFilter, ImplementationWayFilter
from api.serializers import ContractorSerializer, ObjectSerializer, SiteTypeSerializer, PriceSerializer, ToolSerializer, \
    ConstructorSerializer, TargetSerializer, ImplementationWaySerializer
from webstart.models import Contractor, Object, SiteType, Price, Constructor, Tool, Target, ImplementationWay
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

class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all().order_by('id')
    serializer_class = ToolSerializer
    filter_class = ToolFilter
    model = Tool

class TargetViewSet(viewsets.ModelViewSet):
    queryset = Target.objects.all().order_by('id')
    serializer_class = TargetSerializer
    filter_class = TargetFilter
    model = Target
    pagination_class = None

class ConstructorViewSet(viewsets.ModelViewSet):
    queryset = Constructor.objects.all().order_by('tool_id')
    serializer_class = ConstructorSerializer
    filter_class = ConstructorFilter
    model = Constructor

class ImplementationWayViewSet(viewsets.ModelViewSet):
    queryset = ImplementationWay.objects.all().order_by('id')
    serializer_class = ImplementationWaySerializer
    filter_class = ImplementationWayFilter
    model = ImplementationWay
    pagination_class = None