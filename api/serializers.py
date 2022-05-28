from webstart.models import Contractor, Object, SiteType, Price, Tool, Constructor, Target, ImplementationWay
from rest_framework import serializers


class ObjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Object
        fields = '__all__'

class SiteTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = SiteType
        fields = '__all__'
        depth = 1

class PriceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Price
        fields = '__all__'

class ContractorSerializer(serializers.ModelSerializer):
    obj = ObjectSerializer(required=False, read_only=True)

    class Meta:
        model = Contractor
        fields = ('phone_number', 'address', 'projects', 'obj', 'logo')

class ToolSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tool
        fields = '__all__'
        depth = 1

class ConstructorSerializer(serializers.ModelSerializer):
    tool = ToolSerializer(required=False, read_only=True)

    class Meta:
        model = Constructor
        fields = '__all__'
        depth = 1

class TargetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Target
        fields = '__all__'

class ImplementationWaySerializer(serializers.ModelSerializer):

    class Meta:
        model = ImplementationWay
        fields = '__all__'