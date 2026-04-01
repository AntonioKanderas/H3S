from rest_framework import serializers

from .models import Game, Round



class RoundSerializer(serializers.ModelSerializer):
    p1_faction_name = serializers.ReadOnlyField(source="p1_faction.name")
    p1_hero_name = serializers.SerializerMethodField()
    p2_faction_name = serializers.ReadOnlyField(source="p2_faction.name")
    p2_hero_name = serializers.ReadOnlyField(source="p2_hero.name")
    game_name = serializers.StringRelatedField(source="game")

    p1_name = serializers.ReadOnlyField(source="game.player1.username")
    p2_name = serializers.ReadOnlyField(source="game.player2.username")

    round_number = serializers.SerializerMethodField()

    p1_faction_thumbnail = serializers.SerializerMethodField()
    p2_faction_thumbnail = serializers.SerializerMethodField()
    p1_hero_thumbnail = serializers.SerializerMethodField()
    p2_hero_thumbnail = serializers.SerializerMethodField()
    map_size_thumbnail = serializers.SerializerMethodField()

    winner_name = serializers.ReadOnlyField(source="winner.username")
    winner_number= serializers.SerializerMethodField()
    map_size_name = serializers.SerializerMethodField()

    start_date = serializers.DateTimeField(source='start_at', format='%Y-%m-%d')
    end_date = serializers.DateTimeField(source='end_at', format='%Y-%m-%d')

    class Meta:
        model = Round
        fields = '__all__'

    def get_map_size_name(self, obj):
        return obj.map_size.name.upper()

    def get_round_number(self, obj):
        rounds = obj.game.rounds.order_by("id")
        for i, r in enumerate(rounds, start=1):
            if r.id == obj.id:
                return i

    def get_p1_faction_thumbnail(self, obj):
        request = self.context.get('request')
        if obj.p1_faction.portrait:
            return request.build_absolute_uri(obj.p1_faction.portrait.url)
        return None

    def get_p2_faction_thumbnail(self, obj):
        request = self.context.get('request')
        if obj.p2_faction.portrait:
            return request.build_absolute_uri(obj.p2_faction.portrait.url)
        return None

    def get_p1_hero_thumbnail(self, obj):
        request = self.context.get('request')
        if obj.p1_hero and obj.p1_hero.portrait:
            return request.build_absolute_uri(obj.p1_hero.portrait.url)
        return None

    def get_p2_hero_thumbnail(self, obj):
        request = self.context.get('request')
        if obj.p2_hero and obj.p2_hero.portrait:
            return request.build_absolute_uri(obj.p2_hero.portrait.url)
        return None

    def get_map_size_thumbnail(self, obj):
        request = self.context.get('request')
        if obj.map_size.portrait:
            return request.build_absolute_uri(obj.map_size.portrait.url)
        return None

    def get_winner_number(self, obj):
        if obj.winner_id == obj.game.player1_id:
            return 1
        elif obj.winner_id == obj.game.player2_id:
            return 2
        else:
            return None

    def get_p1_hero_name(self, obj):
        return obj.p1_hero.name if obj.p1_hero else "—"

    def get_p2_hero_name(self, obj):
        return obj.p2_hero.name if obj.p2_hero else "—"


class GameSerializer(serializers.ModelSerializer):
    player1_name = serializers.ReadOnlyField(source='player1.username')
    player1_winratio = serializers.ReadOnlyField(source='p1_winratio')

    player2_name = serializers.ReadOnlyField(source='player2.username')
    player2_winratio = serializers.ReadOnlyField(source='p2_winratio')

    round_count = serializers.ReadOnlyField()
    rounds = serializers.HyperlinkedIdentityField(view_name='game-rounds')


    class Meta:
        model = Game
        fields = '__all__'