// Get the blog post ID from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// Function to fetch the post by ID
function getPostById(id) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    return posts.find(post => post.id === parseInt(id));
}

// Function to populate the form with existing post data
function populateEditForm(post) {
    if (post) {
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        document.getElementById('imgUrl').value = post.imgUrl || '';
    } else {
        alert('Post not found!');
        window.location.href = 'index.html'; // Redirect to homepage if post not found
    }
}

// Function to handle form submission and update the post
function updateBlogPost(event) {
    event.preventDefault();

    // Get the updated values from the form
    const updatedTitle = document.getElementById('title').value;
    const updatedContent = document.getElementById('content').value;
    const updatedImgUrl = document.getElementById('imgUrl').value;

    // Get the posts from localStorage
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // Find the post and update it
    const postIndex = posts.findIndex(post => post.id === parseInt(postId));
    if (postIndex !== -1) {
        posts[postIndex].title = updatedTitle;
        posts[postIndex].content = updatedContent;
        posts[postIndex].imgUrl = updatedImgUrl;

        // Save the updated posts back to localStorage
        localStorage.setItem('blogPosts', JSON.stringify(posts));

        // Redirect back to the home page (or blog list page)
        window.location.href = 'index.html';
    } else {
        alert('Post not found!');
    }
}

// On page load, fetch the post and populate the form
window.onload = function() {
    const post = getPostById(postId);
    populateEditForm(post);

    // Attach the update handler to the form
    document.getElementById('editBlogForm').addEventListener('submit', updateBlogPost);
}
