import os 
from pymongo import MongoClient
from bson import ObjectId

class ReadiumDB:
	def __init__(self):
		username = os.getenv('MONGO_USERNAME')
		password = os.getenv('MONGO_PASSWORD')
		hostname = os.getenv('MONGO_HOSTNAME')
		dbname   = os.getenv("MONGO_DATABASE_NAME")
		port     = os.getenv("MONGO_PORT")

		connectLink = f"mongodb://{username}:{password}@{hostname}:{port}/{dbname}?authSource=admin"
		self.moConn = MongoClient(connectLink)
		self.db = self.moConn[dbname]
		self.posts = self.db.posts
		#print(self.posts)

	def insert(self, id_, data):
		pass

	def get_post_by_id(self, id_):
		return  self.posts.find_one({'_id' : ObjectId("61c961f12f67914336c86592")}) 

#db = ReadiumDB()
#print(db.get_post_by_id('123'))
