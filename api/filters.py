from django_filters import rest_framework as filters

from webstart.models import Contractor, Object, SiteType, Price, Tool, Constructor, Target, ImplementationWay
from django.db.models import Q


class ContractorFilter(filters.FilterSet):

   class Meta:
       model = Contractor
       fields = ('projects', 'obj__obj_type', 'obj__name', 'obj__id')
       exclude = ['logo']

class ObjectFilter(filters.FilterSet):

   class Meta:
       model = Object
       fields = '__all__'

class NumberInFilter(filters.BaseInFilter, filters.NumberFilter):
    pass

class SiteTypeFilter(filters.FilterSet):

    for_targets__in = NumberInFilter(field_name="for_targets", lookup_expr="in", distinct=True)

    class Meta:
       model = SiteType
       fields = '__all__'


class PriceFilter(filters.FilterSet):


    # max_price = filters.NumberFilter(field_name='min_price', lookup_expr="lte")
    # min_price = filters.NumberFilter(field_name='min_price', lookup_expr="gte")

   #  ||

   # max_price = filters.NumberFilter(field_name='max_price', lookup_expr="lte")
   # min_price = filters.NumberFilter(field_name='max_price', lookup_expr="gte")

    class Meta:
        model = Price
        fields = '__all__'

class ToolFilter(filters.FilterSet):

   class Meta:
       model = Tool
       fields = '__all__'
       exclude = ['logo']


class ConstructorFilter(filters.FilterSet):
    # site_types = NumberInFilter(field_name="site_types", lookup_expr="in")
    template_number_min = filters.NumberFilter(field_name='template_number', lookup_expr='gte')
    template_number_max = filters.NumberFilter(field_name='template_number', lookup_expr='lte')

    class Meta:
       model = Constructor
       fields = '__all__'

class TargetFilter(filters.FilterSet):
    class Meta:
        model = Target
        fields = '__all__'

class ImplementationWayFilter(filters.FilterSet):
    class Meta:
        model = ImplementationWay
        fields = '__all__'
