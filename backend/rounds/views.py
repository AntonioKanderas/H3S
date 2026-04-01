from rest_framework import viewsets
from .models import Game, Round
from game.models import Faction
from .serializers import GameSerializer, RoundSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    @action(detail=True, methods=['get'])
    def rounds(self, request, pk=None):
        game = self.get_object()
        rounds = game.rounds.all()
        serializer = RoundSerializer(rounds, many=True, context={'request': request})
        return Response(serializer.data)



class RoundViewSet(viewsets.ModelViewSet):

    queryset = Round.objects.all()
    serializer_class = RoundSerializer

    @action(detail=False, methods=['get'], url_path='faction-stats')
    def faction_stats(self, request):
        faction_id = request.query_params.get("faction")
        game_id = request.query_params.get("game")

        faction = Faction.objects.get(id=faction_id)
        game = Game.objects.get(id=game_id)

        rounds = Round.objects.filter(
            game_id=game_id
        ).filter(
            Q(p1_faction_id=faction_id) | Q(p2_faction_id=faction_id)
        )

        p1_count = rounds.filter(p1_faction_id=faction_id).count()
        p2_count = rounds.filter(p2_faction_id=faction_id).count()

        data = {
            "game": str(game),
            "faction_name": faction.name,
            "p1_count": p1_count,
            "p2_count": p2_count,
            "total": p1_count + p2_count
        }

        return Response(data)

