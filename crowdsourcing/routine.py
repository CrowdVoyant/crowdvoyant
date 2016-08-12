from crowdsourcing.models import *

from crowdsourcing.scrapping_methods import get_rss_link, get_rtc_links, get_see_all_link, get_headline
from crowdsourcing.regex_ops import get_ncl
from crowdsourcing.feed_entries import get_feed_entries
from crowdsourcing.article_text import get_article_text
from crowdsourcing.utils import save_image_from_url
def run_routine():
    subscriptions = Subscription.objects.all()
    for sub in subscriptions:
        rtc_links = get_rtc_links(sub.link)
        for link in rtc_links:
            ncl = get_ncl(link)
            headline = get_headline(link)
            try:
                story = Story.objects.get(headline=headline)
                # story.save()
            except Story.DoesNotExist:
                see_all_link=get_see_all_link(link)
                rss_link = get_rss_link(see_all_link)
                story = Story(subscription=sub, ncl=ncl, rtc_link=link, see_all_link=see_all_link, rss_link=rss_link, headline=headline)
                story.save()

                stories = Story.objects.all()

                for story in stories:
                    entries = get_feed_entries(story.rss_link)
                    for entry in entries:
                        try:
                            article = Article.objects.get(link=entry)
                        except Article.DoesNotExist:
                            article_data = get_article_text(entry)
                            article = Article(story=story, link=entry, title=article_data.title.encode("utf8"), source="Dummy", guid="Dummy", text=article_data.text.encode("utf8"))
                            article.save()
                            print article
                            print story.headline
                            #save images of this article
                            for image in article_data.images:
                                image_model=Image(article = article, meta_data='Dummy')
                                image_model.save()
                                print image_model
                                save_image_from_url(image_model, image)
