from django.db.models import Q
from .models import Round, Game
from game.models import Hero
from game.models import Faction
from django.contrib.auth import get_user_model


User = get_user_model()

def calculate_winratio(player: User):
    rounds = Round.objects.filter(
        Q(game__player1=player) | Q(game__player2=player)
    )

    total = rounds.count()
    if total == 0:
        return 0.0

    wins = rounds.filter(winner=player).count()
    return wins / total


def get_hero_stats(game_id):
    game = Game.objects.get(id=game_id)
    heroes = Hero.objects.all()  # pobieramy wszystkich bohaterów

    result = {}

    for hero in heroes:
        rounds_p1 = Round.objects.filter(game=game, p1_hero=hero)
        rounds_p2 = Round.objects.filter(game=game, p2_hero=hero)

        p1_count = rounds_p1.count()
        p2_count = rounds_p2.count()

        p1_wins = rounds_p1.filter(winner=game.player1).count()
        p2_wins = rounds_p2.filter(winner=game.player2).count()

        result[str(hero.id)] = {
            "p1_count": p1_count,
            "p1_winratio": p1_wins / p1_count*100 if p1_count else "N/A",
            "p2_count": p2_count,
            "p2_winratio": p2_wins / p2_count*100 if p2_count else "N/A",
        }

    return result

def calculate_rounds(player1: User, player2: User):
    rounds = Round.objects.filter(
        Q(game__player1=player1, game__player2=player2) |
        Q(game__player1=player2, game__player2=player1)
    )
    total = rounds.count()
    if total == 0:
        return 0.0

    return total

def get_faction_stats(faction_id, game_id):
    factions = Faction.objects.all()
    base = Faction.objects.get(id=faction_id)
    game = Game.objects.get(id=game_id)


    result = {}

    total_p1_count = 0
    total_p1_wins = 0
    total_p2_count = 0
    total_p2_wins = 0

    for opponent in factions:
        rounds_p1 = Round.objects.filter(
            game=game,
            p1_faction=base,
            p2_faction=opponent
        )

        rounds_p2 = Round.objects.filter(
            game=game,
            p2_faction=base,
            p1_faction=opponent
        )



        total_p1 = rounds_p1.count()
        total_p2 = rounds_p2.count()

        p1_wins = rounds_p1.filter(winner=game.player1).count()
        p2_wins = rounds_p2.filter(winner=game.player2).count()

        total_p1_count += total_p1
        total_p1_wins += p1_wins
        total_p2_count += total_p2
        total_p2_wins += p2_wins

        result[opponent.id] = {
            "p1_count": total_p1,
            "p1_winratio": p1_wins / total_p1*100 if total_p1 else "N/A",
            "p2_count": total_p2,
            "p2_winratio": p2_wins / total_p2*100 if total_p2 else "N/A",
        }

    result["TOTAL"] = {
        "p1_count": total_p1_count,
        "p1_winratio": total_p1_wins / total_p1_count*100 if total_p1_count else "N/A",
        "p2_count": total_p2_count,
        "p2_winratio": total_p2_wins / total_p2_count*100 if total_p2_count else "N/A",
    }

    return result