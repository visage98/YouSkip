chrome.runtime.sendMessage({ todo: "showPageAction" });
let observer, list;
document.addEventListener('transitionend', function(e) {
    if (e.target.id === 'progress'){
        linkChanged();
    }
});
$(function () {
    //console.log("DOM LOADED!");
    linkChanged();
});

function linkChanged(mutationList) {
    //console.log("LINK CHANGED!")
    let adsBlock = document.getElementsByClassName('video-ads ytp-ad-module')[0];
    let config = {
        attributes: false,
        attributeOldValue: false,
        childList: true,
        subtree: true,
        characterData: false,
        characterDataOldValue: false
    };
    if (adsBlock) {
        observer = new MutationObserver(mutated);
        chrome.storage.sync.get('skip', function (data) {
            let check = data.skip === 'yes';
            if (check) {
                observer.observe(adsBlock, config);
            } else {
                observer.disconnect();
            }
        });
    }
    chrome.runtime.onMessage.addListener(function (request, sender, sendRespond) {
        if (request.todo == 'start skip') {
            observer.observe(adsBlock, config);
        }
    });
    chrome.runtime.onMessage.addListener(function (request, sender, sendRespond) {
        if (request.todo == 'stop skip') {
            observer.disconnect();
        }
    });
}

function mutated(mutationList) {
    // console.log("MUTATION DETECTED");
    // console.log(mutationList);    
    mutation = mutationList[0];
    if (mutation.type == 'childList') {
        let button = document.getElementsByClassName('ytp-ad-overlay-close-button');
        if (button.length > 0) {
            try {
                //console.log("SMALL ADD REMOVAL!");
                button[0].click();
            } catch (e) {
                //console.log("YouSkip Extension : " + e.message);
            }
        }
        var skipButton = document.getElementsByClassName("ytp-ad-skip-button");
        if (skipButton.length > 0) {
            try {
                //console.log("Pressing Skip.");
                skipButton[0].click();
            } catch (e) {
                //console.log("YouSkip Extension : " + e.message);
            }
        }
        //console.log('A child node has been added or removed.');
    }
}