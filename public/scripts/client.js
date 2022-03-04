/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = (tweet) => {
    let time = timeago.format(tweet.created_at);
    console.log(timeago);
    let $tweet = $("<article>").addClass("tweet");
    const tweetHtml = `
      <header class ="user">
        <img src = ${tweet.user.avatars}>
        <span>${tweet.user.name}</span>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <span class="content">${tweet.content.text}</span>
      <footer>
        <span>${time}</span>
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

  const renderTweets = function(data) {
    for(const tweet of data) {
      const $tweet = createTweetElement(tweet);
      $("section.all-tweets").append($tweet);
    }
  }
  
 

  const loadtweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        console.log("data", tweets);
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(`error: ${err}`)
      } 
    });
  };

  loadtweets();
  
  $("form").on('submit', function(event){
    event.preventDefault();
    console.log('The form was submitted!')
    
    const tweetText = $(this).children('textarea').val();
    if (!tweetText) {
      alert("Please enter some words.")
    } else if (tweetText.length > 140) {
      alert("Your tweet is too long.Please enter no longer than 140 charaters.")
    } else if (tweetText) {
      const tweet = $(this).serialize();
      $.ajax({ url: "/tweets", method: 'post',data: tweet})

    }
 })



});

