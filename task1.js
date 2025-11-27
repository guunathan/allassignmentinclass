function loadUser(uid) {
    return Promise.resolve({ id: uid });
}

function loadPosts(userName) {
    return Promise.resolve("Post");
}

async function collectUserInfo(uid) {
    const account = await loadUser(uid);
    const articleList = await loadPosts(account.username);
    return {
        user: account,
        posts: articleList
    };
}

collectUserInfo(123)
    .then(result => console.log(result));