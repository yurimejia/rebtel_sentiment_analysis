Installation

```shell
# create flask environment with flask
# pick python 3.5 for compatibility with flask-restful
conda create --name flask_env python=3.5 flask
# install flask-restful
conda install -c conda-forge --name flask_env flask-restful=0.3.5
```

To run first set the `FLASK_APP`

```shell
export FLASK_APP=sentiment_server.py
flask run
```


POST request (in the request header set `content-type: application/json`)
```html
127.0.0.1:5000/api/v1/sentiment
```

with request body
```json
{
	"text": "Rebtel is awesome, best service ever."	
}
```

For example, from shell you can execute
```shell
curl -H "Content-Type: application/json" -X POST -d '{"text": "Rebtel is awesome, best service ever."}' http://localhost:5000/api/v1/sentiment

```

which returns the json output

```json
{
	"text": "Rebtel is awesome, best service ever.", 
	"sentiment": 1.0
}
```
