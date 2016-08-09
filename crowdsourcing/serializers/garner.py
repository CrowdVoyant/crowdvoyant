from rest_framework import serializers
from crowdsourcing.models import Story, Article, Image

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article

class ImageSerializers(Serializers.ModelSerializer):
    class Meta:
        model = Image
