from django.contrib import admin

# Register your models here.
from webstart.models import Object, Contractor, SiteType, Price


@admin.register(Object)
class ObjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'obj_type']
    search_fields = ['name', 'obj_type']

@admin.register(Contractor)
class ContractorAdmin(admin.ModelAdmin):
    list_filter = ['obj', 'projects']
    search_fields = ['obj__name']
    raw_id_fields = ['obj']

@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    search_fields = ['obj__name']
    list_filter = ['obj', 'site_type']
    raw_id_fields = ['obj']

admin.site.register((SiteType))