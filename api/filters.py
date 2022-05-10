from django_filters import rest_framework as filters

from webstart.models import WebStudio, Object


class WebStudioFilter(filters.FilterSet):

   class Meta:
       model = WebStudio
       fields = '__all__'
       exclude = ['logo']

class ObjectFilter(filters.FilterSet):

   class Meta:
       model = Object
       fields = '__all__'

