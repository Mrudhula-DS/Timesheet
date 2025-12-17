from rest_framework import serializers
from .models import Client, Project, Report  # use Report, not ProjectReport

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report  # Fixed: use Report
        fields = '__all__'
