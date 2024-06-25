chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    console.log(request);
    if (request.jwt) {
        console.log('Token ::: ', request.jwt);
        chrome.storage.local.set({
          tokenObject: request.jwt
        });
        sendResponse({ success: true, message: 'Token has been received' });
    } else if(request.logout){
      chrome.storage.local.set({
        tokenObject: null
      });
      sendResponse({ success: true, message: 'logout success' });
    }
});