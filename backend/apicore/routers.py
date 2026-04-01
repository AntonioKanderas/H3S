from rest_framework.routers import DefaultRouter
from game.views import HeroViewSet, FactionViewSet, MapViewSet
from rounds.views import GameViewSet, RoundViewSet

router = DefaultRouter()

router.register("heroes", HeroViewSet)
router.register("factions", FactionViewSet)
router.register("games", GameViewSet)
router.register("rounds", RoundViewSet)
router.register("maps", MapViewSet)

urlpatterns = router.urls