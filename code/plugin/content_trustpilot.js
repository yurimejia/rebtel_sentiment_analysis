$(document).ready(function () {
	// hoverElement is used to find the revie/tweet which is being hovered over
	var hoverElement = null;
	var hoverHighlightClassName = 'hover_highlight';

	//keep track of the element that is hovered over and store it in hoverElement
	$( "*" ).mousemove(function( event ) {
		newHoverElement = $(event.target).parents('.review-stack');
		if( newHoverElement.attr('class') === "review-stack") {
			// If an element was highlighted, remove the highlighting
			if( hoverElement != null) {
				hoverElement.find('.review-body').removeClass(hoverHighlightClassName);
			}

			// highlight the new element, and update the variable preHoverElement
			newHoverElement.find('.review-body').addClass(hoverHighlightClassName);
			hoverElement = newHoverElement;
		}
	});

	// Listen to requests from the popup
	chrome.runtime.onMessage.addListener(
		function(request, sender, response) {
			if ((request.from === "popup") && (request.task === "get_sentiment_input")) {
				var review = hoverElement;
		
				var rating = $(review).find('[class^="star-rating"]')[0].className.match("count-([1-5])")[1];
				var text = $(review).find('.review-body')[0].innerText;

				var info = {
					'from': "content",
					'task': "sentiment_input",
					'rating': parseInt(rating),
					'text': text
				};

				response(info);
			}
		});
});

