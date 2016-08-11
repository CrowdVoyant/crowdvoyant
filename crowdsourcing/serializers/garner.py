from rest_framework import serializers
from crowdsourcing.models import Story, Article, Image

class StorySerializer(serializers.ModelSerializer):
    # id = serializers.CharField(read_only=True)
    class Meta:
        fields = ('id','ncl','rss_link')
        model = Story

class ArticleSerializer(serializers.ModelSerializer):
    # id = serializers.CharField(read_only=True)
    class Meta:
        # fields = ('id','link','text')
        model = Article

class ImageSerializer(serializers.ModelSerializer):
    # id = serializers.CharField(read_only=True)
    class Meta:
        model = Image
