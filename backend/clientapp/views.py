from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Client, Project, Report  # Fixed: use Report
from .serializers import ClientSerializer, ProjectSerializer, ReportSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()  # Fixed: use Report
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]
