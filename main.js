 function $id(id) {
  return document.getElementById(id);
}

// asynchronously fetch the html template partial from the file directory,
// then set its contents to the html of the parent element
// and call the given callback with url and id as parameters
function loadHTML(url, id, callback) {
	req = new XMLHttpRequest();
	req.open('GET', url);
	req.send();
	req.onload = () => {
		$id(id).innerHTML = req.responseText;
    $('#'+id).addClass('Loaded');
		if (callback)
			callback(url, id);
	}
}

function galleryButtonclick(x)
{
  $('.button-gallery').removeClass('button-active');
  $('#button-'+x).addClass('button-active');
  if(x != 'kaikki')
  {
    $('.image-gallery').css('display','none');
    $('.gallery-'+x).css('display','inline');
  }
  else
  {
    $('.image-gallery').css('display','inline');
  }
}

(function($) {

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper');

		// Page routing

		// use #! to hash
		router = new Navigo(null, true, '#!');

		var initContent = function() {
			router.updatePageLinks();
		};

    closeAll = function()
    {
      $('.dropDown').removeClass('w3-show');
    }

		var updateNav = function(page, pageTitle, pudotus)
		{
      $('#otsikko').html(pageTitle);
      document.title = pageTitle;
			$('.w3-bar-item').removeClass('active');
      if(page != "")
      {

      }
      $('#nav-'+page).addClass('active');

      if(typeof pudotus === 'string')
      {
        $('#'+pudotus).addClass('w3-show');
        $('#'+pudotus+'-up').addClass('active');
      }

		};

		router.on({
			// 'main' is the id of the div element inside which we render the HTML
      'etusivu': () => {updateNav('etusivu',"Etusivu"); loadHTML('./Content/etusivu.html','main',initContent);},
      'uutiset': () => {updateNav('uutiset',"Uutiset"); loadHTML('./Content/uutiset.html','main',initContent);},
      'galleria': () => {updateNav('galleria',"Galleria"); loadHTML('./Content/galleria.html','main',initContent);},
      'betty': () => {updateNav('betty',"Betty", "pudotus-koirat"); loadHTML('./Content/Koirat/betty.html','main',initContent);},
      'siru': () => {updateNav('siru',"Siru", "pudotus-koirat"); loadHTML('./Content/Koirat/siru.html','main',initContent);},
      'casper': () => {updateNav('casper',"Casper", "pudotus-koirat"); loadHTML('./Content/Koirat/casper.html','main',initContent);},
			      'luna': () => {updateNav('luna',"Luna", "pudotus-koirat"); loadHTML('./Content/Koirat/luna.html','main',initContent);},
      'retu': () => {updateNav('retu',"Retu", "pudotus-koirat"); loadHTML('./Content/Koirat/retu.html','main',initContent);},
      'tahvo': () => {updateNav('tahvo',"Tahvo", "pudotus-muistoissa"); loadHTML('./Content/Muistoissa/tahvo.html','main',initContent);},
      'wilma': () => {updateNav('wilma',"Wilma", "pudotus-muistoissa"); loadHTML('./Content/Muistoissa/wilma.html','main',initContent);},
      'arctic': () => {updateNav('arctic',"Arctic-pentue", "pudotus-pennut"); loadHTML('./Content/Pennut/arctic.html','main',initContent);},
      'pretty': () => {updateNav('pretty',"Pretty-pentue", "pudotus-pennut"); loadHTML('./Content/Pennut/pretty.html','main',initContent);},
      'pennut': () => {updateNav('pennut',"Pennut", "pudotus-pennut"); loadHTML('./Content/Pennut/pennut.html','main',initContent);},
      'sijoituksessa': () => {updateNav('sijoituksessa',"Sijoituskoira", "pudotus-sijoituksessa"); loadHTML('./Content/Sijoituksessa/sijoituksessa.html','main',initContent);},
      'reea': () => {updateNav('reea',"Reea", "pudotus-sijoituksessa"); loadHTML('./Content/Sijoituksessa/reea.html','main',initContent);},
	 'albert': () => {updateNav('albert',"Albert", "pudotus-sijoituksessa"); loadHTML('./Content/Sijoituksessa/albert.html','main',initContent);},
			      'yhteistyossa': () => {updateNav('yhteistyossa',"Yhteistyössä"); loadHTML('./Content/yhteistyossa.html','main',initContent);},
	'raakaruokinta': () => {updateNav('raakaruokinta',"Raakaruokinta"); loadHTML('./Content/raakaruokinta.html','main',initContent);},
      'trimmaus': () => {updateNav('trimmaus',"Trimmaus"); loadHTML('./Content/trimmaus.html','main',initContent);},
      'policy': () => {updateNav('',"Tietosuojaseloste"); loadHTML('./Content/privacy.html','main',initContent);},
      'terms': () => {updateNav('',"Käyttöehdot"); loadHTML('./Content/terms.html','main',initContent);},
      'linkkejä': () => {updateNav('linkkejä',"Linkkejä"); loadHTML('./Content/linkkejä.html','main',initContent);},


		});

		// set the default route
		router.on(() => {updateNav('etusivu',"Etusivu"); loadHTML('./Content/etusivu.html', 'main', initContent); });

		// set the 404 route
		router.notFound((query) => { $id('main').innerHTML = '<h3>Hups sivua ei löytyny...</h3> <p>Tarkista linkin oikeinkirjoitus</p>  '; })

		router.resolve();

		// Header.
			var $header = $('#mySidebar');

			// Links.
				$header.find('a').each(function() {

					var $this = $(this),
						href = $this.attr('href'),
						navigo = $this.attr('data-navigo');

					// Internal link? Skip.
						if (!href
						||	href.charAt(0) == '#'
						||  typeof navigo !== undefined)
							return;

					// Redirect on click.
						$this
							.removeAttr('href')
							.css('cursor', 'pointer')
							.on('click', function(event) {

								event.preventDefault();
								event.stopPropagation();

								window.location.href = href;

							});

				});
	});

})(jQuery);
