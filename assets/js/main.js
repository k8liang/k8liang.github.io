
(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('is-touch');

	// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
			$form.find('textarea').each(function() {

				var $this = $(this),
					$wrapper = $('<div class="textarea-wrapper"></div>'),
					$submits = $this.find('input[type="submit"]');

				$this
					.wrap($wrapper)
					.attr('rows', 1)
					.css('overflow', 'hidden')
					.css('resize', 'none')
					.on('keydown', function(event) {

						if (event.keyCode == 13
						&&	event.ctrlKey) {

							event.preventDefault();
							event.stopPropagation();

							$(this).blur();

						}

					})
					.on('blur focus', function() {
						$this.val($.trim($this.val()));
					})
					.on('input blur focus --init', function() {

						$wrapper
							.css('height', $this.height());

						$this
							.css('height', 'auto')
							.css('height', $this.prop('scrollHeight') + 'px');

					})
					.on('keyup', function(event) {

						if (event.keyCode == 9)
							$this
								.select();

					})
					.triggerHandler('--init');

				// Fix.
					if (browser.name == 'ie'
					||	browser.mobile)
						$this
							.css('max-height', '10em')
							.css('overflow-y', 'auto');

			});

	// Menu.
		var $menu = $('#menu');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					if (href == '#menu')
						return;

					window.setTimeout(function() {
						window.location.href = href;
					}, 350);

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

});

function randomizeCards() {
  cards.forEach((card, i) => {
    // spread direction (-1, 0, +1 based on index)
    let dir = (i%3) - 1;

    // random horizontal spread based on card width
    let spread = dir * (0.8 + Math.random() * 0.15) *
                 parseInt(getComputedStyle(card).getPropertyValue('--card-w'));
	// let spread = 0;

    // random vertical lift based on card height
    let lift = -(0.8 + Math.random() * 0.1) *
               parseInt(getComputedStyle(card).getPropertyValue('--card-h'));

    // random rotation ± degrees
    let rot = dir * (6 + Math.random() * 6);

    // closed stack: small random tilt so it looks natural
    let closedRot = (Math.random() * 4 - 2) + 'deg';

    card.style.setProperty('--spread-x', spread + 'px');
    card.style.setProperty('--lift-y', lift + 'px');
    card.style.setProperty('--rot', rot + 'deg');
    card.style.setProperty('--closed-rot', closedRot);
  });
}

const folder = document.querySelector('.folder-container');
const cards = document.querySelectorAll('.card');
// run randomization every time you hover
folder.addEventListener('mouseenter', randomizeCards);

// also set initial positions once
randomizeCards();


////
document.querySelectorAll('.folder-container').forEach(folder => {
  const tooltip = folder.querySelector('.tooltiptext');

  folder.addEventListener('mousemove', (e) => {
    const rect = folder.getBoundingClientRect();   // folder box
    const x = e.clientX - rect.left;               // mouse X inside folder
    const y = e.clientY - rect.top;                // mouse Y inside folder

    tooltip.style.left = x + 10 + 'px';  // offset so not on top of cursor
    tooltip.style.top  = y + 10 + 'px';
  });
});


