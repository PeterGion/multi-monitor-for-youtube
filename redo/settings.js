document.querySelector(".firstButton").addEventListener("click", function() {
    localStorage.setItem("channelId", document.querySelector('#channelId').value)
})
document.querySelector(".secondButton").addEventListener("click", function() {
    localStorage.setItem("playlistId", document.querySelector('#playlistId').value)
})
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#channelId').value = localStorage.getItem("channelId")
    document.querySelector('#playlistId').value = localStorage.getItem("playlistId")
})
