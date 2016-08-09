from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
# from crowdsourcing import views
# from crowdsourcing.viewsets.project import *
# from crowdsourcing.viewsets.user import UserViewSet, UserProfileViewSet, UserPreferencesViewSet
# from crowdsourcing.viewsets.requester import RequesterRankingViewSet, RequesterViewSet, QualificationViewSet
# from crowdsourcing.viewsets.rating import WorkerRequesterRatingViewset, RatingViewset
# from crowdsourcing.viewsets.worker import *
# from crowdsourcing.viewsets.task import TaskViewSet, CurrencyViewSet, TaskWorkerResultViewSet, TaskWorkerViewSet
# from crowdsourcing.viewsets.template import TemplateViewSet, TemplateItemViewSet,TemplateItemPropertiesViewSet
# from crowdsourcing.viewsets.drive import *
# from crowdsourcing.viewsets.google_drive import GoogleDriveOauth, GoogleDriveViewSet
# from crowdsourcing.viewsets.message import ConversationViewSet, MessageViewSet
# from crowdsourcing.viewsets.csvmanager import CSVManagerViewSet
# import spirit.urls


from rest_framework.routers import SimpleRouter
router = SimpleRouter(trailing_slash=True)
# router.register(r'api/profile',UserProfileViewSet)


urlpatterns = patterns('',
  # url(r'^api/v1/auth/registration-successful',views.registration_successful),
  # url(r'^api/auth/login/$', views.Login.as_view()),
  # url(r'^api/auth/logout/$', views.Logout.as_view()),
  # url(r'^api/oauth2/', include('oauth2_provider.urls', namespace='oauth2_provider')),
  # url(r'^api/oauth2-ng/token', views.Oauth2TokenView.as_view()),
  # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
  url(r'', include(router.urls)),
  url('^.*$', views.home, name='home'),
)

urlpatterns += staticfiles_urlpatterns()
