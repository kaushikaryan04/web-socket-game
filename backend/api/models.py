from django.db import models

class Game(models.Model) :
    creator = models.CharField(max_length=40)
    player = models.CharField(max_length=40 , blank= True , null = True)
    room_code = models.CharField(max_length=10)
    is_over = models.BooleanField(default=False)

    def __str__(self) :
        return f"Game created by {self.creator}"

    