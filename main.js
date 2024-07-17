const userinfo = document.querySelector(".userinfo")
const navbarmore = document.querySelector(".navbar-right-more")
const search = document.querySelector(".search")
const comments = document.querySelector(".comments")
const cargar = document.querySelector("body").onload = function () {
    const p1 = data()
};

function data() {
    fetch("./data.json")
        .then((res) => res.json())
        .then((data) => {
            userinfo.innerHTML = `
            <article>
                <img src="${data.currentUser.image.png}" alt="Hola">
            </article>          
            <div>
                <span>${data.currentUser.username}</span>
                <span>@${data.currentUser.username}</span>
            </div>
            <p>💥Penting gak Penting yang penting Posting💥</p>
            `
            navbarmore.innerHTML = `
            <img src="${data.currentUser.image.png}" alt="">
            <span>${data.currentUser.username}</span>
            <img src="./images/teclado-de-marcacion.png" alt="more">
            `
            search.innerHTML = `
            <article>
                <img src="${data.currentUser.image.png}" alt="user">
            </article>
            <input type="text" placeholder="What's happening?">
        `
            data.comments.forEach(element => {
                comments.innerHTML += `
                <div class="ContentComment ${element.user.username}">
                    <div class="commentsInt">
                        <div class="plus-minus">
                            <article>
                            <img src="./images/icon-plus.svg" alt="">
                            </article>
                        
                            <span>${element.score}</span>
                        
                            <article>
                            <img src="./images/icon-minus.svg" alt="">
                            </article>
                        </div>
                        
                        <div class="tweet">
                            <div class="commentUserinfo">
                                <div>
                                <article>
                                    <img src="${element.user.image.png}" alt="">
                                </article>
                                <span>${element.user.username}</span>
                                <span>${element.createdAt}</span>
                                </div>
                                <article class="Reply" onclick="replyComment('${element.user.username}','${data.currentUser.image.png}')">
                                <img src="./images/icon-reply.svg" alt="">
                                <span class="replySpan">Reply</span>
                                </article>
                            </div>
                            <div>
                                <p>
                                ${element.content}
                                </p>                                
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            `
                const commentsR = document.querySelector(`.${element.user.username}`)

                element.replies.map(reply => {
                    commentsR.innerHTML += `
                <div class="commentReplySection ${reply.user.username}">
                    <div class="commentReply">
                        <div class="plus-minus">
                            <article>
                            <img src="./images/icon-plus.svg" alt="">
                            </article>
                        
                            <span>${reply.score}</span>
                        
                            <article>
                            <img src="./images/icon-minus.svg" alt="">
                            </article>
                        </div>
                        
                        <div class="tweet">
                            <div class="commentUserinfo">
                                <div>
                                <article>
                                    <img src="${reply.user.image.png}" alt="">
                                </article>
                                <span>${reply.user.username}</span> 
                                <span>${reply.createdAt}</span>
                                </div>
                                <div class="reply-delete">
                                    <article class="Reply" onclick="replyComment('${reply.user.username}','${data.currentUser.image.png}')">
                                    <img src="./images/icon-reply.svg" alt="">
                                    <span class="replySpan">Reply</span>
                                    </article>

                                    <div class="delete inactive" onclick="DeleteAction('juliusomo')">
                                        <span>Delete</span>
                                        <img src="./images/icon-delete.svg">
                                    </div> 
                                </div>                            
                            </div>
                            <div>
                                <p>
                                ${reply.content}
                                </p>                                
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div></div>
                `
                })
            })
        })

}

function replyComment(data, img) {
    const commentContent = document.querySelector(`.${data}`)
    const replyInput = commentContent.lastElementChild
    replyInput.innerHTML = `
        <div class="inputReply">
            <article>
                <img src="${img}" alt="imagen${data}">
            </article>            
            <textarea rows="3" placeholder="Reply to ${data}" class="text${data}"></textarea>
            <button onclick="addComment('${data}')">REPLY</button>
        </div >
        `
    if (data === 'juliusomo') {
        replyInput.innerHTML = `
        <div class="inputReply">
            <article>
                <img src="${img}" alt="imagen${data}">
            </article>
            <textarea rows="3" placeholder="Edit your message" class="text${data}"></textarea>
            <button onclick="editComment('${data}')">EDIT</button>
        </div >
        `
    }
}

function DeleteAction(user) {
    const userdiv = document.querySelector(`.${user}`)
    userdiv.innerHTML += `
    <div class="deleteContainer">
        <div class="deleteSection">    
            <h3>Delete comment</h3>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
            <div>
                <button onclick="cancelButton()">NO,CANCEL</button>
                <button onclick="deleteButton()">YES,DELETE</button>
            </div> 
        </div>
    </div>
    `
}

function cancelButton() {
    const cancel = document.querySelector(".deleteContainer")
    cancel.remove()
}

function deleteButton() {
    const deleteContainer = document.querySelector(".deleteContainer")
    deleteContainer.parentElement.remove()
}

function addComment(tag) {
    const tagUser = document.querySelector(`.${tag}`)
    const inputUser = document.querySelector(`.text${tag}`)
    if (!inputUser.value == "") {
        fetch("./data.json")
            .then((res) => res.json())
            .then((data) => {
                tagUser.innerHTML += `
            <div class="commentReplySection ${data.currentUser.username}">
                <div class="commentReply">
                    <div class="plus-minus">
                        <article>
                        <img src="./images/icon-plus.svg" alt="">
                        </article>
                    
                        <span>2</span>
                    
                        <article>
                        <img src="./images/icon-minus.svg" alt="">
                        </article>
                    </div>
                    
                    <div class="tweet">
                        <div class="commentUserinfo">
                            <div>
                            <article>
                                <img src="${data.currentUser.image.png}" alt="">
                            </article>
                            <span>${data.currentUser.username}</span> 
                            <span class="you">you</span>
                            <span>now</span>
                            </div>
                            <div class="reply-delete">
                                <article class="Reply" onclick="replyComment('${data.currentUser.username}','${data.currentUser.image.png}')">
                                <img src="./images/icon-edit.svg" alt="">
                                <span class="replySpan">Edit</span>
                                </article>
                                
                                <div class="delete inactive" onclick="DeleteAction('juliusomo')">
                                    <span>Delete</span>
                                    <img src="./images/icon-delete.svg">
                                </div>
                            </div> 
                                                            
                        </div>
                        <div>
                            <p>
                            ${inputUser.value}
                            </p>                                
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            <div></div>
        `
            })
        inputUser.parentElement.remove()
    }
}

function editComment(tag) {
    const tagUser = document.querySelector(`.${tag}`)
    const inputUser = document.querySelector(`.text${tag}`)
    if (!inputUser.value == "") {
        fetch("./data.json")
            .then((res) => res.json())
            .then((data) => {
                tagUser.innerHTML = `
            <div class="commentReplySection ${data.currentUser.username}">
                <div class="commentReply">
                    <div class="plus-minus">
                        <article>
                        <img src="./images/icon-plus.svg" alt="">
                        </article>
                    
                        <span>2</span>
                    
                        <article>
                        <img src="./images/icon-minus.svg" alt="">
                        </article>
                    </div>
                    
                    <div class="tweet">
                        <div class="commentUserinfo">
                            <div>
                            <article>
                                <img src="${data.currentUser.image.png}" alt="">
                            </article>
                            <span>${data.currentUser.username}</span> 
                            <span class="you">you</span>
                            <span>now</span>
                            </div>
                            <div class="reply-delete">
                                <article class="Reply" onclick="replyComment('${data.currentUser.username}','${data.currentUser.image.png}')">
                                <img src="./images/icon-edit.svg" alt="">
                                <span class="replySpan">Edit</span>
                                </article>
                                
                                <div class="delete inactive" onclick="DeleteAction('juliusomo')">
                                    <span>Delete</span>
                                    <img src="./images/icon-delete.svg">
                                </div>
                            </div> 
                                                            
                        </div>
                        <div>
                            <p>
                            ${inputUser.value}
                            </p>                                
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            <div></div>
        `
            })
        inputUser.parentElement.remove()
    }
}