var accordions = document.getElementsByClassName('accordion');

for (var i = 0; i < accordions.length; i++) {
  accordions[i].onclick = function () {
    this.classList.toggle('is-open');
    console.log('click');

    var content = this.previousElementSibling;
    if (content.style.maxHeight) {
      // accordion is currently open, so close it
      content.style.maxHeight = null;
    } else {
      // accordion is currently closed, so open it
      content.style.maxHeight = 300 + 'px';
    }
  };
}

var chatMessage = document.getElementById("input-field-chat");

chatMessage.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("input-button").click();
  }
}); 
