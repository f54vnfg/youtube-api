var key = 'AIzaSyAafmjyCqbVGoG8xzmKsl9AyLt3oQ1lfqs';
var pl_id = 'PL_rKDnNEBTsDdgXHiOKY-FBUr7QOqpbSa';
var url = 'https://www.googleapis.com/youtube/v3/playlistItems';

var options = {
  part: 'snippet',
  key: key,
  maxResults: 35,
  playlistId: pl_id
}

window.onload = function() {
  loadVidz();
}

function loadVidz() {
  $.getJSON(url, options, function (data) {
    var id = data.items[0].snippet.resourceId.videoId;
    mainVid(id);
    resultsLoop(data);
  });
}


  $('main').on('click', 'article', function () {
    var id = $(this).attr('data-key');
    mainVid(id);
  });

function mainVid(id) {
  // `` these symbols are called backticks, used to inject code
  // insted of having to buld the string in the usual way.
  $('#video').html(`
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media"
    allowfullscreen></iframe>
  `);
}

function resultsLoop(data) {

  $.each(data.items, function (i, item) {
    var thumb = item.snippet.thumbnails.medium.url;
    var title = item.snippet.title.toUpperCase();
    // .substring cuts the lenght of string to some value.
    var desc = item.snippet.description.substring(0, 100);
    var vid = item.snippet.resourceId.videoId;

    // .append adds to where .html rewrites everything.
    $('main').append(`
      <article class="video__wrap" data-key="${vid}">
        <img src="${thumb}" alt="" class="video__thumb">
        <div class="video__sub-wrap">
          <h4 class="video__title">${title}</h4>
          <p class="video__desc">${desc}</p>
        </div>
      </article>
    `);
  });
}

