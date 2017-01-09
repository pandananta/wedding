$( window ).load(function() {
  var narrow = window.matchMedia( "(max-width: 650px)" ).matches;
  var navLocation = $('#header').offset().top
  var navHeight = $('#header').height()
  var navTransitionHeight = navLocation - navHeight
  var bottom = $(document).height()-$(window).height()
  var scrollTops = []
  var activeSectionId

  $('.menu-trigger-icon').click(function() {
    toggleMenu();
  });

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
    var url = $(this).attr("href")
    if (url.slice(0,1) === '#') {
      e.preventDefault();
      goTo(url)
    }
  });

  function toggleMenu () {
    var $icon = $('.menu-trigger-icon');
    
    $( ".nav-wrapper" ).slideToggle('slow');
    if ($icon.hasClass("open")) {
      $icon.removeClass('open');
    } else {
      $icon.addClass('open');
    }
  }

  function quickDismissMenu () {
    var $icon = $('.menu-trigger-icon');

    if ($icon.hasClass("open")) {
      $( ".nav-wrapper" ).hide();
      $icon.removeClass('open');
    }
  }

  function goTo(id) {
    quickDismissMenu();

    if (id === '#rsvp') {
      return
    }
    var scrollTop = scrollTops.find(function (el) { return el.id === id }).scrollTop

    $('html, body').animate({
      scrollTop: scrollTop
    }, 1200);
  }

  $(window).scroll(function() {
    var newScrollPosition = $(this).scrollTop()

    if (!narrow) {
      if (newScrollPosition < navLocation) {
        $('.nav-wrapper').removeClass("sticky");
        if (newScrollPosition < navTransitionHeight) {
          $('.nav-wrapper').css({'background-color': 'transparent'});
        } else {
          let opacity = (newScrollPosition - navTransitionHeight)/(navLocation - navTransitionHeight)
          let color = `rgba(247, 245, 241, ${opacity})`
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
      $('.navItem').removeClass('active')
      $(`.navItem[data-id=${currentSectionId}]`).addClass('active')
      activeSectionId = currentSectionId
    }
  });
});



