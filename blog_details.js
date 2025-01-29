document.addEventListener('DOMContentLoaded', function() {

    function createBlogPost(event) {
    
        event.preventDefault();  
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const imgUrl = document.getElementById('imgUrl').value;
    
        let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    
        const newPost = {
            id: Date.now(),  
            title: title,
            content: content,
            imgUrl: imgUrl,
            date: new Date().toLocaleString()
        };
    
        // console.log("Hi");
    
        posts.push(newPost);
    
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    
    
        document.getElementById('createBlogForm').reset();
        window.location.href = 'index.html';
    }
    
    document.getElementById('createBlogForm').addEventListener('submit', createBlogPost);
     });
    
    

// Function to display blogs
function displayBlogs() {
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const blogListContainer = document.getElementById('blogList');
    blogListContainer.innerHTML = '';  // Clear the container

    if (!posts || posts.length === 0) {
        blogListContainer.innerHTML = "<p>No blog posts available.</p>";
        return;
    }

    posts.forEach(post => {
        const blogPostDiv = document.createElement('div');
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('flex','flex-col','items-start');
        blogPostDiv.classList.add('blog-post', 'border', 'p-4', 'mb-4', 'bg-white', 'flex', 'gap-5', 'items-start', 'cursor-pointer','rounded-md');
        blogPostDiv.addEventListener('click', () => {
            // Increment views on click
            incrementViewCount(post.id);

            // Redirect to the post detail page
            window.location.href = `post.html?id=${post.id}`;
        });

        // Title
        const title = document.createElement('h2');
        title.textContent = post.title;
        title.classList.add('text-xl', 'font-bold', 'text-gray-800');

        // Content (with line-clamp for 2 lines)
        const content = document.createElement('p');
        content.textContent = post.content;
        content.classList.add('text-gray-700', 'line-clamp-2');

        // Image (if available)
        if (post.imgUrl) {
            const img = document.createElement('img');
            img.src = post.imgUrl;
            img.alt = "Blog Image";
            img.classList.add('w-100', 'rounded-md', 'object-cover');
            blogPostDiv.appendChild(img);
        }

        // Views, Edit, and Delete
        const actionDiv = document.createElement('div');
        actionDiv.classList.add('flex','flex-col', 'gap-5','items-start','justify-between', 'items-center', 'mt-3');

        const views = document.createElement('span');
        views.textContent = `Views: ${post.views || 0}`;
        views.classList.add('text-sm', 'text-gray-500');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('text-blue-600', 'hover:text-blue-800');
        editButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from triggering redirect
            console.log()
            editPost(post.id); // Call edit function
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('text-red-600', 'hover:text-red-800');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from triggering redirect
            deletePost(post.id); // Call delete function
        });

        actionDiv.appendChild(views);
        actionDiv.appendChild(editButton);
        actionDiv.appendChild(deleteButton);

        contentDiv.appendChild(title);
        contentDiv.appendChild(content);

        blogPostDiv.appendChild(contentDiv);
        blogPostDiv.appendChild(actionDiv);

        blogListContainer.appendChild(blogPostDiv);
    });
}

// Increment the view count when a post is clicked
function incrementViewCount(postId) {
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = posts.find(p => p.id === postId);

    if (post) {
        post.views = (post.views || 0) + 1; // Increment view count
        localStorage.setItem('blogPosts', JSON.stringify(posts)); // Save updated posts
    }
}

// Function to edit a blog post
function editPost(postId) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = posts.find(p => p.id === postId);

    if (post) {
        localStorage.setItem('editPost', JSON.stringify(post)); // Store post in localStorage for editing
        window.location.href = 'edit_blog.html'; // Redirect to the edit page
    }
}

// Function to delete a blog post
function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts = posts.filter(post => post.id !== postId); // Filter out the post to delete

    localStorage.setItem('blogPosts', JSON.stringify(posts));
    displayBlogs(); // Re-render the blog list after deletion
}

// Call the displayBlogs function to display the posts when the page loads
window.onload = displayBlogs;
