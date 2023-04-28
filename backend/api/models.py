from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    MEALTYPES = [
        ('', ''),
        ('breakfast', 'breakfast'),
        ('lunch', 'lunch'),
        ('dinner', 'dinner'),
        ('snack', 'snack'),
        ('teatime', 'teatime'),
    ]
    DIShTYPES = [
        ('', ''),
        ('biscuits and cookies', 'biscuits and cookies'),
        ('bread', 'bread'),
        ('cereals', 'cereals'),
        ('condiments and sauces', 'condiments and sauces'),
        ('desserts', 'desserts'),
        ('drinks', 'drinks'),
        ('main course', 'main course'),
        ('pancake', 'pancake'),
        ('preps', 'preps'),
        ('preserve', 'preserve'),
        ('salad', 'salad'),
        ('sandwiches', 'sandwiches'),
        ('side dish', 'side dish'),
        ('soup', 'soup'),
        ('starter', 'starter'),
        ('sweets', 'sweets'),
    ]
    CUISINETYPES = [
        ('', ''),
        ('American', 'American'),
        ('Asian', 'Asian'),
        ('British', 'British'),
        ('Caribbean', 'Caribbean'),
        ('Central Europe', 'Central Europe'),
        ('Chinese', 'Chinese'),
        ('Eastern Europe', 'Eastern Europe'),
        ('French', 'French'),
        ('Indian', 'Indian'),
        ('Italian', 'Italian'),
        ('Japanese', 'Japanese'),
        ('Kosher', 'Kosher'),
        ('Mediterranean', 'Mediterranean'),
        ('Mexican', 'Mexican'),
        ('Middle Eastern', 'Middle Eastern'),
        ('Nordic', 'Nordic'),
        ('South American', 'South American'),
        ('South East Asian', 'South East Asian'),
    ]

    caloriesMin = models.IntegerField(default=20)
    caloriesMax = models.IntegerField(default=2000)
    vegan = models.BooleanField(default=False)
    alcoholFree = models.BooleanField(default=False)
    dairyFree = models.BooleanField(default=False)
    mealType = models.TextField(default='')
    dishType = models.TextField(default='')
    cuisineType = models.TextField(default='')
