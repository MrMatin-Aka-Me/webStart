from webstart.models import WebStudio, Object
from rest_framework import serializers


class ObjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Object
        fields = '__all__'

class WebStudioSerializer(serializers.ModelSerializer):
    obj = ObjectSerializer(required=False, read_only=True)

    class Meta:
        model = WebStudio
        fields = ('phone_number', 'address', 'projects', 'obj', 'logo')
        depth = 1


