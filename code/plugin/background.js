chrome.contextMenus.create({
	"id": "fake_id",
	"title": "Analyze review",
	"contexts": ["all"]
});

chrome.contextMenus.onClicked.addListener(clickHandler);

function clickHandler(info, tab) {
	chrome.tabs.create({
            url: chrome.extension.getURL('popup.html'),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',//TODO: change back to popup
                focused: true,
                height: 400, 
                width:800
                // incognito, top, left, ...
            });
        });
}