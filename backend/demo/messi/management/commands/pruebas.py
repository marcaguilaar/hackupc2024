from messi.models import City, User, Journey
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Load data from dataPreparation.py into our model'

    def handle(self, *args, **options):
        users = User.objects.all()
        print(users)

