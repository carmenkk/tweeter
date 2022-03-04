/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  /* add escape function for Preventing XSS */
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  /* take a new tweet object and return to a html article */
  const createTweetElement = (tweet) => {

    //use timeago library to format date
    let time = timeago.format(tweet.created_at);
    
    let $tweet = $("<article>").addClass("tweet");

    //tweet inner html
    const tweetHtml = `
      <header class ="user">
        <img src = ${escape(tweet.user.avatars)}>
        <span>${escape(tweet.user.name)}</span>
        <span class="handle">${escape(tweet.user.handle)}</span>
      </header>
      <span class="content">${escape(tweet.content.text)}</span>
      <footer>
        <span>${escape(time)}</span>
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

  /* loop through each tweet object and prepend each tweet to html "all-tweets"section */
  const renderTweets = function(tweets) {
    $("section.all-tweets").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("section.all-tweets").prepend($tweet);
    }
  };
  
  /* get data.json from "/tweets", and then render tweets */
  const loadtweets = () => {
    $.ajax('/tweets',{
      method: 'GET',
      dataType: 'JSON',
    })
      .then(tweets => {
        renderTweets(tweets);
      });
  };

  /*  load initial tweets */
  loadtweets();
  
  /* click submit button, load new tweet */
  $("form").on('submit', function(event) {
    event.preventDefault();
  
    const tweetText = $(this).children('textarea').val().trim();
    $('.new-tweet p').hide();
    
    if (!tweetText) {
      $('.new-tweet p').text('--Please enter some words--');
      $('.new-tweet p').slideDown();
    } else if (tweetText.length > 140) {
      $('.new-tweet p').text("--Please enter no longer than 140 charaters--");
      $('.new-tweet p').slideDown();
    } else if (tweetText) {
      const tweet = $(this).serialize();
      $.ajax("/tweets",{method: 'post',data: tweet})
        .then(loadtweets());
        
    }
  });
});

