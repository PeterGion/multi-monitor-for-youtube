
const intial = function(){
    let gridRow = document.querySelectorAll('ytd-rich-grid-row > div > ytd-rich-item-renderer');
    //let gridRows = document.querySelectorAll('ytd-rich-grid-row');
    //console.log(gridRows.length);
    //gridRow[1].append(divInjection);
    //console.log(gridRow.length);
    for(let i = 0; i < gridRow.length; i++)
    {
        let divInjection = document.createElement('div');
        divInjection.className = 'test';
        divInjection.innerHTML = 'this is a test';
        gridRow[i].append(divInjection);
    }
    //console.log(gridRow[0]);
    //gridRow.append(divInjection);
}
document.addEventListener("yt-navigate-finish", function(event) { 
    isVideoLoaded();
    console.log(window.location.href);
    isVideo();
});
function isVideo()
{
    let url = new URL(window.location.href)
    videoId = url.searchParams.get("v")
    console.log(document.querySelector(`ytd-watch-flexy[video-id='${videoId}']`) !== null)
    return document.querySelector(`ytd-watch-flexy[video-id='${videoId}']`) !== null
}
//console.log(document.querySelector('#contents'));
//let gridRows = document.querySelector('ytd-rich-grid-row');
let gridRows = document.querySelector('#contents');
//const targetNode = document.getElementById('some-id');
// Options for the observer (which mutations to observe)
const config = {childList: true};

const callback = function(mutationList, observer) {
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
                    let divInjection = document.createElement('div');
                    divInjection.className = 'test';
                    divInjection.innerHTML = 'this is a test';
                    gridRow[i].append(divInjection);
                }
            }
        }
    }
};
const observer = new MutationObserver(callback);

observer.observe(gridRows, config);

//intial();