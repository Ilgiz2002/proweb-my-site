let video = document.querySelector(".work-process__video video");
console.log(video);


video.addEventListener('click', function () {
    video.getAttribute('controls') == 'controls' ? video.setAttribute('controls', '') : video.setAttribute('controls', 'controls')
})