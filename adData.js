// adData.js

// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAAucggVXL3-hWWx6eoLjuVp9XRbOhTzqY",
    authDomain: "ysrwebads.firebaseapp.com",
    databaseURL: "https://ysrwebads-default-rtdb.firebaseio.com",
    projectId: "ysrwebads",
    storageBucket: "ysrwebads.appspot.com",
    messagingSenderId: "626902144268",
    appId: "1:626902144268:web:d0fbdb08e22ce889bae529",
    measurementId: "G-M4DFKQ5FK2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to fetch and display ad
function loadAd() {
    const adContainer = document.getElementById('ad-container');
    const bannerSize = '728x90'; // Example size, modify as needed

    // Fetch ad data from Firebase
    database.ref(`bannerAds/${bannerSize}`).once('value').then(snapshot => {
        const ads = snapshot.val();
        if (ads) {
            const adKey = Object.keys(ads)[0];
            const ad = ads[adKey];
            if (ad.status === 'active') {
                adContainer.innerHTML = `
                    <a href="${ad.adUrl}" target="_blank" onclick="trackClick('${adKey}')">
                        <img src="${ad.bannerImageUrl}" alt="${ad.campaignName}" />
                    </a>
                `;
            }
        }
    });
}

// Function to track clicks
function trackClick(adKey) {
    fetch('https://ysrwebads-default-rtdb.firebaseio.com/adInteractions.json', {
        method: 'POST',
        body: JSON.stringify({
            adKey: adKey,
            action: 'click',
            timestamp: Date.now()
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    // Also, update click count in Firebase
    const adRef = database.ref(`bannerAds/728x90/${adKey}`);
    adRef.transaction(ad => {
        if (ad) {
            ad.clicks = (ad.clicks || 0) + 1;
        }
        return ad;
    });
}

// Load ad on page load
window.onload = loadAd;
