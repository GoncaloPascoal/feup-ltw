
let commentForm = document.querySelector('#comments > form');

commentForm.addEventListener('submit', submitComment);

function encodeForAjax(data) {
    return Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');
}

function submitComment(event) {
    let id = commentForm.querySelector('input[name="id"]').value;
    let username = commentForm.querySelector('input[name="username"]').value;
    let text = commentForm.querySelector('textarea[name="text"]').value;
    let commentId = document.querySelector('article.comment:last-of-type > span.id').textContent;

    let request = new XMLHttpRequest();
    request.addEventListener('load', receiveComments);
    request.open('post', 'api_add_comment.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({id: id, comment_id: commentId, username: username, text: text}));

    event.preventDefault();
}

function getDateStringFromTimestamp(timestamp) {
    let date = new Date(timestamp * 1000);

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + 
            date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); 
}

function receiveComments() {
    let comments = JSON.parse(this.responseText);

    let commentsSection = document.querySelector('#comments');

    for (let comment of comments) {
        let commentArticle = document.createElement('article');
        commentArticle.className = 'comment';

        let dateString = getDateStringFromTimestamp(comment['published']);

        commentArticle.innerHTML = '<span class="id">' + comment['id'] + '</span>' +
                '<span class="user">' + comment['name'] + '</span>' +
                '<span class="date">' + dateString + '</span>' +
                '<p>' + comment['text'] + '</p>';

        commentsSection.insertBefore(commentArticle, commentForm);
    }
}