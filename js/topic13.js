
addEventListener('load', setup);
function setup() {
    const popcan = document.getElementById('popcan');
    popcan.addEventListener('click', closePopup);
    inView();
}

    
    function inView() {
        var animations = document.getElementsByClassName('leftSlide');
        var height = window.innerHeight;
        var top = window.scrollY;
        var bottom = height + top;
        for (var i = 0; i < animations.length; i++) {
            var elem = document.getElementById(animations[i].id);
            var eHeight = elem.offsetHeight;
            var eTop = elem.getBoundingClientRect().top + top;
            var eBottom = eHeight + eTop;
            
            if (eTop <= bottom - 30) {
                elem.classList.add('inView');
                if (elem.classList.contains('outView')) {
                    elem.classList.remove('outView');
                }
                
            } else {
                elem.classList.add('outView')
                if (elem.classList.contains('inView')) {
                    elem.classList.remove('inView');
                }
            }
        }
    }


window.addEventListener('scroll', inView);
window.addEventListener('resize', inView);

function openPopup() {

    const popcan = document.getElementById('popcan');
    popcan.classList.add('openPop');
    if (popcan.classList.contains('closePop')) {
        popcan.classList.remove('closePop');
    }
    }
function closePopup() {
        const popcan = document.getElementById('popcan');
        popcan.classList.add('closePop');
        if (popcan.classList.contains('openPop')) {
            popcan.classList.remove('openPop');
        }
    }
    