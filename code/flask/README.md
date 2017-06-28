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

GET request

```html
127.0.0.1:5000/api/v1/pokemon
```


POST request (in the request header set `content-type: application/json`)
```html
127.0.0.1:5000/api/v1/pokemon
```

with request body
```json
{
	"name": "Yuri",
	"number": 34
}
```
