document.addEventListener('DOMContentLoaded', function() {

  // allows css transitions on all elements after initial load
  var $body = document.querySelector('body');
  $body.className = $body.className.replace('preload', '');

  // removes flashed messages after timeout
  var $flashes = document.querySelectorAll('.flash');
  setTimeout(() => {
    $flashes.forEach($flash => {
      $flash.style.opacity = 1;
    });
  }, 50);
  setTimeout(() => {
    $flashes.forEach($flash => {
      $flash.style.opacity = 0;
    });
  }, 4000);

});
