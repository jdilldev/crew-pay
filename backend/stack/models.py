from django.db import models

# Create your models here.


class User(models.Model):
    name: str = models.CharField(max_length=120)
    address: str = models.TextField()
    auth_preference: str = models.BooleanField(default=False)

    def _str_(self) -> str:
        return self.name
