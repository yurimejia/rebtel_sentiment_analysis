$(document).ready(function () {
	// hoverElement is used to find the revie/tweet which is being hovered over
	var hoverElement = null;
	var hoverHighlightClassName = 'hover_highlight';

	//keep track of the element that is hovered over and store it in hoverElement
	$( ".stream li" ).mousemove(function( event ) {
		if( hoverElement != null) {
			hoverElement.find('.js-tweet-text-container').removeClass(hoverHighlightClassName)
		}

		$(this).find('.js-tweet-text-container').addClass(hoverHighlightClassName)
		hoverElement = $(this)
	});

	// Listen to requests from the popup
	chrome.runtime.onMessage.addListener(
		function(request, sender, response) {
			if ((request.from === "popup") && (request.task === "get_sentiment_input")) {
				var info = {
					'from': "content",
					'task': "sentiment_input",
					'text': hoverElement.find("p:first").text()
				};

				response(info);
			}
		});
});

