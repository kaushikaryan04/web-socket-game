from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Game
from django.http import JsonResponse
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import asyncio


async def create_group(room_code , username):
    channel_layer = get_channel_layer()
    await channel_layer.group_add(room_code , username ) 

@api_view(["POST"])
def register(request): 
    if request.method != "POST" :
        return JsonResponse({"Wrong request method" : "Only post allowed"} )
    # try : 
    room_code = request.data.get("room_code")
    username = request.data.get("username")
    option = request.data.get("option")
    print(option)
    if option == "create" :
        print('in create')
        g = Game.objects.create(
                creator = username,
                room_code = room_code
        )
        g.save()
    else:
        g = Game.objects.get(room_code = room_code)
        
        if g is None : 
            return JsonResponse({"error" :"No such game exists"})
        g.player = username
        g.save()

        return JsonResponse({"Nice" : "ok"})
    # except Exception as e :
    return JsonResponse({"not nice " : "not ok"})

    
        
        # asyncio.run(create_group(room_code , username))
