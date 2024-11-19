let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'https://api.npoint.io/52f25d0de2b5e6a9a5ee' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide() // Hide details initially

  // Call a function here to start the timer for the slideshow
  startTimer();
  startTimer();
  // Select the moreIndicator button and add a click event to:
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details section
  $('.moreIndicator').on('click', () => {
    $('.moreIndicator').toggleClass('rot90', 'rot270');
    $('.details').slideToggle();
  })
  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $('#nextPhoto').on('click', showNextPhoto);
  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $('#prevPhoto').on('click', showPrevPhoto);
  // Call fetchJSON() to load the initial set of images
  fetchJSON()
})

// Function to fetch JSON data and store it in mImages
function fetchJSON () {
  $.ajax({
    url: mUrl,
    method: 'GET',
    dataType: 'json',
    success: (data) => {
      mImages = data.images; 
      swapPhoto(); 
    },
    error: function () {
      alert("Error file not working")
    }
  });
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {

  const image = mImages[mCurrentIndex];
  console.log(image.imgPath);
  $('#photo').attr('src', image.imgPath);
  $('.location').text(`Location: ${image.imgLocation}`);
  $('.description').text(`Description: ${image.description}`);
  $('.date').text(`Date: ${image.date}`);

}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto () {
  mCurrentIndex++;
  if (mCurrentIndex == mImages.length) {
    mCurrentIndex = 0;
  }
  swapPhoto()
}
// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto () {
  mCurrentIndex--;
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1; 
  }
  
  swapPhoto();
  mCurrentIndex--;
}

// Starter code for the timer function
function startTimer () {
  setInterval(showNextPhoto, mWaitTime);
}