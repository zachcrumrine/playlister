// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require turbolinks
//= require_tree .



$(function(){ $(document).foundation(); });

console.log('initializing soundcloud');
SC.initialize({
  client_id: "38b3fa335acbd5c30e0a0ff39b4aadd4"
});

// Load the ToneDen JavaScripts (https://github.com/ToneDen/toneden-sdk)
(function() {
  var script = document.createElement("script");

  script.type = "text/javascript";
  script.async = true;
  script.src = "//sd.toneden.io/production/toneden.loader.js"

  var entry = document.getElementsByTagName("script")[0];
  entry.parentNode.insertBefore(script, entry);
}());