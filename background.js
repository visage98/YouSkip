chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({'skip' : 'yes'}, function(){});
});

chrome.runtime.onMessage.addListener(function (request, sender, sendRespond) {
    if (request.todo == 'showPageAction') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
            chrome.pageAction.show(tab[0].id);
        });
    }
});