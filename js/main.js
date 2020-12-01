//carousel
$('.carousel').carousel();

//marquee
$('.marquee').marquee({
	//duration in milliseconds of the marquee
	duration: 15000,
	//gap in pixels between the tickers
	gap: 70,
	//time in milliseconds before the marquee will start animating
	delayBeforeStart: 0,
	//'left' or 'right'
	direction: 'left',
	//true or false - should the marquee be duplicated to show an effect of continues flow
	duplicated: true
});

//.isotope
/*// init Isotope
var $grid = $('.grid').isotope({
  // options
});
// filter items on button click
$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});*/

// init Isotope
// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.element-item'
});

var $filterButtons = $('.filters .button');

updateFilterCounts();

// store filter for each group
var filters = {};

$('.filters').on( 'click', '.button', function() {
  var $this = $(this);
  // get group key
  var $buttonGroup = $this.parents('.button-group');
  var filterGroup = $buttonGroup.attr('data-filter-group');
  // set filter for group
  filters[ filterGroup ] = $this.attr('data-filter');
  // combine filters
  var filterValue = concatValues( filters );
  // set filter for Isotope
  $grid.isotope({ filter: filterValue });
  updateFilterCounts();
});

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});
  
// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}

function updateFilterCounts()  {
  // get filtered item elements
  var itemElems = $grid.isotope('getFilteredItemElements');
  var $itemElems = $( itemElems );
  $filterButtons.each( function( i, button ) {
    var $button = $( button );
    var filterValue = $button.attr('data-filter');
    if ( !filterValue ) {
      // do not update 'any' buttons
      return;
    }
    var count = $itemElems.filter( filterValue ).length;
    $button.find('.filter-count').text( '(' + count +')' );
  });
}


// Modal window for games
$(function() {

	//Создание объекта "Modal"
	var modal = {
		self: $('#modal'),                               //Модульное окно

		showModal: function(content) {                   //Показать окно
			this.self.find('#innerModal').html(content);
			this.self.fadeIn(200);
		},

		hideModal: function() {                          //Спрятать окно
			this.self.fadeOut(200);
			this.self.find('#innerModal').html('');
		}
	};

//Обработка события нажатия кнопки 'SHOW MODAL'
$(".showModal").on('click',function(e) {
	var id = $(this).data('id');
	var content = $('#cont'+id).html();
	modal.showModal(content);
});
//Обработка события клика на само модульное окно
$('#modal').on('click',function(e) {

	if ($(e.target).attr('id') === 'modal' || $(e.target).hasClass('closeModal')) { //Проверка объекта клика
		modal.hideModal();
	} else {
		return false;
	}
})

});