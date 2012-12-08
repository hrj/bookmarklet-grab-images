javascript: (function (e, a, g, h, f, c, b, d) {
    if (!(f = e.jQuery) || g > f.fn.jquery || h(f)) {
        c = a.createElement("script");
        c.type = "text/javascript";
        c.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + g + "/jquery.min.js";
        c.onload = c.onreadystatechange = function () {
            if (!b && (!(d = this.readyState) || d == "loaded" || d == "complete")) {
                h((f = e.jQuery).noConflict(1), b = 1);
                f(c).remove()
            }
        };
        a.documentElement.childNodes[0].appendChild(c)
    }
})(window, document, "1.8.3", function ($, L) {
  function logDebug() {
   if(console) {
     if(console.log) {
       console.log(arguments);
     }
   }
  }

  var BIG_WIDTH = 150;      // min width of image that counts as big

  logDebug("Bookmarklet and jQuery is ready");
  var allImages = $("img");
  var bigImages = allImages.filter(function() {
    return $(this).width() >= BIG_WIDTH;
  });
  var bigImageSrcs = bigImages.map(function(i, e){return $(e).attr("src");})
  logDebug("Number of images", allImages.length, " and big images", bigImages.length);
  logDebug("Big Images are");

  $.each(bigImageSrcs).foreach( function(i,s) {
    logDebug(i, s);
  });
});
