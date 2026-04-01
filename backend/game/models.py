from django.db import models
from django.core.files import File
import os

class Faction(models.Model):
    name = models.CharField(max_length=20)

    portrait = models.ImageField(upload_to="factions/", blank=True, null=True)

    layout = models.ImageField(upload_to="factions/", blank=True, null=True)

    def save(self, *args, **kwargs):

        if not self.portrait or not self.layout:

            filename_portrait = f"Town_portrait_{self.name}_small.png"
            filepath_portrait = os.path.join("media", "factions", filename_portrait)

            filename_layout = f"{self.name}-in.png"
            filepath_layout = os.path.join("media", "factions", filename_layout)

            if os.path.exists(filepath_portrait):
                with open(filepath_portrait, "rb") as f:
                    self.portrait.save(filename_portrait, File(f), save=False)

            if os.path.exists(filepath_layout):
                with open(filepath_layout, "rb") as f:
                    self.layout.save(filename_layout, File(f), save=False)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Hero(models.Model):

    class HeroClass(models.TextChoices):
        KNIGHT = "knight", "Knight"
        CLERIC = "cleric", "Cleric"
        RANGER = "ranger", "Ranger"
        DRUID = "druid", "Druid"
        ALCHEMIST = "alchemist", "Alchemist"
        WIZARD = "wizard", "Wizard"
        DEMONIAC = "demoniac", "Demoniac"
        HERETIC = "heretic", "Heretic"
        DEATH_KNIGHT = "death knight", "Death Knight"
        NECROMANCER = "necromancer", "Necromancer"
        OVERLORD = "overlord", "Overlord"
        WARLOCK = "warlock", "Warlock"
        BARBARIAN = "barbarian", "Barbarian"
        BATTLE_MAGE = "battle mage", "Battle mage"
        BEASTMASTER = "beastmaster", "Beastmaster"
        WITCH = "witch", "Witch"
        PLANESWALKER = "planeswalker", "Planeswalker"
        ELEMENTALIST = "elementalist", "Elementalist"
        CAPTAIN = "captain", "Captain"
        NAVIGATOR = "navigator", "Navigator"
        MERCENARY = "mercenary", "Mercenary"
        ARTIFICER = "artificer", "Artificer"
        CHIEFTAIN = "chieftain", "Chieftain"
        ELDER = "elder", "Elder"

    name = models.CharField(max_length=100, unique=True)

    hero_class = models.CharField(
        max_length=20,
        default=HeroClass.KNIGHT,
        choices=HeroClass.choices
    )

    faction = models.ForeignKey(
        Faction,
        on_delete=models.PROTECT,
        related_name="heroes"
    )

    portrait = models.ImageField(upload_to="heroes/", blank=True, null=True)

    def save(self, *args, **kwargs):

        if not self.portrait:

            filename = f"Hero_{self.name}_small.png"
            filepath = os.path.join("media", "heroes", filename)

            if os.path.exists(filepath):
                with open(filepath, "rb") as f:
                    self.portrait.save(filename, File(f), save=False)

        super().save(*args, **kwargs)


    class Meta:
        verbose_name = "Hero"
        verbose_name_plural = "Heroes"

    def __str__(self):
        return f"{self.name}"


class Map(models.Model):
    name = models.CharField(max_length=2)
    portrait = models.ImageField(upload_to="mapsize/", blank=True, null=True)

    def save(self, *args, **kwargs):

        if not self.portrait:

            filename = f"{self.name}.webp"
            filepath = os.path.join("media", "mapsize", filename)

            if os.path.exists(filepath):
                with open(filepath, "rb") as f:
                    self.portrait.save(filename, File(f), save=False)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


