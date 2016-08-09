from rest_framework import viewsets
from crowdsourcing.serializers.garner import *
from crowdsourcing.models import Story, Article, Image
from rest_framework.decorators import detail_route
from rest_framework.response import Response
class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    @detail_route(methods = ['GET'])
    def articles(self,request,**kwargs):
        articles = self.get_object().articles
        serializer = ArticleSerializer(articles, many=True, context={'request':request})
        return Response(serializer.data)

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    @detail_route(methods = ['GET'])
    def images(self,request,**kwargs):
        images = self.get_object().images
        serializer = ImageSerializer(images, many=True, context={'request':request})
        return Response(serializer.data)

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
