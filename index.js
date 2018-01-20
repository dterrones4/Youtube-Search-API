const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const API_key = "AIzaSyBWuN1-YDxYJkf5bi_y2rZu4dGZQCGgvvg"

function onSubmit(){
    $('.js-search-form').submit(function (event){
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        queryTarget.val("");
        buildApiRequest(query, displaySearchResults);
    })
}

function buildApiRequest(searchTerm, callback){
    const query = {
        q: `${searchTerm}`,
        part: 'snippet',
        key: API_key
    }
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback).done(data => console.log(data))
    .fail(error => console.log('error'));
}

function renderResult(result) {
    const snippet = result.snippet
    return `
      <div>
        <img src='${snippet.thumbnails.medium.url}' alt='${snippet.title}'>
      </div>
    `;
  }

function displaySearchResults(data) {
    const results = data.items.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);
  }

$(onSubmit);
