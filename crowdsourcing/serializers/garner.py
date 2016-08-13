from rest_framework import serializers
from crowdsourcing.models import Story, Article, Image, Subscription

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription

class StorySerializer(serializers.ModelSerializer):
    number_of_articles = serializers.SerializerMethodField()
    number_of_images = serializers.SerializerMethodField()
    class Meta:
        model = Story

    def get_number_of_articles(self, obj):
        return obj.article_set.count()

    def get_number_of_images(self, obj):
        articles = obj.article_set.all()
        image_count=0
        for article in articles:
            image_count = image_count + article.image_set.count()
        return image_count


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
