from django.contrib import admin
from .models import Game, Round

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('player1',  'p1_winratio', "round_count",'p2_winratio','player2',)
    list_display_links = ('player1','player2',)

@admin.register(Round)
class RoundAdmin(admin.ModelAdmin):
    list_display = ("game","p1_faction", "p1_hero", 'winner', "p2_hero", "p2_faction", "start_at", "end_at", 'map_size',"difficulty",  'water', 'underground', 'tournament')
    list_display_links = ("p1_faction", "p2_faction", "p1_hero", "p2_hero", "winner")