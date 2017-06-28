# Installation #

Clone the environment (kpn) from file using conda

```shell
conda env create -f environment.yml
```

Activate the new environment (kpn)
```shell
source activate kpn
```

Activate notebooks
```shell
jupyter notebook
```

# Notebooks #
* Scrape reviews from website https://www.trustpilot.com/review/www.rebtel.com
	* scrape_data.ipynb

* Explore (raw data) reviews
	* explore_data.ipynb

* Do sentiment analysis 
	* Using TextBlob: sentiment_analysis_textblob.ipynb
	* Model: sentiment_analysis_model.ipynb

* Prepare data for ingestion in InfluxDB
	* ingest_influxdb.ipynb



