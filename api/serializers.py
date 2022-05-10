from webstart.models import Contractor, Object, SiteType
from rest_framework import serializers


class ObjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Object
        fields = '__all__'

class ContractorSerializer(serializers.ModelSerializer):
    obj = ObjectSerializer(required=False, read_only=True)

    class Meta:
        model = Contractor
        fields = ('phone_number', 'address', 'projects', 'obj', 'logo')
        depth = 1

class SiteTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = SiteType
        fields = '__all__'


