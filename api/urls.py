from django.urls import re_path, include
from rest_framework import routers

from api.views import ContractorViewSet, ObjectViewSet, SiteTypeViewSet

router = routers.DefaultRouter()

router.register(r'contractor', ContractorViewSet)
router.register(r'site-types', SiteTypeViewSet)
router.register(r'objects', ObjectViewSet)

urlpatterns = [
    re_path(r'', include(router.urls))
]