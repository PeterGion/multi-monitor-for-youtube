let videos = [];
document.addEventListener('DOMContentLoaded', function() {
    let localstorageArray = JSON.parse(localStorage.getItem("VideosJson2"));
    /*
    console.log(localstorageArray)
    console.log(localstorageArray.length)
    console.log(localstorageArray[1].snippet.title)
    */
    for(let i = 0; i < localstorageArray.length; i++)
    {
        videos.push(localstorageArray[i]);
        let table = document.querySelector(".table");
        let row = table.insertRow(i + 1);
        let title = row.insertCell(0);
        let author = row.insertCell(1);
        let remove = row.insertCell(2);
        //console.log(videos[i])
        title.innerHTML = videos[i].snippet.title;
        author.innerHTML = videos[i].snippet.videoOwnerChannelTitle;
        console.log(videos[i]);
        remove.innerHTML = "<button type=\"button\" class=\"btn btn-danger clickButton" + (videos.length + 1) +"\">remove</button>";
            //currentLocalVideo.remove();
    }
});
    //localStorage.getItem("VideosJson2")
    //videos.push
function test()
{
    /*
    const a = {kind:"test"}
    videos.push(a);
    localStorage.setItem("testJson", JSON.stringify(videos))
    console.log(videos);
    console.log(JSON.parse(localStorage.getItem("testJson")));
    console.log(localStorage.getItem("testJson"));
    const b = {kinder:"tester"}
    videos.push(b)
    localStorage.setItem("testJson", JSON.stringify(videos))
    console.log(videos);
    console.log(JSON.parse(localStorage.getItem("testJson")));
    //chrome.storage.sync.set({testJson : videos});
    console.log(localStorage.getItem("testJson"));
    */
    //console.log(JSON.parse(localStorage.getItem("VideosJson2")));
    console.log(arr);
    
    for( var i = 0; i < arr.length; i++){ 
        if ( arr[i] === 5) { 
            arr.splice(i, 1); 
        }
    }
    console.log(arr);
}
document.querySelector(".queueButton").addEventListener("click",function() {
    //console.log("this was clicked");
    let videoId = document.getElementById('vidUrl').value;
    videoId = videoId.substring(videoId.indexOf('=') + 1);
    console.log(videoId);
    chrome.runtime.sendMessage({ msg: "startFunc", vidId: videoId, channelId: localStorage.getItem("channelId"), playlistId: localStorage.getItem("playlistId")});
})
document.querySelector(".removeAll").addEventListener("click",function() {
    localStorage.removeItem('VideosJson2');
    videos = [];
    //console.log("this was clicked")
    document.querySelectorAll('table tr:not(.heading)').forEach((tr) => {
        tr.remove();
    });
    //console.log(JSON.parse(localStorage.getItem("VideosJson2")));
    
    getPlayListIds();
})
//let dangerBtn = document.querySelectorAll("button:not(.removeAll,.queueButton)");
//for(let i = 0; i < dangerBtn.length)
//.addEventListener("click",function()
chrome.runtime.onMessage.addListener(
    function(request){
        //receiving the video
        if(request.part = "sending back video")
        {
            //console.log(request);
            //console.log(request.newData.snippet.title);
            let table = document.querySelector(".table");
            let row = table.insertRow(table.rows.length);
            let title = row.insertCell(0);
            let author = row.insertCell(1);
            let remove = row.insertCell(2);
            title.innerHTML = request.newData.snippet.title;
            author.innerHTML = request.newData.snippet.videoOwnerChannelTitle;
            remove.innerHTML = "<button type=\"button\" class=\"btn btn-danger clickButton" + (videos.length + 1) +"\">remove</button>";
            document.querySelector(".clickButton" + (videos.length + 1)).addEventListener("click",function(){
                console.log("this was clicked");
                videos.splice(videos.length, 0);
                JSON.parse(localStorage.getItem("VideosJson2")).splice(videos.length, 1);
                console.log(JSON.parse(localStorage.getItem("VideosJson2")));
                console.log(videos);
                //currentLocalVideo.remove();
            })
            videos.push(request.newData);
            localStorage.setItem("VideosJson2", JSON.stringify(videos));
            console.log(videos);
        }
    }
);
function getPlayListIds(){
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      //console.log(token);
  
      let fetchString = 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=' + localStorage.getItem('playlistId') + '&maxResults=100&key=AIzaSyDl_nNrjOieSxqZrUGiBo3mneydrl6ThwU'
      let post = 
      {
        "part": [
            "snippet"
          ],
          "id": "UC0E5pDp_c2riLV4UhEgynKA",
            "snippet": {
              "playlistId": "PLu4fFFN_062GzqARIz3gnERiJ8M4GbRcL",
              "channelId": "UC0E5pDp_c2riLV4UhEgynKA",
              }
      }
      let fetchOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(post),
      }
      fetch(fetchString,fetchOptions)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
          chrome.runtime.sendMessage({ startFunction: "startDelete", playListItemIds: data});
        })
    });
  }
  function deleteAllFromQueue(playListItemId){
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      //console.log(token);
      let fetchString = 'https://www.googleapis.com/youtube/v3/playlistItems?id=' + playListItemId + '&key=AIzaSyDl_nNrjOieSxqZrUGiBo3mneydrl6ThwU';
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
//deleteAllFromQueue("UEx1NGZGRk5fMDYyR3pxQVJJejNnbkVSaUo4TTRHYlJjTC4xREVBMTg1ODg1M0JCQUE1");
//getPlayListIds();
//test();
/*
async function addToQueue(vidId){
    return chrome.identity.getAuthToken({ interactive: true }, async function (token) {
      //console.log(token);      
      let fetchString = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyDnRNWo-EJ7ep6fjC9cpfW33fT411kdoWw'
      let post = 
      {
        "part": [
          "snippet"
        ],
        "id": "UC0E5pDp_c2riLV4UhEgynKA",
          "snippet": {
            "playlistId": "PLu4fFFN_062GzqARIz3gnERiJ8M4GbRcL",
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
      const response = await fetch(fetchString,fetchOptions)
      console.log("from addToQueue" + response);
      return response.json()
    })
  }
//addToQueue('enBoNuS2VjU')

*/
/*
{
    "kind": "youtube#playlistItem",
    "etag": "8Igl7d-DOK7UzcFLekUzTFxhKWM",
    "id": "UEx1NGZGRk5fMDYyR3pxQVJJejNnbkVSaUo4TTRHYlJjTC41MzJCQjBCNDIyRkJDN0VD",
    "snippet": {
        "publishedAt": "2022-05-08T01:42:08Z",
        "channelId": "UC0E5pDp_c2riLV4UhEgynKA",
        "title": "What are Background Scripts in Chrome Extension Development?",
        "description": "Hello everyone, welcome to SteamCode! In this video, I will show you how to use background scripts within your chrome extension and explain their functionality. If you have any questions, please do not hesitate to leave them in the comment section below!\n\n👉Previous Video: https://www.youtube.com/watch?v=WZ6wMVYWsd4&ab_channel=SteamCode\n\n👉Subscribe to SteamCode! https://www.youtube.com/channel/UClLR...​\n\n👉Github: https://github.com/SteamCodeYT​\n\n👉Patreon: https://www.patreon.com/steamcode",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/upG1HxVigDM/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/upG1HxVigDM/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/upG1HxVigDM/hqdefault.jpg",
                "width": 480,
                "height": 360
            }
        },
        "channelTitle": "Peter",
        "playlistId": "PLu4fFFN_062GzqARIz3gnERiJ8M4GbRcL",
        "position": 1,
        "resourceId": {
            "kind": "youtube#video",
            "videoId": "upG1HxVigDM"
        },
        "videoOwnerChannelTitle": "SteamCode",
        "videoOwnerChannelId": "UClLRjv91UloHweZMyxpRPrw"
    }
}
*/