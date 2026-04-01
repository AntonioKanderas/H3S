from rest_framework import viewsets

from rounds.serializers import GameSerializer
from .models import Faction, Hero, Map
from rounds.models import Game
from .serializers import HeroSerializer, FactionSerializer, MapSerializer


class HeroViewSet(viewsets.ModelViewSet):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer

class FactionViewSet(viewsets.ModelViewSet):
    queryset = Faction.objects.all()
    serializer_class = FactionSerializer

class MapViewSet(viewsets.ModelViewSet):
    queryset = Map.objects.all()
    serializer_class = MapSerializer

class FactionGamesViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer

    def get_queryset(self):
        faction_id = self.kwargs['faction_id']
        return Game.objects.filter(
            rounds__p1_faction_id=faction_id
        ).distinct() | Game.objects.filter(
            rounds__p2_faction_id=faction_id
        )


