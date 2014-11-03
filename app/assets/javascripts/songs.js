# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

// Hook up soundcloud search
$('#soundcloud-search-btn').click(function() {
console.log('soundcloud search clicked');
var query = $('#soundcloud-search').val();

// Call our API using the SDK
SC.get("/tracks", 
  { q: query, limit: 5 }, 
  function(tracks) {
    // Grab the container div
    var container = $('#soundcloud-results');
    
    // Remove any previous results
    container.empty();
    
    // Loop through our track objects
    for (var i=0; i<tracks.length; i++) {
      // Create a list item to hold our players
      var list_item = $('<li>').addClass('player-list-item');
      // Set the data attribute so we can retrieve the track later
      list_item.data('track-id', tracks[i].id)
      container.append(list_item);
      
      // Create our player and add it to the page
      addPlayer(list_item, tracks[i]);

    } // End for loop
  } // End callback function
); // End SC.get call
});

// Create and add a streamable player (using ToneDen)
function addPlayer(domEle, track) {
  ToneDen.player.create({
    dom: domEle,
    single: true,
    mini: true,
    urls: [
      track.permalink_url
    ],
  });

  // This is a bit hacky, but ToneDen doesn't give us a DOMReady event
  // And the trackReady event doesn't fire if the track fails to load
  var interval = setInterval(function() {
    var playlist_link = $('.follow-link', domEle);
    if (playlist_link.length === 0) {
      return;
    }
    else {
      clearInterval(interval);
    }
    // Hijack the "follow" link to use our playlist functionality instead
    playlist_link.text('ADD TO PLAYLIST').attr('href', 'javascript:;').attr('target', '');

    // Make sure the playlist link takes up the full available space
    playlist_link.parent().removeClass('tdlarge-6').addClass('tdlarge-12');

    // Add our own event handler (and remove the default one)
    playlist_link.off('click').click(addToPlaylist);
  }, 200);
}


// Click handlers take one parameter: the event object
function addToPlaylist(event) {
  console.log("Add To Playlist clicked! Please implement me!");
  var tgt = $(event.target);
  var parent = tgt.parents('.player-list-item');
  var trackId = parent.data('track-id')
  console.log("Clicked track ID is " + trackId);
  // For simplicity sake, we can only add a single song at a time to the playlist for now
  // The goal of this function is to auto-populate the form on the page with the values
  // From the selected track (i.e. artist, genre, duration, title, etc)
  // I would recommend clearing out our current search results 
  // (or all of the list items that aren't the clicked one)
}