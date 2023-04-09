from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    caloriesMin = models.IntegerField(default=20)
    caloriesMax = models.IntegerField(default=2000)
    vegan = models.BooleanField(default=False)
    alcoholFree = models.BooleanField(default=False)
    dairyFree = models.BooleanField(default=False)
