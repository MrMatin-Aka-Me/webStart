from django_filters import rest_framework as filters

from webstart.models import Contractor, Object, SiteType, Price


class ContractorFilter(filters.FilterSet):

   class Meta:
       model = Contractor
       fields = ('projects', 'obj__obj_type', 'obj__name', 'obj__id')
       exclude = ['logo']

class ObjectFilter(filters.FilterSet):

   class Meta:
       model = Object
       fields = '__all__'

class SiteTypeFilter(filters.FilterSet):

   class Meta:
       model = SiteType
       fields = '__all__'


class PriceFilter(filters.FilterSet):

   class Meta:
       model = Price
       fields = '__all__'