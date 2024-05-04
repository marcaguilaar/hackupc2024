from django.db import models

# Create your models here.
class User(models.Model):
    #Atributos del user
    name = models.CharField(max_length=100)
    hobbies = models.CharField(max_length=100)
    email = models.EmailField(primary_key=True)
    pwd = models.CharField(max_length=50)
    journeys = models.ManyToManyField('Journey', related_name='users')


class Journey(models.Model):
    #Atributos del viatge
    # igual no queremos autoField (en el dataset tenemos los id)
    # tripID = models.AutoField(primary_key=True)    
    tripID = models.IntegerField(unique=True)
    departureDate = models.DateField()
    returnDate = models.DateField()
    departureCity = models.CharField(max_length=100)
    arrivalCity = models.CharField(max_length=100)
    businesses = models.ManyToManyField('Business', related_name='journeys')
    cities = models.ManyToManyField('City', related_name='journeys')

class City(models.Model):
    #Atributos de la ciutat
    name = models.CharField(max_length=100)
    events = models.ManyToManyField('Event', related_name='cities')


class Business(models.Model):
    #Atributos de la ciutat
    name = models.CharField(max_length=100)


class Planning(models.Model):
    journey = models.ForeignKey(Journey, on_delete=models.CASCADE)
    date = models.DateField()
    events = models.ManyToManyField('Event', related_name='plannings')

class Event(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateTimeField()
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    description = models.TextField()
    participants = models.ManyToManyField(User, related_name='events')

class Group(models.Model):
    users = models.ManyToManyField(User, related_name='groups')
    date = models.DateField()
    city = models.ForeignKey(City, on_delete=models.CASCADE)