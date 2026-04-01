from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rounds.services import get_faction_stats, get_hero_stats


class APIRoot(APIView):
    def get(self, request):
        data = {
            'heroes': reverse('hero-list', request=request),
            'factions': reverse('faction-list', request=request),
            'games': reverse('game-list', request=request),
            'rounds': reverse('round-list', request=request),
            'maps': reverse('map-list', request=request),

        }
        return Response(data)


class FactionStatsView(APIView):
    def get(self, request, faction_id, game_id):
        stats = get_faction_stats(faction_id, game_id)
        return Response(stats)

class HeroStatsView(APIView):
    def get(self, request, game_id):
        stats = get_hero_stats(game_id)
        return Response(stats)