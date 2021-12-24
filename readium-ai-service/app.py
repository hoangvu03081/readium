# from flask import Flask, render_template, request
# import rabbitmq

# app = Flask(__name__)

# @app.route('/')
# def index():
#     return "IMOUTO"

# if __name__ == '__main__':
#     app.run()

import pika
import json
import os
from mongo_model import *

QUEUE = "ai_task_queue"
parameters = (pika.ConnectionParameters(host='readium-rabbit', port='5672', connection_attempts=50, retry_delay=2))

connection = pika.BlockingConnection(parameters)
channel = connection.channel()
channel.queue_declare(queue=QUEUE, durable=True)


mongo = ReadiumDB()

print("before loop")


for method_frame, properties, body in channel.consume(QUEUE):


    # check existence of id in DB


    print(body)
    body = body.decode('utf-8')
    body = json.loads(body)
    id_ = str(body['id'])
    print(id_)
    with open("myfile.txt", "w") as file1:
        file1.write(id_)


    # check existence if yes -> save, else stop continue

    # important acknowledgement
    channel.basic_ack(method_frame.delivery_tag)