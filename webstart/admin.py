from django.contrib import admin

# Register your models here.
from webstart.models import Object, Contractor, SiteType, Price, Tool, ToolCategory, Constructor, Target, \
    ImplementationWay


@admin.register(Object)
class ObjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'obj_type']
    search_fields = ['name', 'obj_type']
    list_filter = ['obj_type']

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

@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['category', 'country']

@admin.register(Constructor)
class ConstructorAdmin(admin.ModelAdmin):
    search_fields = ['tool__name']
    list_filter = ['has_free', 'site_types']

@admin.register(Target)
class ConstructorAdmin(admin.ModelAdmin):
    list_display = ['target', 'target_type']
    search_fields = ['target']
    list_filter = ['target_type']

@admin.register(ImplementationWay)
class ImplementationWayAdmin(admin.ModelAdmin):
    list_display = ['name', 'implementation_type']
    search_fields = ['name']
    list_filter = ['implementation_type']

admin.site.register((SiteType, ToolCategory))