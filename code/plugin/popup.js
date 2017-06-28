$(document).ready(function () {
    // Update the designated fields after doing a sentiment analysis
  function setDOMInfo(info){
    // querying the api
    $.post({
        type: "POST",
        //the url where you want to sent the userName and password to
        url: 'http://127.0.0.1:5000/api/v1/sentiment',
        contentType: "application/json",
        dataType: 'json',
        async: false,
        //json object to sent to the authentication url
        data: JSON.stringify({ text: info.text }),
        success: function (response) {
          sentiment = response.sentiment
        }
    });
    // updating the status
    document.getElementById('status').innerText = "Sentiment Analysis done!";
    document.getElementById('review_text').innerText = info.text;
    document.getElementById('sentiment').innerText = "Sentiment: " + sentiment;
    if( "rating" in info) {
        document.getElementById('rating').innerText = "Rating: " + info.rating + " star(s)";
    };
  };

  chrome.tabs.query({active: true, currentWindow: false}, function (tabs) {
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', task: 'get_sentiment_input'},
        setDOMInfo);
  });
});