from rest_framework import serializers
from crowdsourcing.models import Story, Article, Image, Subscription

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
