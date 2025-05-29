from typing import Iterable
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    role_choices = [
        ('admin', 'ADMIN'),
        ('user', 'USER')
    ]
    role = models.CharField(max_length= 255, choices= role_choices, default= "USER")
    full_name = models.CharField(max_length= 255)

    def save(self, *args, **kwargs):
        self.is_staff = (self.role == 'admin')
        super().save(*args, **kwargs)