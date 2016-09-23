$(function() {
    var e = $(".sys_show_popup_login"),
        t = $("#sys_popup_common");
    if ($("#md-slider-1").length) {
        $("#md-slider-1").mdSlider({
            fullwidth: true,
            transitions: "fade",
            width: 980,
            height: 365,
            responsive: true,
            slideShowDelay: 6e3,
            slideShow: true,
            loop: true,
            showLoading: false,
            showArrow: 1,
            showBullet: 1,
            posBullet: 2,
            showThumb: false,
            enableDrag: true
        })
    }
    getTwitters("sys_lst_tweets", {
        id: "megadrupal",
        count: 2,
        template: '<div class="tweet-item"><p class="rs tweet-mind">%text%</p><p class="rs timestamp">posted %time%</p></div>'
    });
    if ($("#slider1").length > 0) {
        $("#slider1").responsiveSlides({
            auto: false,
            pager: true,
            nav: true,
            speed: 500,
            maxwidth: 800,
            namespace: "centered-btns"
        })
    }
    $(".tabbable").on("click", ".nav-tabs > li", function() {
        if ($(this).hasClass("disable")) return false;
        var e = $(this).index();
        $(this).siblings().removeClass("active").end().addClass("active");
        $(this).parents(".tabbable").find(".tab-content .tab-pane").removeClass("active").eq(e).addClass("active");
        return false
    });
    $(".accordion").on("click", ".accordion-label", function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active").siblings(".accordion-content").slideUp(400, function() {
                $(this).removeClass("active").removeAttr("style")
            })
        } else {
            $(this).parents(".accordion").find(".accordion-label").removeClass("active");
            $(this).addClass("active").siblings(".accordion-content").slideDown(400, function() {
                $(this).addClass("active").removeAttr("style")
            });
            $(this).parent().siblings().find(".accordion-content").slideUp(400, function() {
                $(this).removeClass("active").removeAttr("style")
            })
        }
        return false
    });
    e.on("click", function() {
        t.fadeIn();
        $("body").on("keydown.closePopup", function(e) {
            var n = e.keyCode ? e.keyCode : e.which;
            if (n == 27) {
                t.find(".closePopup").trigger("click")
            }
        });
        return false
    });
    t.on("click.closePopup", ".closePopup,.overlay-bl-bg", function() {
        t.fadeOut(function() {
            $("body").off("keydown.closePopup")
        })
    });
    t.on("click", ".main-content", function(e) {
        e.stopPropagation()
    });
    $("#showmoreproject").bind("click", function(e) {
        _self = $(this);
        _self.text("Loading...");
        $.ajax({
            url: "ajax/category.php"
        }).done(function(e) {
            $("#list-project-ajax").append(e);
            _self.text("Show more projects")
        });
        return false
    });
    $("#showmorepost").bind("click", function(e) {
        _self = $(this);
        _self.text("Loading...");
        $.ajax({
            url: "ajax/blog.php"
        }).done(function(e) {
            $("#list-blog-ajax").append(e);
            _self.text("Show more posts")
        });
        return false
    });
    $("#showmoreresults").bind("click", function(e) {
        _self = $(this);
        _self.text("Loading...");
        $.ajax({
            url: "ajax/search-results.php"
        }).done(function(e) {
            $("#list-search-ajax").append(e);
            _self.text("Show more projects")
        });
        return false
    });
    if (jQuery("#contact-form").length > 0) {
        jQuery("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 10
                }
            },
            messages: {
                name: {
                    required: "Please enter your name.",
                    minlength: jQuery.format("At least {0} characters required.")
                },
                email: {
                    required: "Please enter your email.",
                    email: "Please enter a valid email."
                },
                message: {
                    required: "Please enter a message.",
                    minlength: jQuery.format("At least {0} characters required.")
                }
            },
            submitHandler: function(e) {
                jQuery("#submit-contact").attr("value", "Sending...");
                jQuery(e).ajaxSubmit({
                    success: function(t, n, r, i) {
                        jQuery("#response").html(t).hide().slideDown("fast");
                        jQuery("#submit-contact").attr("value", "Submit");
                        jQuery(e).find("input[type=text]").val("");
                        jQuery(e).find("input[type=email]").val("");
                        jQuery(e).find("input[type=url]").val("");
                        jQuery(e).find("textarea").val("")
                    }
                });
                return false
            }
        })
    }
    var n = $("#sys_btn_toggle_search"),
        r = $("#sys_header_right");
    n.on("click", function() {
        r.slideToggle(function() {
            if ($(this).is(":visible")) {
                $(this).addClass("active")
            } else {
                $(this).removeClass("active")
            }
            $(this).removeAttr("style")
        });
        n.toggleClass("active")
    });
    $("#btn-toogle-menu").sidr({
        side: "left",
        name: "alternate-menu",
        source: "#right-menu"
    });
    if ($("#sys-nav-menu-blog").length > 0) {
        selectnav("sys-nav-menu-blog")
    }
})