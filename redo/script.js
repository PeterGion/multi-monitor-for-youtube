
 function homepageIntial(){
    let gridRow = document.querySelectorAll('ytd-rich-grid-row > div > ytd-rich-item-renderer');
    //let gridRows = document.querySelectorAll('ytd-rich-grid-row');
    //console.log(gridRows.length);
    //gridRow[1].append(divInjection);
    //console.log(gridRow.length);
    for(let i = 0; i < gridRow.length; i++)
    {
        if(gridRow[i].querySelector('.test') === null)
        {
            let divInjection = createInjectionElement();
            gridRow[i].append(divInjection);
        }
    }
    //console.log(gridRow[0]);
    //gridRow.append(divInjection);
}
document.addEventListener("yt-navigate-finish", function(event) { 
    //observer.disconnect();
    if (jsInitChecktimer !== null) 
        clearInterval(jsInitChecktimer);
    setState();
});

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
                if(gridRow[i].querySelector('.test') === null)
                {
                    let divInjection = createInjectionElement();
                    gridRow[i].append(divInjection);
                }
            }
        }
    }
};

function createInjectionElement()
{
    let divInjection = document.createElement('div');
    divInjection.className = 'test';
    divInjection.innerHTML = 'this is a test';
    return divInjection;
}

let jsInitChecktimer = null;
//let sideBarVids = document.querySelector('#items.style-scope.ytd-watch-next-secondary-results-renderer');
function setState()
{
    jsInitChecktimer = setInterval(checkForJS_Finish, 111);
    function checkForJS_Finish()
    {
        {
            let url = window.location.href;
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
            else if(isVideo())
            {
                clearInterval(jsInitChecktimer);
                jsInitChecktimer = null;
                console.log('this is a video');
                window.setTimeout(addObserverIfDesiredNodeAvailable,1000);
                function addObserverIfDesiredNodeAvailable(){
                    let sideBarVids = document.querySelector('#items.style-scope.ytd-watch-next-secondary-results-renderer>ytd-item-section-renderer>#contents');
                    console.log(sideBarVids);
                    //let test2 = test.querySelector(':nth-child(2)');
                    let sidebar = new MutationObserver(videoCallBack);
                    sidebar.observe(sideBarVids, config);
                }
            }
        }
    }
}
function videoCallBack(mutationList, observer)
{
    for(const mutation of mutationList) {
        if (mutation.type === 'childList')
        {
            console.log('more children loaded');
            document.querySelectorAll('ytd-compact-video-renderer')
            let sideBarVidsAll = document.querySelectorAll('#items.style-scope.ytd-watch-next-secondary-results-renderer>ytd-item-section-renderer>#contents');
            for(let i = 0; i < sideBarVidsAll.length; i++)
            {
                //infinate loop here
                let divInjection = createInjectionElement();
                sideBarVidsAll[i].append(divInjection);
            }
            
            //sideBarVids = sideBarVids.querySelector('ytd-item-section-renderer:nth-child(1):nth-child(2)')
        }   
    }
}

setState();