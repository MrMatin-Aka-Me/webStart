from django.urls import re_path, include
from rest_framework import routers

from api.views import WebStudioViewSet, ObjectViewSet

router = routers.DefaultRouter()

router.register(r'web-studios', WebStudioViewSet)
router.register(r'objects', ObjectViewSet)

urlpatterns = [
    re_path(r'', include(router.urls))
]