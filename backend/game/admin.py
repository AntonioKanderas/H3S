from django.contrib import admin
from .models import Hero, Faction, Map
from django.utils.html import format_html

@admin.register(Faction)
class FactionAdmin(admin.ModelAdmin):
    list_display = ("portrait_preview",'name')

    def portrait_preview(self, obj):
        if obj.portrait:
            return format_html('<img src="{}" width="48" height="32" />', obj.portrait.url)
        return "-"

    portrait_preview.short_description = "Portrait"

@admin.register(Hero)
class HeroAdmin(admin.ModelAdmin):
    list_display = ("portrait_preview", "name", "hero_class", "faction")

    def portrait_preview(self, obj):
        if obj.portrait:
            return format_html('<img src="{}" width="48" height="32" />', obj.portrait.url)
        return "-"

    portrait_preview.short_description = "Portrait"

@admin.register(Map)
class MapAdmin(admin.ModelAdmin):
    list_display = ("portrait_preview", "name")
    def portrait_preview(self, obj):
        if obj.portrait:
            return format_html('<img src="{}" width="163" height="33" />', obj.portrait.url)
        return "-"
