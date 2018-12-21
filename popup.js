$(function () {
    chrome.storage.sync.get('skip',function(data){
        let check = data.skip==='yes';
        $("#skip").prop('checked',check);
    });
    $("#skip").change(function () {
        if ($("#skip").prop('checked') == true) {
            chrome.storage.sync.set({'skip' : 'yes'}, function(){});
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, { "todo": "start skip" });
            });
        } else {
            chrome.storage.sync.set({'skip' : 'no'}, function(){});
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, { "todo": "stop skip" });
            });
        }
    });
    chrome.runtime.onMessage.addListener(function (request, sender, sendRespond) {
        //console.log("IN LISTENER");
        if (request.todo == 'skip check') {
            $("#skip").prop('checked',true);
        }
    });
});