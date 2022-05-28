 //when the page first loads the vidoes that load with it need to have buttons below them
 function homepageIntial(){
    let gridRow = document.querySelectorAll('ytd-rich-grid-row > div > ytd-rich-item-renderer');
    //let gridRows = document.querySelectorAll('ytd-rich-grid-row');
    //console.log(gridRows.length);
    //gridRow[1].append(bfInjection);
    //console.log(gridRow.length);
    for(let i = 0; i < gridRow.length; i++)
    {
        if(gridRow[i].querySelector('.queueButton') === null)
        {
            let bfInjection = createInjectionElement();
            gridRow[i].append(bfInjection);
        }
    }
    //console.log(gridRow[0]);
    //gridRow.append(bfInjection);
}
//event lisener on youtube that looks for when the user has changed the page
document.addEventListener("yt-navigate-finish", function(event) { 
    //observer.disconnect();
    if (jsInitChecktimer !== null) 
        clearInterval(jsInitChecktimer);
    setState();
});
//console.log(document.querySelector('#contents'));
//let gridRows = document.querySelector('ytd-rich-grid-row');
let gridRows = document.querySelector('#contents');
//const targetNode = document.getElementById('some-id');
// Options for the observer (which mutations to observe)
const config = {childList: true};

const homeCallback = function(mutationList, observer) {
    for(const mutation of mutationList) {
        let gridRow = document.querySelectorAll('ytd-rich-grid-row > div > ytd-rich-item-renderer');
        if (mutation.type === 'childList') {
            //console.log('A child node has been added or removed.');
            //console.log(document.querySelectorAll('#contents'));
            for(let i = 0; i < gridRow.length; i++)
            {
                //only add the button if one isn't already present
                if(gridRow[i].querySelector('.queueButton') === null)
                {
                    let bfInjection = createInjectionElement();
                    gridRow[i].append(bfInjection);
                }
            }
        }
    }
};
let jsInitChecktimer = null;
function setState()
{
    jsInitChecktimer = setInterval(checkForJS_Finish, 111);
    function checkForJS_Finish()
    {
        {
            let url = window.location.href;
            //youtube homepage URL
            if(url === 'https://www.youtube.com/')
            {
                console.log('this is the home page');
                homepageIntial();
                let observer = new MutationObserver(homeCallback);
                observer.observe(gridRows, config);
                //console.log(typeof gridRows);
                clearInterval(jsInitChecktimer);
                jsInitChecktimer = null;
            }
            //if it is on a video page
            else if(isVideo())
            {
                clearInterval(jsInitChecktimer);
                jsInitChecktimer = null;
                console.log('this is a video');
                window.setTimeout(addObserverIfDesiredNodeAvailable,500);
                function addObserverIfDesiredNodeAvailable(){
                    let sideBar = document.querySelector('#items.style-scope.ytd-watch-next-secondary-results-renderer>ytd-item-section-renderer>#contents');
                    intialVideo(sideBar);
                    console.log(sideBar);
                    //let test2 = test.querySelector(':nth-child(2)');
                    let sidebarObserver = new MutationObserver(videoCallBack);
                    sidebarObserver.observe(sideBar, config);
                }
            }
        }
    }
}
//this must be exicuted in the beginning of the program to ensure that there are the proper rescorces allocated to each element in the extension primarily the proper mutation liseners
setState();
///////////////////////////////////////////////video page//////////////////////////////////////////////////////////////
//checks wehether or not the page is a video
function intialVideo(sideBar){
    console.log(sideBar);
    let intialSideBar = sideBar.querySelectorAll('ytd-compact-video-renderer');
    for(let i = 0; i < intialSideBar.length; i++)
    {
        if(intialSideBar[i].querySelector('.queueButton') === null)
        {
            let bfInjection = createInjectionElement();
            intialSideBar[i].append(bfInjection);
        }
    }
}
function isVideo()
{
    let url = new URL(window.location.href);
    videoId = url.searchParams.get("v");
    //console.log(document.querySelector(`ytd-watch-flexy[video-id='${videoId}']`));
    return(
        document.querySelector(`ytd-watch-flexy[video-id='${videoId}']`) !== null ||
        // mobile: no video-id attribute
        document.querySelector('#player[loading="false"]:not([hidden])') !== null
    );
}
function createInjectionElement()
{
    let bfInjection = document.createElement('button');
    bfInjection.className = 'queueButton';
    bfInjection.innerHTML = 'add to queue';
    bfInjection.addEventListener('click',function(){
        console.log('button was clicked')
    })
    return bfInjection;
}


//let sideBarVids = document.querySelector('#items.style-scope.ytd-watch-next-secondary-results-renderer');
//sets up the content script for whichever page it may be on

//this is what adds all of the queue buttons in the video page
function videoCallBack(mutationList, observer)
{
    for(const mutation of mutationList) {
        if (mutation.type === 'childList')
        {
            console.log('more children loaded');
            let sideBarVids = document.querySelectorAll('#items.style-scope.ytd-watch-next-secondary-results-renderer>ytd-item-section-renderer>#contents>ytd-compact-video-renderer');
            for(let i = 0; i < sideBarVids.length; i++)
            {
                //infinate loop here
                if(sideBarVids[i].querySelector('.queueButton') === null)
                {
                    let bfInjection = createInjectionElement();
                    sideBarVids[i].append(bfInjection);
                }
            }
        }   
    }
}
