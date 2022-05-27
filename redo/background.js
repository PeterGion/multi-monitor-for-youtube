function createQueue(){
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    console.log(token);      
    let fetchString = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&key=AIzaSyDl_nNrjOieSxqZrUGiBo3mneydrl6ThwU'
    let post = 
    {
      "part": [
        "kind,snippet,channelTitle,status"
      ],
      "kind": "youtube#playlistItem",
      "snippet":{
        "title": "queue",
        "channelID": "UC0E5pDp_c2riLV4UhEgynKA",
        "defaultLanguage": "en",
      "status": {
          "privacyStatus": "private"
        }
      }
    }
    let fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    }
    
    fetch(fetchString,fetchOptions)
      .then((response) => response.json()) // Transform the data into json
      .then(function (data) {
        console.log(data);//contains the response of the created event
    });
  });
  
};
chrome.runtime.onMessage.addListener(
  function(request){
      //if(request.msg == "startFunc") createQueue();
      if(request.msg == "startFunc") 
      {
        console.log(request.vidId);
        addToQueue(request.vidId, request.channelId, request.playlistId);
      }
      else if(request.startFunction === "startDelete")
        //console.log(request.playListItemIds);
        deleteAllFromQueue(request.playListItemIds)
  }
);
function addToQueue(vidId, channelId, playlistId){
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    //console.log(token);
    let fetchString = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyDl_nNrjOieSxqZrUGiBo3mneydrl6ThwU'
    let post = 
    {
      "part": [
        "snippet"
      ],
      "id": channelId,
        "snippet": {
          "playlistId": playlistId,
          "position": 1,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": vidId
          }
      }
    }
    let fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    }
    fetch(fetchString,fetchOptions)
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        chrome.runtime.sendMessage({newData: data,part:"sending back video"});
    });
  })
}
function deleteAllFromQueue(playListItemIds){
  console.log(playListItemIds.items.length);
  console.log(playListItemIds.items[0].id);
  for(let i = 0; i < playListItemIds.items.length; i++)
  {
    
    let videoId = playListItemIds.items[i].id;
    //console.log(videoId);
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      let fetchString = 'https://www.googleapis.com/youtube/v3/playlistItems?id=' + videoId + '&key=AIzaSyDl_nNrjOieSxqZrUGiBo3mneydrl6ThwU';
      let fetchOptions = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(post),
      }
      fetch(fetchString, fetchOptions)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
          //chrome.runtime.sendMessage({newData: data,part:"sending back video"});
      });
    })
  }
}
//////////////////////////////////////////////////////background script 2.0///////////////////////////////////////////////////////////////////////
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) 
{
    console.log(changeInfo.url);
    if (changeInfo.url) 
    {
      console.log(changeInfo.url);
      //chrome.runtime.sendMessage(tabId, {url: changeInfo.url});
    }
  }
);