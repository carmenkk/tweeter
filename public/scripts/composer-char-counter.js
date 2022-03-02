$(document).ready(function() {
  
  //let remainingCharsText = document.getElementById("remainingChars");
 $(".new-tweet textarea").on('input', function() {
    const remainingCharsText = $('#remainingChars')[0];
    const max_chars =140;
    const remaining = max_chars - $(this).val().length
    
    remainingCharsText.textContent = remaining;
    remainingCharsText.style.color= remaining <0 ? "red": "#585858";
  });
});