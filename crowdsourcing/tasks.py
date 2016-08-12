
from celery.task.schedules import crontab
from celery.decorators import periodic_task
from celery.utils.log import get_task_logger

from crowdsourcing.routine import run_routine

logger = get_task_logger(__name__)


@periodic_task(
    run_every=(crontab(minute='*/5')),
    name="scrap google news and articles",
    ignore_result=True
)
def save_articles():
    """
    Run routine of garner to scrap links from google news and save images
    """
    run_routine()
    logger.info("Ran the routine")
