from django.urls import path, include
from .routers import urlpatterns as router_urls
from apicore.views import FactionStatsView, HeroStatsView


urlpatterns = [
    path("", include(router_urls)),
    path("factions/<int:faction_id>/stats/<int:game_id>/", FactionStatsView.as_view()),
    path("heroes/stats/<int:game_id>/", HeroStatsView.as_view()),

]