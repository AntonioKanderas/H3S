from django.conf import settings
from django.db import models
from game.models import Hero, Faction, Map
from django.core.exceptions import ValidationError




class Game(models.Model):
    player1 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="games_as_p1"
    )

    player2 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="games_as_p2"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def round_count(self):
        from .services import calculate_rounds
        return f"{calculate_rounds(self.player1, self.player2)}"

    @property
    def p1_winratio(self):
        from .services import calculate_winratio
        return f"{calculate_winratio(self.player1)*100:.2f} %"

    @property
    def p2_winratio(self):
        from .services import calculate_winratio
        return f"{calculate_winratio(self.player2)*100:.2f} %"

    def __str__(self):
        return f"{self.player1} vs {self.player2}"

class Round(models.Model):


    class Difficulty(models.TextChoices):
        EASY = "easy", "Easy (1)"
        MEDIUM = "medium", "Medium (2)"
        HARD = "hard", "Hard (3)"
        VERY_HARD = "very hard", "Very hard (4)"
        HEROIC = "heroic", "Heroic (5)"

    class Water(models.TextChoices):
        YES = "yes", "Yes"
        NO = "no", "No"
        ISLANDS = "islands", "Islands"

    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE,
        related_name="rounds"
    )


    winner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
    )


    p1_hero = models.ForeignKey(Hero, on_delete=models.PROTECT, related_name="rounds_as_p1_hero", null=True, blank=True)
    p2_hero = models.ForeignKey(Hero, on_delete=models.PROTECT, related_name="rounds_as_p2_hero", null=True, blank=True)

    p1_faction = models.ForeignKey(Faction, on_delete=models.PROTECT, related_name="rounds_as_p1_faction")
    p2_faction = models.ForeignKey(Faction, on_delete=models.PROTECT, related_name="rounds_as_p2_faction")

    start_at = models.DateTimeField()
    end_at = models.DateTimeField()

    map_size = models.ForeignKey(Map, on_delete=models.PROTECT, null=True, blank=True)
    difficulty = models.CharField(
        max_length=20,
        choices=Difficulty.choices,
        default=Difficulty.HEROIC
    )

    description = models.TextField(blank=True)

    tournament = models.BooleanField(default=True)
    water = models.CharField(
        max_length=20,
        choices=Water.choices,
        default=Water.NO
    )
    underground  = models.BooleanField(default=True)

    def clean(self):
        players = [self.game.player1, self.game.player2]

        if self.winner not in players:
            raise ValidationError("Winner must be one of the game players.")


