from rest_framework import serializers

from .models import Hero, Faction, Map

class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = "__all__"

class FactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faction
        fields = "__all__"

class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
        fields = "__all__"

class FactionStatsSerializer(serializers.Serializer):
    faction = serializers.CharField()
    vs = serializers.DictField()


class HeroStatsSerializer(serializers.Serializer):
    hero = serializers.CharField()
    vs = serializers.DictField()