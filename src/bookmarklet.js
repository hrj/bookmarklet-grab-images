/*
   Copyright 2012 Harshad RJ

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

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

  var BIG_DIMENSION = 150,      // min width of image that counts as big
      THUMBNAIL_SIZE = 64;

  logDebug("Bookmarklet and jQuery is ready");
  var allImages = $("img");
  var bigImages = allImages.filter(function() {
    return getRealWidth(this) >= BIG_DIMENSION || getRealHeight(this) >= BIG_DIMENSION;
  });
  var bigImageSrcs = bigImages.map(function(i, e){return $(e).attr("src");})

  logDebug("Number of images", allImages.length, " and big images", bigImages.length);
  logDebug("Big Images are");

  $.each(bigImageSrcs, function(i,s) {
    logDebug(i, s);
  });

  $.fn.centerMe = function () {
    return $(this).css({'left': $(window).width()/2 - $(this).width()/2, 'top': $(window).height()/2 - $(this).height()/2});
  };

  function getRealWidth(elem) {
    if (elem.naturalWidth) {
      return elem.naturalWidth;
    } else {
      return $(elem).width();
    }
  }
  function getRealHeight(elem) {
    if (elem.naturalHeight) {
      return elem.naturalHeight;
    } else {
      return $(elem).height();
    }
  }


  function aElem(tag, attrs, child) {
    var elem = $("<"+tag+" />").attr(attrs);
    var childArray = $.makeArray(child);
    $.each(childArray, function(i, c){
      elem.append(c);
    });
    return elem;
  }

  function aElemClass(tag, classes, child) {
    return aElem(tag, {"class":classes}, child);
  }

  function aElemId(tag, id, child) {
    return aElem(tag, {id:id}, child);
  }

  var popup = aElem("div", {
      id:     "bookmarklet-popup",
      style:  "position:absolute;background:#aaa;padding:4px;border-radius:4px;padding:8px;border:2px solid #888;"
    }, [
    aElem("p", {
        style:"text-align:right;margin:0;padding:0;font-family:Ubuntu,Arial;color:#666;cursor:pointer;position:relative;right:-4px;top:-4px"
      }, "x").click(function(){
      $("#bookmarklet-popup").remove();
    }),
    aElem("p", {}, "Found the following images:"),
    aElem("ul", {}, $.map(allImages, function(img,i) {
      return aElem("li", {}, [
        aElem("span", {style:"font-size:.8em"}, [getRealWidth(img), " x ", getRealHeight(img)]),
        aElem("img", {src:$(img).attr("src")},[]).css({
          "max-width":THUMBNAIL_SIZE,
          "max-height":THUMBNAIL_SIZE,
          "vertical-align":"middle",
          "padding":"4px"
        })
      ]);
    }))
  ]);
  $("body").append(popup);

  popup.centerMe();
  $(window).resize(function() { popup.centerMe(); });

});
