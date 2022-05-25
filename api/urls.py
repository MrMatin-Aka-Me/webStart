from django.urls import re_path, include
from rest_framework import routers

from api.views import ContractorViewSet, ObjectViewSet, SiteTypeViewSet, PriceViewSet, ToolViewSet, ConstructorViewSet, \
    TargetViewSet

router = routers.DefaultRouter()

router.register(r'contractor', ContractorViewSet)
router.register(r'site-types', SiteTypeViewSet)
router.register(r'prices', PriceViewSet)
router.register(r'objects', ObjectViewSet)
router.register(r'tool', ToolViewSet)
router.register(r'constructor', ConstructorViewSet)
router.register(r'target', TargetViewSet)

urlpatterns = [
    re_path(r'', include(router.urls))
]