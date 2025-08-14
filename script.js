document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const buttons = document.querySelectorAll(".buttons button");
    const imageViewer = document.getElementById("image-viewer");
    const fullImage = document.getElementById("full-image");

    const platforms = {
        youtube: Array.from({ length: 10 }, (_, i) => `images/youtube/youtube${i+1}.jpg`),
        twitch: Array.from({ length: 10 }, (_, i) => `images/twitch/twitch${i+1}.jpg`),
        spotify: Array.from({ length: 10 }, (_, i) => `images/spotify/spotify${i+1}.jpg`),
        kick: Array.from({ length: 10 }, (_, i) => `images/kick/kick${i+1}.jpg`)
    };

    let currentImages = [];
    let currentIndex = 0;

    function loadGallery(platform) {
        gallery.style.opacity = 0;
        setTimeout(() => {
            gallery.innerHTML = "";
            currentImages = platforms[platform];
            currentIndex = 0;
            currentImages.forEach((src, index) => {
                const img = document.createElement("img");
                img.src = src;
                img.addEventListener("click", () => openViewer(index));
                gallery.appendChild(img);
            });
            gallery.style.opacity = 1;
        }, 300);
    }

    function openViewer(index) {
        currentIndex = index;
        fullImage.src = currentImages[currentIndex];
        imageViewer.classList.remove("hidden");
    }

    fullImage.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        fullImage.src = currentImages[currentIndex];
    });

    imageViewer.addEventListener("click", (e) => {
        if (e.target !== fullImage) {
            imageViewer.classList.add("hidden");
        }
    });

    buttons.forEach(btn => {
        btn.addEventListener("click", () => loadGallery(btn.dataset.platform));
    });
});