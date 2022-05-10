from django.contrib import admin

# Register your models here.
from webstart.models import Object, WebStudio, SiteType, Price

admin.site.register((WebStudio, SiteType, Price))

@admin.register(Object)
class ObjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'obj_type']