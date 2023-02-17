const imgContainer = document.querySelector('#img-container');
const loader = document.querySelector('#loader');

let ready = false;
let imgsLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 10;
const apiKey = '2Jm3NyBmQYd89nGcn0eovAGRMjq3FjrgzSunv5qCqu0';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imgLoaded() {
    imgsLoaded++;
    if(imgsLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for(const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create Elements for links and photos, add to dom
function displayPhotos() {
    imgsLoaded = 0;
    totalImages = photosArray.length;
    // Run Function for each object in PhotosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });
        // Create <img> to show images
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event Listener, check when each is finished loading
        img.addEventListener('load', imgLoaded);

        //put <img> inside <a>, then put both inside imgContainer element
        imgContainer.append(item);
        item.append(img);
    })
}

// Get Photos From Unsplash API
async function getPhotos() {
    try {
        const res = await fetch(apiURL);
        photosArray = await res.json();
        displayPhotos();
    } catch(err) {
        // Catch Error Here
    }
}

//Event Listener: Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})


// On Load
getPhotos();
