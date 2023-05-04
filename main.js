const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const elePostsContainer = document.querySelector(".posts-list");

renderPosts(posts);


// FUNCTIONS

function renderPosts(arrayPostsData) {
    arrayPostsData.forEach(post => {
        // FILL HTML CONTAINER 'posts-list', COLLECTING DATA FROM ARRAY 'posts'
        elePostsContainer.innerHTML += renderPost(
            post.id, post.content, post.media, post.author.name, post.author.image, post.likes, post.created
        );
        //  ADD EVENT LISTENERS ON LIKE BUTTONS
        const btnsLike = document.querySelectorAll(".like-button");
        btnsLike.forEach(btn => {
            btn.addEventListener("click", function (event) {
                event.preventDefault();
                btn.classList.toggle("like-button--liked");
                const postId = btn.getAttribute("data-postid");
                const eleLikeCount = document.getElementById(`like-counter-${postId}`);
                // USE TERNARY OPARATOR TO INCREASE OR DECREASE LIKE COUNT
                btn.classList.contains("like-button--liked") ?
                    eleLikeCount.innerText = updateLikes(eleLikeCount.innerText, true) :
                    eleLikeCount.innerText = updateLikes(eleLikeCount.innerText, false);
                // UPDATE OBJECT VALUE 'LIKES'
                arrayPostsData.forEach(post => {
                    if (post.id === parseInt(postId)) {
                        post.likes = parseInt(eleLikeCount.innerText);
                    }
                });
            });
        });
    });
}

function renderPost(numId, content, media, authorName, authorImg, numLikes, dateCreated) {
    return `<div class="post">
                <div class="post__header">
                    <div class="post-meta">                    
                        <div class="post-meta__icon">
                            ${authorImgCheck(authorName, authorImg)}                    
                        </div>
                        <div class="post-meta__data">
                            <div class="post-meta__author">${authorName}</div>
                            <div class="post-meta__time">${getTimePassed(dateCreated)}</div>
                        </div>                    
                    </div>
                </div>
                <div class="post__text">${content}</div>
                <div class="post__image">
                    <img src="${media}" alt="">
                </div>
                <div class="post__footer">
                    <div class="likes js-likes">
                        <div class="likes__cta">
                            <a class="like-button  js-like-button" href="#" data-postid="${numId}">
                                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                <span class="like-button__label">Mi Piace</span>
                            </a>
                        </div>
                        <div class="likes__counter">
                            Piace a <b id="like-counter-${numId}" class="js-likes-counter">${numLikes}</b> persone
                        </div>
                    </div> 
                </div>            
            </div>`
}

function authorImgCheck(name, img) {
    const initials = `<div class="profile-initials">${name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')}</div>`;
    const image = `<img class="profile-pic" src="${img}" alt="${name}">`;
    return img === null ? initials : image;
}

function getTimePassed(postCreated) {
    const timeDiff = Math.floor((new Date() - new Date(postCreated)) / 1000);
    if (timeDiff < 60) return `${timeDiff} seconds ago`;
    if (timeDiff < 3600) return `${Math.floor(timeDiff / 60)} minutes ago`;
    if (timeDiff < 86400) return `${Math.floor(timeDiff / 3600)} hours ago`;
    return `${Math.floor(timeDiff / 86400)} days ago`;
}

function updateLikes(strLikesNow, boolIncrease) {
    return boolIncrease ? parseInt(strLikesNow) + 1 : parseInt(strLikesNow) - 1;
}
