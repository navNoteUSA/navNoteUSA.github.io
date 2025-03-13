from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'email', 'name')
        
    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() 