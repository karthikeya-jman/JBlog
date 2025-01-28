function getPostById(id) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    return posts.find(post => post.id === parseInt(id));
}

function displayPostDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    const post = getPostById(postId);
    const postDetailContainer = document.getElementById('postDetail');

    if (post) {
        // Title
        const title = document.createElement('h1');
        title.textContent = post.title;
        title.classList.add('text-3xl', 'font-bold', 'text-gray-800', 'mb-4');

        // Content
        const content = document.createElement('p');
        content.textContent = post.content;
        content.classList.add('text-gray-700');

        // Image (if available)
        if (post.imgUrl) {
            const img = document.createElement('img');
            img.src = post.imgUrl;
            img.alt = "Blog Image";
            img.classList.add('w-full', 'rounded-md', 'mb-4', 'object-cover');
            postDetailContainer.appendChild(img);
        }

        postDetailContainer.appendChild(title);
        postDetailContainer.appendChild(content);
    } else {
        postDetailContainer.innerHTML = "<p>Post not found.</p>";
    }
}

window.onload = displayPostDetail;
