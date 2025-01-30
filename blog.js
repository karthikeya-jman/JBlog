document.addEventListener('DOMContentLoaded', function() {

    function displayBlogs() {
        let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const blogListContainer = document.getElementById('blogList');
        blogListContainer.innerHTML = '';  
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
                incrementViewCount(post.id);
    
                window.location.href = `post.html?id=${post.id}`;
            });
    
            const title = document.createElement('h2');
            title.textContent = post.title;
            title.classList.add('text-xl', 'font-bold', 'text-gray-800');
    
            const content = document.createElement('p');
            content.textContent = post.content;
            content.classList.add('text-gray-700', 'line-clamp-2');
    
            if (post.imgUrl) {
                const img = document.createElement('img');
                img.src = post.imgUrl;
                img.alt = "Blog Image";
                img.classList.add('w-100', 'rounded-md', 'object-cover');
                blogPostDiv.appendChild(img);
            }
    
            const actionDiv = document.createElement('div');
            actionDiv.classList.add('flex','flex-col', 'gap-5','items-start','justify-between', 'items-center', 'mt-3');
    
            const views = document.createElement('span');
            views.textContent = `Views: ${post.views || 0}`;
            views.classList.add('text-sm', 'text-gray-500');
    
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('text-blue-600', 'hover:text-blue-800');
            editButton.addEventListener('click', (e) => {
                e.stopPropagation(); 
                console.log()
                editPost(post.id); 
            });
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('text-red-600', 'hover:text-red-800');
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); 
                deletePost(post.id); 
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
    // Create post element
    function createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post', 'border', 'p-4', 'mb-4', 'bg-white', 'rounded-md', 'cursor-pointer');
        
        postDiv.addEventListener('click', () => {
            window.location.href = `post.html?id=${post.id}`;
        });

        const title = document.createElement('h2');
        title.textContent = post.title;
        title.classList.add('text-xl', 'font-bold', 'text-gray-800');

        const content = document.createElement('p');
        content.textContent = post.content;
        content.classList.add('text-gray-700', 'line-clamp-2');

        const img = post.imgUrl ? createPostImage(post.imgUrl) : null;
        const actionDiv = createPostActions(post);

        postDiv.appendChild(title);
        postDiv.appendChild(content);
        if (img) postDiv.appendChild(img);
        postDiv.appendChild(actionDiv);

        return postDiv;
    }

    // Create image element for a post
    function createPostImage(imgUrl) {
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = "Blog Image";
        img.classList.add('w-full', 'rounded-md', 'object-cover');
        return img;
    }

    // Create actions for each post (views, edit, delete)
    function createPostActions(post) {
        const actionDiv = document.createElement('div');
        actionDiv.classList.add('flex', 'flex-col', 'gap-2', 'items-start');

        const views = document.createElement('span');
        views.textContent = `Views: ${post.views || 0}`;
        views.classList.add('text-sm', 'text-gray-500');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('text-blue-600', 'hover:text-blue-800');
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            editPost(post.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('text-red-600', 'hover:text-red-800');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deletePost(post.id);
        });

        actionDiv.appendChild(views);
        actionDiv.appendChild(editButton);
        actionDiv.appendChild(deleteButton);

        return actionDiv;
    }

    // Handle post click to increment view count
    function incrementViewCount(postId) {
        let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.views = (post.views || 0) + 1;
            localStorage.setItem('blogPosts', JSON.stringify(posts));
        }
    }

    // Edit post
    function editPost(postId) {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const post = posts.find(p => p.id === postId);
        if (post) {
            localStorage.setItem('editPost', JSON.stringify(post));
            window.location.href = 'edit_blog.html';
        }
    }

    // Delete post
    function deletePost(postId) {
        let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        posts = posts.filter(post => post.id !== postId);
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        displayBlogs();
    }

    // Handle form submission to create new post
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
            date: new Date().toLocaleString(),
        };

        posts.push(newPost);
        localStorage.setItem('blogPosts', JSON.stringify(posts));

        document.getElementById('createBlogForm').reset();
        window.location.href = 'index.html';
    }

    // Load post details on the post detail page
    function displayPostDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        const post = getPostById(postId);

        const postDetailContainer = document.getElementById('content');
        if (post) {
            const title = document.createElement('h1');
            title.textContent = post.title;
            title.classList.add('text-3xl', 'font-bold', 'text-gray-800', 'mb-4');

            const content = document.createElement('p');
            content.textContent = post.content;
            content.classList.add('text-gray-700');

            if (post.imgUrl) {
                const img = createPostImage(post.imgUrl);
                postDetailContainer.appendChild(img);
            }

            postDetailContainer.appendChild(title);
            postDetailContainer.appendChild(content);
        } else {
            postDetailContainer.innerHTML = "<p>Post not found.</p>";
        }
    }

    // Get post by ID
    function getPostById(postId) {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        return posts.find(post => post.id === parseInt(postId));
    }

    // Initialize the correct page based on the URL
    if (document.location.pathname.includes('index.html')) {
        displayBlogs();
    } else if (document.location.pathname.includes('post.html')) {
        displayPostDetail();
    }

    // Form submission for creating a new blog post
    const createBlogForm = document.getElementById('createBlogForm');
    if (createBlogForm) {
        createBlogForm.addEventListener('submit', createBlogPost);
    }

});
