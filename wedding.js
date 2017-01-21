$( window ).load(function() {
  var narrow = window.matchMedia( "(max-width: 650px)" ).matches;
  var navLocation = $('#header').offset().top
  var navHeight = $('#header').height()
  var navTransitionHeight = navLocation - navHeight
  var bottom = $(document).height()-$(window).height()
  var scrollTops = []
  var activeSectionId

  $('.navItem').each(function(){
    var id = $(this).attr("data-id")
    scrollTops.unshift({ id: id, scrollTop: $(id).offset().top })
  })

  $(".navItem").click(function(e) {
   goTo($(this).attr("data-id"))
  });

  $(".rsvp-button").click(function(e) {
   goTo('#rsvp')
  });

  $('a').click(function(e) {
    var url = $(this).attr("href") || ''
    if (url.slice(0,1) === '#') {
      e.preventDefault();
      goTo(url)
    }
  });

  $('.menu-trigger').on('click', function() {
    toggleMenu();
  });

  function toggleMenu (speed) {
    var $icon = $('.menu-trigger-icon');
    speed = speed || 800

    if ($icon.hasClass("open")) {
      $icon.removeClass('open');
      $('.nav-wrapper').animate({'top': '-100%'}, speed);
    } else {
      $icon.addClass('open');
      $('.nav-wrapper').animate({'top': '0'}, speed);
    }
  }

  function quickDismissMenu () {
    var $icon = $('.menu-trigger-icon');

    if ($icon.hasClass("open")) {
      $icon.removeClass('open');
      $('.nav-wrapper').css({'top': '-100%'});
    }
  }

  function goTo(id) {
    quickDismissMenu();

    if (id === '#rsvp') {
      return
    }
    var scrollTop = scrollTops.find(function (el) { return el.id === id }).scrollTop
    console.log(scrollTops, scrollTop)

    $('html, body').animate({
      scrollTop: scrollTop
    }, 1200);
  }

  $(window).scroll(function() {
    var newScrollPosition = $(this).scrollTop()
    console.log(newScrollPosition)

    if (!narrow) {
      if (newScrollPosition < navLocation) {
        $('.nav-wrapper').removeClass("sticky");
        if (newScrollPosition < navTransitionHeight) {
          $('.nav-wrapper').css({'background-color': 'transparent'});
        } else {
          var opacity = (newScrollPosition - navTransitionHeight)/(navLocation - navTransitionHeight)
          var color = 'rgba(247, 245, 241,' +  opacity + ')'
          $('.nav-wrapper').css({'background-color': color});
        }
      } else {
        $('.nav-wrapper').addClass("sticky");
        $('.nav-wrapper').css({'background-color': 'rgba(247, 245, 241, 1)'});
      }
    } 

    var currentSection = scrollTops.find(function (el) {
      return el.scrollTop < (newScrollPosition + navHeight)
    })

    var currentSectionId = currentSection ? currentSection.id : undefined

    if (newScrollPosition >= bottom) {
      currentSectionId = '#rsvp'
    }

    if (currentSectionId !== activeSectionId) {
      var key = '.navItem[data-id=' + currentSectionId + ']'
      $('.navItem').removeClass('active')
      $(key).addClass('active')
      activeSectionId = currentSectionId
    }
  });
});



