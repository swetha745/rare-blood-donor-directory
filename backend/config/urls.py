from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from donors.views import DonorViewSet, BloodRequestViewSet

router = DefaultRouter()

router.register(r'donors', DonorViewSet)
router.register(r'blood-requests', BloodRequestViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]