/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


const renderTweets = function(data) {
  //const $tweets= $('.all-tweets');
    //$tweets.empty();
    for(const tweet of data) {
      const $tweet = createTweetElement(tweet);
      $("section.all-tweets").append($tweet);
  
}

}


  const createTweetElement = (tweet) => {
    
    let $tweet = $("<article>").addClass("tweet");
    const tweetHtml = `
      <header class ="user">
        <img src = ${tweet.user.avatars}>
        <span>${tweet.user.name}</span>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <span class="content">${tweet.content.text}</span>
      <footer>
        <span>${tweet.created_at}</span>
        <div class="actions">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        `;

    $tweet.append(tweetHtml);
    return $tweet;
  };

  
  renderTweets(data);

 
  
  $("form").on('submit', function(event){
    event.preventDefault();
    console.log('The form was submitted!')
    const $data = $(this).serialize();
    console.log(data);
  
    $.ajax({ url: "/tweets", method: 'post',data: $data})
 })

});

