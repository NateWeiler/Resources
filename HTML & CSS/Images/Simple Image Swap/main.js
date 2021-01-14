var i = 0;
var images = [];

// image list
images.push("https://a.desktopprassets.com/wallpapers/b51509d59b857efdc2441eafa2011b57693fce0a/preview_valley_waterfall.jpg");
images.push("https://a.desktopprassets.com/wallpapers/e0ae8d5ce664442667953b6c6b703e0d25df2939/preview_row_boat_in_a_pond.jpg");
images.push("https://a.desktopprassets.com/wallpapers/62ea9bb4b88325aeb19d711921b84a4ca5471e94/preview_twin_stones.jpg");

function swapImage() {
  document.slide.src = images[i];
  if (i < images.length - 1) i++;
  else i = 0;
}

$(document).ready(function() {
  document.slide.src = images[i++];
  var timer = setInterval(swapImage, 5000);
});