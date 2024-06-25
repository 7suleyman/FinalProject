(function ($) {

    "use strict";

    $.exists = function (selector) {
      return $(selector).length > 0;
    };
  
    $(window).on("load", function () {
      $(window).trigger("scroll");
      $(window).trigger("resize");
      preloaderSetup();
      isotopInit();
    });
  
    $(document).on("ready", function () {
      $(window).trigger("resize");
      dynamicBackground();
      isotopInit();
      backToTop();
      stickyFooter();
      formValidation();
      appointmentForm();
      slickInit();
      progressBarInit();
      pricingTableInit();
      stickyHeader();
      onePageNavigation();
      mobileMenu();
      mailchimpInit();
      modalVideo();
      lightGallery();
      counterInit();
      rippleInit();
      new WOW().init();
      tabs();
      accordianSetup();
      beforeAfterSlider();
      if ($.exists('.player')) {
        $('.player').YTPlayer();
      }
      if ($.exists('#udate')) {
        $('#udate').datepicker();
      }
      if ($.exists('.select1')) {
        $(".select1").select2({
          placeholder: function () {
            $(this).data('placeholder');
          },
        });
      }
  
    });
  
    $(window).on("resize", function () {
      isotopInit();
      stickyFooter();
      beforeAfterSlider();
    });
  
    $(window).on("scroll", function () {
      stickyHeader();
    });
  

    function preloaderSetup() {
      $(".perloader").fadeOut();
      $("perloader-in").delay(150).fadeOut("slow");
    }
  

    function dynamicBackground() {

      $('.dynamic-bg').each(function () {
        var src = $(this).attr('data-src');
        $(this).css({
          'background-image': 'url(' + src + ')'
        });
      });
    }

    function mobileMenu() {
      $('.nav').append('<span class="munu-toggle"><span></span></span>');
      $('.menu-item-has-children').append('<span class="munu-dropdown-toggle"></span>');
      $('.munu-toggle').on('click', function () {
        $(this).toggleClass("toggle-active").siblings('.nav-list').slideToggle();;
      });
      $('.munu-dropdown-toggle').on('click', function () {
        $(this).toggleClass('active').siblings('ul').slideToggle();
      });


      $('.site-header.style2').parents('body').addClass('get-sidebar');
    }
  

    function stickyHeader() {
      var scroll = $(window).scrollTop();
      if (scroll >= 10) {
        $('.sticky-header').addClass('sticky-active');
      } else {
        $('.sticky-header').removeClass('sticky-active');
      }
    }
  

    function onePageNavigation() {

      $('.smooth-move').on('click', function () {
        var thisAttr = $(this).attr('href');
        if ($(thisAttr).length) {
          var scrollPoint = $(thisAttr).offset().top - 10;
          $('body,html').animate({
            scrollTop: scrollPoint
          }, 800);
        }
        return false;
      });

      var topLimit = 300,
        ultimateOffset = 200;
  
      $('.onepage-nav').each(function () {
        var $this = $(this),
          $parent = $this.parent(),
          current = null,
          $findLinks = $this.find("a");
  
        function getHeader(top) {
          var last = $findLinks.first();
          if (top < topLimit) {
            return last;
          }
          for (var i = 0; i < $findLinks.length; i++) {
            var $link = $findLinks.eq(i),
              href = $link.attr("href");
  
            if (href.charAt(0) === "#" && href.length > 1) {
              var $anchor = $(href).first();
              if ($anchor.length > 0) {
                var offset = $anchor.offset();
                if (top < offset.top - ultimateOffset) {
                  return last;
                }
                last = $link;
              }
            }
          }
          return last;
        }
  
        $(window).on("scroll", function () {
          var top = window.scrollY,
            height = $this.outerHeight(),
            max_bottom = $parent.offset().top + $parent.outerHeight(),
            bottom = top + height + ultimateOffset;
  
          var $current = getHeader(top);
  
          if (current !== $current) {
            $this.find(".active").removeClass("active");
            $current.addClass("active");
            current = $current;
          }
        });
      });
    }
    
  

    function isotopInit() {
      if ($.exists('.isotop')) {
        $('.isotop').isotope({
          itemSelector: '.isotop-item',
          transitionDuration: '0.60s',
          percentPosition: true,
          masonry: {
            columnWidth: '.grid-sizer'
          }
        });

        $('.isotop-filter ul li').on('click', function (event) {
          $(this).siblings('.active').removeClass('active');
          $(this).addClass('active');
          event.preventDefault();
        });

        $('.isotop-filter ul').on('click', 'a', function () {
          var filterElement = $(this).attr('data-filter');
          $(this).parents('.isotop-filter').next().isotope({
            filter: filterElement
          });
        });
      }
    }

    function backToTop() {
      $('#backtotop').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
          scrollTop: 0
        }, 1000);
      });
    }
  

    function stickyFooter() {

      var footerHeight = ($('.sticky-footer').height());
      var windowHeight = $(window).height();
      var footerHeightPx = footerHeight + 'px';
      $('.content').css("margin-bottom", footerHeightPx);
    }
  

    function slickInit() {
      $('.slider').each(function () {

        var $ts = $(this).find('.slick-container');
        var $slickActive = $(this).find('.slick-wrapper');
        var $sliderNumber = $(this).siblings('.slider-number');
  

        var autoPlayVar = parseInt($ts.attr('data-autoplay'), 10);

        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }

        var speedVar = parseInt($ts.attr('data-speed'), 10);

        var loopVar = Boolean(parseInt($ts.attr('data-loop'), 10));

        var centerVar = Boolean(parseInt($ts.attr('data-center'), 10));

        var paginaiton = $(this).children().hasClass('pagination');

        var slidesPerView = $ts.attr('data-slides-per-view');
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == 'responsive') {
          var slidesPerView = parseInt($ts.attr('data-add-slides'), 10);
          var lgPoint = parseInt($ts.attr('data-lg-slides'), 10);
          var mdPoint = parseInt($ts.attr('data-md-slides'), 10);
          var smPoint = parseInt($ts.attr('data-sm-slides'), 10);
          var xsPoing = parseInt($ts.attr('data-xs-slides'), 10);
        }

        var fadeVar = parseInt($($ts).attr('data-fade-slide'));
        (fadeVar === 1) ? (fadeVar = true) : (fadeVar = false);

        $slickActive.slick({
          infinite: true,
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: '0',
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find('.slick-arrow-left'),
          nextArrow: $(this).find('.slick-arrow-right'),
          appendDots: $(this).find('.pagination'),
          slidesToShow: slidesPerView,
          responsive: [{
            breakpoint: 1600,
            settings: {
              slidesToShow: lgPoint
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: mdPoint
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: smPoint
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: xsPoing
            }
          }
          ]
        });
      })
    }

    function progressBarInit() {
      $('.progressbar').each(function () {
        var progressPercentage = $(this).data('progress') + "%";
        $(this).find('.progressbar-in').css('width', progressPercentage);
      });
    }

    function pricingTableInit() {
      $('.pricing-table.style1').hover(
        function () {
          $('.pricing-table.style1').addClass('active');
          $(this).removeClass('active');
        },
        function () { $('.pricing-table.style1').removeClass('active') }
      )
    }
  

    function formValidation() {
      if ($.exists('#contact-form #submit')) {
        $('#alert').hide();
        $('#contact-form #submit').on('click', function () {
          var name = $('#name').val();
          var subject = $('#subject').val();
          var phone = $('#phone').val();
          var email = $('#email').val();
          var msg = $('#msg').val();
          var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
          if (!regex.test(email)) {
            $('#alert').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please Enter Valid Email.</div>');
            return false;
          }
  
          name = $.trim(name);
          subject = $.trim(subject);
          phone = $.trim(phone);
          email = $.trim(email);
          msg = $.trim(msg);
  
          if (name != '' && email != '' && msg != '') {
            var values = "name=" + name +
              "&subject=" + subject +
              "&phone=" + phone +
              "&email=" + email +
              "&msg=" + msg;
            $.ajax({
              type: "POST",
              url: "/php/mail.php",
              data: values,
              success: function () {
                $('#name').val('');
                $('#subject').val('');
                $('#phone').val('');
                $('#email').val('');
                $('#msg').val('');
  
                $('#alert').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
                setTimeout(function () {
                  $('#alert').fadeOut('slow');
                }, 4000);
              }
            });
          } else {
            $('#alert').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> All fields are required.</div>');
          }
          return false;
        });
      }
    }

    function appointmentForm() {
      if ($.exists('#appointment-form #appointment-submit')) {
        $('#alert1').hide();
        $('#appointment-form #appointment-submit').on('click', function () {
          var uname = $('#uname').val();
          var uemail = $('#uemail').val();
          var unumber = $('#unumber').val();
          var udate = $('#udate').val();
          var udepartment = $('#udepartment').val();
          var udoctor = $('#udoctor').val();
          var umsg = $('#umsg').val();
          var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
          if (!regex.test(uemail)) {
            $('#alert1').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please Enter Valid Email.</div>');
            return false;
          }
  
          uname = $.trim(uname);
          uemail = $.trim(uemail);
          unumber = $.trim(unumber);
          udate = $.trim(udate);
          udepartment = $.trim(udepartment);
          udoctor = $.trim(udoctor);
          umsg = $.trim(umsg);
  
          if (uname != '' && uemail != '' && umsg != '') {
            var values = "uname=" + uname +
              "&uemail=" + uemail +
              "&unumber=" + unumber +
              "&udate=" + udate +
              "&udepartment=" + udepartment +
              "&udoctor=" + udoctor +
              "&umsg=" + umsg;
            $.ajax({
              type: "POST",
              url: "/php/appointment.php",
              data: values,
              success: function () {
                $('#uname').val('');
                $('#uemail').val('');
                $('#unumber').val('');
                $('#udepartment').val('');
                $('#udoctor').val('');
                $('#umsg').val('');
  
                $('#alert').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Appointment has been sent successfully.</div>');
                setTimeout(function () {
                  $('#alert1').fadeOut('slow');
                }, 4000);
              }
            });
          } else {
            $('#alert1').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> All fields are required.</div>');
          }
          return false;
        });
      }
    }

    function mailchimpInit() {
      if ($.exists('.mailchimp')) {
        if ($('.mailchimp').length > 0) {
          $('.mailchimp').ajaxChimp({
            language: 'es',
            callback: mailchimpCallback
          });
        }
  
        function mailchimpCallback(resp) {
          if (resp.result === 'success') {
            $('.subscription-success').html('<i class="fa fa-check"></i><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);
  
          } else if (resp.result === 'error') {
            $('.subscription-error').html('<i class="fa fa-times"></i><br/>' + resp.msg).fadeIn(1000);
          }
        }
        $.ajaxChimp.translations.es = {
          'submit': 'Submitting...',
          0: 'We have sent you a confirmation email',
          1: 'Please enter a value',
          2: 'An email address must contain a single @',
          3: 'The domain portion of the email address is invalid (the portion after the @: )',
          4: 'The username portion of the email address is invalid (the portion before the @: )',
          5: 'This email address looks fake or invalid. Please enter a real email address'
        };
      }
    }

    function modalVideo() {
      $(document).on('click', '.video-open', function (e) {
        e.preventDefault();
        var video = $(this).attr('href');
        $('.video-popup-container iframe').attr('src', video);
        $('.video-popup').addClass('active');
  
      });
      $('.video-popup-close, .video-popup-layer').on('click', function (e) {
        $('.video-popup').removeClass('active');
        $('html').removeClass('overflow-hidden');
        $('.video-popup-container iframe').attr('src', 'about:blank')
        e.preventDefault();
      });
    }
  

    function lightGallery() {
      $('.lightgallery').each(function () {
        $(this).lightGallery({
          selector: '.lightbox-item',
          subHtmlSelectorRelative: false,
          thumbnail: false,
          mousewheel: true
        });
      });
    }

    function counterInit() {
      $('.counter').tamjidCounter({
        duration: 700
      });
    }

    function rippleInit() {
      if ($.exists('.ripple-version')) {
        $('.ripple-version').each(function () {
          $('.ripple-version').ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
          });
        });
      }
    }
  
    function tabs() {
      $('.tabsfade-tabs .tab-links a').on('click', function (e) {
        var currentAttrValue = $(this).attr('href');
        $('.tabs ' + currentAttrValue).fadeIn(400).siblings().hide();
        $(this).parents('li').addClass('active').siblings().removeClass('active');
        e.preventDefault();
      });
    }
  
  

    function accordianSetup() {
      var $this = $(this);
      $('.accordian').children('.accordian-body').hide();
      $('.accordian.active').children('.accordian-body').show();
      $('.accordian-title').on('click', function () {
        $(this).parent('.accordian').siblings().children('.accordian-body').slideUp(250);
        $(this).siblings().slideDown(250);

        $(this).parents('.accordian').addClass('active');
        $(this).parent('.accordian').siblings().removeClass('active');
      });
    }

    function beforeAfterSlider() {
      if ($.exists('.before-after')) {
        var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
        $('.before-after').each(function () {
          var $container = $(this),
            $before = $container.find('.before'),
            $after = $container.find('.after'),
            $handle = $container.find('.handle-before-after');
  
          var maxX = $container.outerWidth(),
            offsetX = $container.offset().left,
            startX = 0;
  
          var touchstart, touchmove, touchend;
          var mousemove = function (e) {
            e.preventDefault();
            var curX = e.clientX - offsetX,
              diff = startX - curX,
              curPos = (curX / maxX) * 100;
            if (curPos > 100) {
              curPos = 100;
            }
            if (curPos < 0) {
              curPos = 0;
            }
            $before.css({ right: (100 - curPos) + "%" });
            $handle.css({ left: curPos + "%" });
          };
          var mouseup = function (e) {
            e.preventDefault();
            if (supportsTouch) {
              $(document).off('touchmove', touchmove);
              $(document).off('touchend', touchend);
            } else {
              $(document).off('mousemove', mousemove);
              $(document).off('mouseup', mouseup);
            }
          };
          var mousedown = function (e) {
            e.preventDefault();
            startX = e.clientX - offsetX;
            if (supportsTouch) {
              $(document).on('touchmove', touchmove);
              $(document).on('touchend', touchend);
            } else {
              $(document).on('mousemove', mousemove);
              $(document).on('mouseup', mouseup);
            }
          };
  
          touchstart = function (e) {
            console.log(e);
            mousedown({ preventDefault: e.preventDefault, clientX: e.originalEvent.changedTouches[0].pageX });
          };
          touchmove = function (e) {
            mousemove({ preventDefault: e.preventDefault, clientX: e.originalEvent.changedTouches[0].pageX });
          };
          touchend = function (e) {
            mouseup({ preventDefault: e.preventDefault, clientX: e.originalEvent.changedTouches[0].pageX });
          };
          if (supportsTouch) {
            $handle.on('touchstart', touchstart);
          } else {
            $handle.on('mousedown', mousedown);
          }
        });
      }
    }
  
  
  })(jQuery);