from crowdsourcing.models import *

from crowdsourcing.scrapping_methods import get_rss_link, get_rtc_links, get_see_all_link
from crowdsourcing.regex_ops import get_ncl
from crowdsourcing.feed_entries import get_feed_entries
from crowdsourcing.article_text import get_article_text

def run_routine():
    subscriptions = Subscription.objects.all()
    for sub in subscriptions:
    	rtc_links = get_rtc_links(sub.link)
    	for link in rtc_links:
    		ncl = get_ncl(link)
    		try:
                story = Story.objects.get(ncl=ncl)
                story.headline = get_headlines(link)
                story.save()
            except Story.DoesNotExist:
                see_all_link=get_see_all_link(link)
    			rss_link = get_rss_link(see_all_link)
                headline = get_headlines(link)
    			story = Story(subscription=sub, ncl=ncl, rtc_link=link, see_all_link=see_all_link, rss_link=rss_link, headline=)
                story.save()

    stories = Stories.objects.all()

    for story in stories:
    	entries = get_feed_entries(story.rss_link)
    	for entry in entries:
    		try:
                article = Article.objects.get(link=entry)
            except Article.DoesNotExist:
    			text = get_article_text(entry)
    			article = Article(story=story, link=entry, title=, source=, guid=, text=text, authors=, date=)
                article.save()
                #save images og this article
