from django.contrib import admin

# Register your models here.
from webstart.models import Object, Contractor, SiteType, Price


@admin.register(Object)
class ObjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'obj_type']



admin.site.register((Contractor, SiteType, Price))