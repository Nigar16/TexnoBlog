$(function () {

    // Side bar
    $(".hamburger").on("click", function () {
        $("aside").addClass("opened");
        $("body").addClass("disabled");
        $("body > *").not("body > aside").not("body > .modal").not("body > script").wrapAll(`<div class="wrapper"></div>`);
        $(".wrapper").append("<div class='disableAll'></div>");
        // $(".disableAll").css("display", "block");
    })

    $(".closeSideBar").on("click", closeSideBar);
    $(window).on("resize", () => { if ($(window).width() > 991) closeSideBar() })

    function closeSideBar() {
        $("aside").removeClass("opened");
        $("body").removeClass("disabled");
        $("header").unwrap();
        $(".disableAll").remove();
        // $(".disableAll").css("display", "none");

        setTimeout(() => {
            $("aside .sideBarMenu .plus").removeClass("minus");
            $(".plus").addClass("collapsed");
            $(".collapsibleMenu").removeClass("show");
        }, 400);
    }

    $("aside .sideBarMenu .articles").on("click", function () {
        $("aside .sideBarMenu .plus1").toggleClass("minus");
    })

    $("aside .sideBarMenu .news").on("click", function () {
        $("aside .sideBarMenu .plus2").toggleClass("minus");
    })


    // Night mode
    let nightModeIcon = $(".night-mode-icon");
    let nightModeLi = $(".night-mode-icon-li");
    let increaseFont = $(".article-section .increase img");
    let decreaseFont = $(".article-section .decrease img");

    $(window).on("load", function () {
        if (localStorage.getItem('darkSwitch') == 'dark') {
            nightModeIcon.addClass("night");
            nightModeIcon.attr("src", "assets/img/sun.svg");
            nightModeLi.attr("title", "Gün rejimi");
            increaseFont.attr("src", "assets/img/increase-font-night.png");
            decreaseFont.attr("src", "assets/img/decrease-font-night.png");
        }
    })

    nightModeIcon.on("click", function () {
        nightModeIcon.toggleClass("night");

        if (nightModeIcon.hasClass("night")) nightModeIcon.attr("src", "assets/img/sun.svg");
        else nightModeIcon.attr("src", "assets/img/moon.svg");

        if (nightModeLi.attr("title") == "Gecə rejimi") nightModeLi.attr("title", "Gün rejimi");
        else nightModeLi.attr("title", "Gecə rejimi");

        if (increaseFont.attr("src") == "assets/img/increase-font.png") increaseFont.attr("src", "assets/img/increase-font-night.png");
        else increaseFont.attr("src", "assets/img/increase-font.png");

        if (decreaseFont.attr("src") == "assets/img/decrease-font.png") decreaseFont.attr("src", "assets/img/decrease-font-night.png");
        else decreaseFont.attr("src", "assets/img/decrease-font.png");
    })

    // Search
    $(".search-icon").on("click", ToggleSearch);

    function ToggleSearch() {
        $(".search-icon").toggleClass("times");
        $(".search-bar").toggleClass("open");
        $(".search").val('');
    }

    // Subscription
    let subscribeButton = $(".subscribe");
    let subscriptionForm = $(".subscription-form");
    let subscriptionInput = $(".subscription-input");

    subscribeButton.on("click", function () {
        subscriptionForm.toggleClass("open");
        subscriptionInput.val('');
    })

    $(document).on("mouseup", function (e) {
        if (!(subscribeButton.is(e.target) || subscriptionInput.is(e.target))) {
            subscriptionForm.removeClass("open");
        }
    })

    // Owl-carousel
    $('.owl-carousel').owlCarousel({
        autoWidth: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 3,
                loop: true,
            },

            510: {
                items: 4,
                dots: false,
                mouseDrag: false,
                touchDrag: false,
                pullDrag: false
            }
        }
    })

    // Scroll
    let moveUpButton = $(".move-to-top");

    $(window).on("load", ShowHideMoveUp);
    $(window).scroll(ShowHideMoveUp);

    moveUpButton.on("click", function () {
        $(window).scrollTop(0, 0);
    })

    function ShowHideMoveUp() {
        if ($(window).scrollTop() >= $(".header-bottom").height()) {
            moveUpButton.fadeIn();
        }
        else {
            moveUpButton.fadeOut();
        }
    }

    // Login modal
    $('#ModalToggle').modal({backdrop: 'static', keyboard: false});
    
    $('button[data-bs-dismiss="modal"]').on('click', () => {
        $('.modal input').val('');
        $("#agreement").prop("checked", false);
    })

    // Font size
    $(".decrease").on("click",function(){
        if (parseInt($(".article-text p").css("font-size")) > 22) {
            changeFontSize(-1);
        }
    })

    $(".increase").on("click",function(){
        if (parseInt($(".article-text p").css("font-size")) < 28) {
            changeFontSize(1);
        }
    })

    function changeFontSize(direction){
        $(".article-text p, .article-text h5").each( function(){
            var $this = $(this);
            $this.css( "font-size" , parseInt($this.css("font-size"))+direction );
        });
    }

})