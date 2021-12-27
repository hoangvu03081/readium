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
from utils import *

QUEUE = "ai_task_queue"
parameters = (pika.ConnectionParameters(host='readium-rabbit', port='5672', connection_attempts=50, retry_delay=2))

connection = pika.BlockingConnection(parameters)
channel = connection.channel()
channel.queue_declare(queue=QUEUE, durable=True)


mongo = ReadiumDB()

model = create_model()

print("before loop")


for method_frame, properties, body in channel.consume(QUEUE):


    # check existence of id in DB

    body = body.decode('utf-8')
    body = json.loads(body)
    id_ = str(body['id'])

    try:
        a = mongo.get_post_by_id(id_)
        content = a['content']
        chunked_text = create_chunk(content)
        summary = summarize(model, content)
    except :
        a = 2
        summary = "haha"

    with open("myfile.txt", "w") as file1:
        file1.write("hello\n")
        file1.write(id_)
        file1.write('\n')
        file1.write(summary)
        #file1.write('\n')
        #file1.write(str(mongo.db) + '\n')
        #file1.write(str(mongo.posts))


    # check existence if yes -> save, else stop continue

    # important acknowledgement
    channel.basic_ack(method_frame.delivery_tag)