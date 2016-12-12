$( window ).load(function() {
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
    var url = $(this).attr("href")
    if (url.slice(0,1) === '#') {
      e.preventDefault();
      goTo(url)
    }
  });


  function goTo(id) {
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



