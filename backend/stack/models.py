from django.db import models
#from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.


class User(models.Model):
    name: str = models.CharField(max_length=120)
    address: str = models.TextField()
    iso_2: str = models.CharField(max_length=2)
    phone = models.TextField()
    email = models.EmailField()

    def _str_(self) -> str:
        return self.name
