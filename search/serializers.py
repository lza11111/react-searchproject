from rest_framework import serializers

class Serializer(serializers.Serializer):
    content = serializers.CharField(required=True)
    