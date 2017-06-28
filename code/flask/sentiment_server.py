from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_restful.utils import cors
from textblob import TextBlob

class Sentiment(Resource):

    def options(self):
        pass

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('text', type=str, required=True, location='json')

        args = parser.parse_args(strict=True)

        return {'text': args['text'], 'sentiment': round(TextBlob(args['text']).sentiment.polarity, 2)}

app = Flask(__name__)
api = Api(app)
api.decorators = [cors.crossdomain(origin='*', headers=['accept', 'Content-Type'])]
api.add_resource(Sentiment, '/api/v1/sentiment')


if __name__ == '__main__':
    app.run(debug=True)