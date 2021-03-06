//configuração
(function () {
    newImg('http://elespacio.net/assets/images/home/slide-ev60-M.jpg');
    newImg('http://dacdavynguyen.com/img/0/tattoo-bigger.jpg');
    newImg('http://elespacio.net/assets/images/home/slide-nespresso-M.jpg');
    newImg('http://dacdavynguyen.com/img/1/alpatlas-bigger.jpg');
    call(0);
})();

//reprodução automatica 
function play() {
    setInterval(function () {
        next();
    }, 3000);
}

//cadastra um novo slide
function newImg(img) {
    img = img || 'http://elespacio.net/assets/images/home/slide-ev60-M.jpg';

    var slide = document.getElementById('sliderComponent');
    slide.innerHTML += '<div class="project"><div class="mask first-mask"><div class="cover"></div></div><div class="mask second-mask"><div class="cover"></div></div><div class="mask third-mask"><div class="cover"></div></div><div class="mask fourth-mask"><div class="cover"></div></div><div class="mask fifth-mask"><div class="cover"></div></div></div>';

    var project = slide.querySelectorAll('.project');
    var cover = project[project.length - 1].querySelectorAll('.cover');
    for (var i = 0; i < cover.length; i++) {
        cover[i].style.backgroundImage = "url('" + img + "')";
    }

    var slider = document.querySelector('#sliderComponent');
    var project = slider.querySelectorAll('.project');
    for (var i = 0; i < project.length; i++) {
        var cover = project[i].querySelectorAll('.cover');
        for (var j = 0; j < cover.length; j++) {
            cover[j].classList.add('cover-over')
        }
    }
}

//chama o próximo slide
function next() {
    var slider = document.querySelector('#sliderComponent');
    var project = slider.querySelectorAll('.project');

    var indexActive = 0;


    for (var i = 0; i < project.length; i++) {
        if (project[i].classList.contains('project-active')) {
            indexActive = i;
            project[i].classList.remove('project-active');
            i = increment(i, project);
            project[i].classList.add('project-active');
            i = project.length;
        }
    }

    transitionOver(0, project[indexActive].querySelectorAll('.cover'));
    indexActive = increment(indexActive, project);
    setTimeout(function () {
        transitionIn(0, project[indexActive].querySelectorAll('.cover'));
    }, 50)

}

//chama um slide definido no parametro
function call(id) {
    var slider = document.querySelector('#sliderComponent');
    var project = slider.querySelectorAll('.project');

    var indexActive = -1;

    for (var i = 0; i < project.length; i++) {
        if (project[i].classList.contains('project-active')) {
            project[i].classList.remove('project-active');
            indexActive = i;
        }
    }

    project[id].classList.add('project-active');
    if (id !== indexActive) {
        if (indexActive !== -1) {
            transitionOver(0, project[indexActive].querySelectorAll('.cover'));
        }
        setTimeout(function () {
            transitionIn(0, project[id].querySelectorAll('.cover'));
        }, 50)
    }
}

//executa transição para remover slide
function transitionOver(i, cover) {
    if (i < cover.length) {
        cover[i].classList.remove("cover-in");
        cover[i].classList.add("cover-over");
        var index = increment(i, cover);
        i++;
        setTimeout(function () {
            transitionOver(i, cover);
        }, 80);
    }
}

//executa transição para add slide
function transitionIn(i, cover) {
    if (i < cover.length) {
        cover[i].classList.remove("cover-over");
        cover[i].classList.add("cover-in");
        i++;
        setTimeout(function () {
            transitionIn(i, cover);
        }, 80);
    }
}

//incrementa index
function increment(index, array) {
    index++;
    if (index >= array.length) index = 0;
    return index;
}