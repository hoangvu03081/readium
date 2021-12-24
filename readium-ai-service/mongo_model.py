import os 
from pymongo import MongoClient

class ReadiumDB:
	def __init__(self):
		username = os.getenv('MONGO_USERNAME')
		password = os.getenv('MONGO_PASSWORD')
		hostname = os.getenv('MONGO_HOSTNAME')
		dbname   = os.getenv("MONGO_DATABASE_NAME")
		port     = os.getenv("MONGO_PORT")

		connectLink = f"mongodb://{username}:{password}@{hostname}:{port}/{dbname}?authSource=admin"
		print(connectLink)
		self.moConn = MongoClient(connectLink)
		print(self.moConn)
		#self.moConn = MongoClient("mongodb://<username>:<password>@<hostname>:<port>/<mongo_database_name>?authSource=admin")
		#self.db = self.moConn.readium
		#self.collection = self.db.readium
		#print(self.collection)
		print("haha")

	def insert(self, id_, data):
		pass

	def get_post_by_id(self, id_):
		return  self.collection.find_one({'id_' : id_}) 

#db = ReadiumDB()
#print(db.get_post_by_id('123'))
