const connection = require('../database');


getAllPosts = async (req, res) => {

    try {
        const posts = await getAllPostsQuery();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }

};

getAllPostsQuery = () => {
    const query = 'SELECT * FROM post';
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
}


getSpecificPost = async (req, res, next) => {
    const postId = req.params.id;

    try {
        const user = await getSpecificUserQuery(postId);
        res.status(200).send(user[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificUserQuery = (postId) => {
    const query = 'SELECT * FROM post WHERE id = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [postId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

createPost = async (req, res, next) => {
    

    try {
        await createPostQuery(req.body.Text, req.body.Likes)
        res.status(201).send("Successfull Post");
    } catch (error) {
        res.status(500).send(error.message);
    }

    
}

createPostQuery = (postText, postLikes) => {
    const query = 'INSERT INTO post(Text, Likes, CreatedOn) VALUES(?,?,curdate())';
    return new Promise((resolve, reject) => {
        connection.query(query, [postText , postLikes], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });

}



module.exports = {
    getAllPosts,
    getSpecificPost,
    createPost
}