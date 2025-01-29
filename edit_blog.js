window.onload = function () {
    // Retrieve the post to be edited from localStorage
    const post = JSON.parse(localStorage.getItem('editPost'));

    // If the post is found, populate the form with its data
    if (post) {
        document.getElementById('postId').value = post.id;
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        document.getElementById('imgUrl').value = post.imgUrl;
    } else {
        alert("Post not found in localStorage!"); // Alert if the post is not found
        window.location.href = 'index.html'; // Redirect back to home if post is missing
    }

    // Handle form submission
    const form = document.getElementById('editBlogForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const id = document.getElementById('postId').value;
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const imgUrl = document.getElementById('imgUrl').value;

        // Get the existing blog posts from localStorage
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

        // Find the post to update
        const index = posts.findIndex(post => post.id === parseInt(id));

        if (index !== -1) {
            // Update the post with new data
            posts[index] = {
                id: parseInt(id),
                title: title,
                content: content,
                imgUrl: imgUrl,
                date: new Date().toLocaleString(),
                views: posts[index].views // Keep the original view count
            };

            // Save the updated posts array back to localStorage
            localStorage.setItem('blogPosts', JSON.stringify(posts));

            // Clear the editPost key from localStorage
            localStorage.removeItem('editPost');

            // Redirect to the main blog page
            window.location.href = 'index.html';
        } else {
            alert("Error: Post not found during update!");
        }
    });
};
