from django.db import models

# Create your models here.
class User(models.Model):
    #Atributos del user
    name = models.CharField(max_length=100)
    hobbies = models.CharField(max_length=100)
    email = models.EmailField(primary_key=True)
    pwd = models.CharField(max_length=50)

class Journey(models.Model):
    #Atributos del viatge
    # igual no queremos autoField (en el dataset tenemos los id)
    # tripID = models.AutoField(primary_key=True)    
    tripID = models.IntegerField(unique=True)
    departureDate = models.DateField()
    returnDate = models.DateField()
    departureCity = models.CharField(max_length=100)
    arrivalCity = models.CharField(max_length=100)

class City(models.Model):
    #Atributos de la ciutat
    name = models.CharField(max_length=100)

class Business(models.Model):
    #Atributos de la ciutat
    name = models.CharField(max_length=100)


class Planning(models.Model):
    journey = models.ForeignKey(Journey, on_delete=models.CASCADE)
    date = models.DateField()
    activities = models.TextField()

class Event(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateTimeField()
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    description = models.TextField()
