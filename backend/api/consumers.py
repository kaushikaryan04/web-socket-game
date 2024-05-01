from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
import json 
from .models import Game
from channels.db import database_sync_to_async

class GameConsumer(AsyncWebsocketConsumer) :
    async def connect(self):
        room_code = self.scope['url_route']["kwargs"]["room_code"]
        self.room_name = room_code

        self.room_group_name = "room_%s" % self.room_name
        print(self.room_group_name)
        # in this group there would be a root of groups we have just added one more 
        # if Game.objects.get(room_code = self.room_name):
        #     pass 

        await self.channel_layer.group_add(
            self.room_group_name , 
            self.channel_name
        )
        await self.accept()

    async def disconnect(self,close_code):
        await self.channel_layer.group_discard(
            self.room_group_name , 
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        print(data)
        await self.channel_layer.group_send(
            self.room_group_name ,{
                "type" : "run_game",
                "payload" : data
            }
        )
        if "winner" in data :
            room_code = data["room_code"]
            g = await self.get_game(room_code)
            g.is_over = True 
            await database_sync_to_async(g.save)()
            # await self.close()

    @database_sync_to_async
    def get_game(self, room_code):
        return Game.objects.get(room_code=room_code)
    
    async def run_game(self , event):
        print("sending ... ")
        print(event["payload"])
        await self.send(text_data=json.dumps(event["payload"]))
