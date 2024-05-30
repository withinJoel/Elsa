//Reddit Image
async function getRedditImage(data) {
    const subreddit = data;
    const timestamp = Date.now(); // Add a timestamp as a cache buster
    const url = `https://www.reddit.com/r/${subreddit}/random.json?${timestamp}`;

    try {
        const response = await fetch(url);
        const json = await response.json();
        const post = json[0].data.children[0].data;

        if (post.post_hint === 'image') {
            return post.url;
        } else {
            // If the post is not an image, retry
            return getRedditImage();
        }
    } catch (error) {
        echo('Error fetching ' + data + ' image:', error);
        return null;
    }
}

async function redditImage(data) {
    const existingImage = document.querySelector('img[data-role="dynamic-image"]');
    if (existingImage) {
        existingImage.remove();
    }

    const imageUrl = await getRedditImage(data);
    if (imageUrl) {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.style.position = 'fixed';
        imgElement.style.top = '15px';
        imgElement.style.right = '15px';
        imgElement.style.maxWidth = '500px';
        imgElement.style.maxHeight = '500px';
        imgElement.setAttribute('data-role', 'dynamic-image');

        document.body.appendChild(imgElement);
    } else {
        echo('Failed to fetch a ' + data + ' image.');
    }
}