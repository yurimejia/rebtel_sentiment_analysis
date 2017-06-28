from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_restful.utils import cors
from textblob import TextBlob
from nltk import word_tokenize
from nltk.corpus import stopwords
import pickle

# Stopword filtering
stop_set = set(stopwords.words('english')) 
def stopword_filtered_word_feats(words, stopset = stop_set):
    return dict([(word, True) for word in words if word not in stopset])

with open('classify_reviews.pickle', 'rb') as infile:    
    cl = pickle.load(infile)

def compute_sentiment(text):
    text_tok = stopword_filtered_word_feats(word_tokenize(text), stopset = stop_set)
    p = cl.prob_classify(text_tok).prob('pos')    
    # Map probability to [-1, 1]
    return (2 * p - 1)
    

class Sentiment(Resource):

    def options(self):
        pass
       

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('text', type=str, required=True, location='json')

        args = parser.parse_args(strict=True)

        return {
        'text': args['text'], 
        'sentiment_textblob': round(TextBlob(args['text']).sentiment.polarity, 2),
        'sentiment_cl': round(compute_sentiment(args['text']), 2)}

app = Flask(__name__)
api = Api(app)
api.decorators = [cors.crossdomain(origin='*', headers=['accept', 'Content-Type'])]
api.add_resource(Sentiment, '/api/v1/sentiment')


if __name__ == '__main__':
    app.run(debug=True)