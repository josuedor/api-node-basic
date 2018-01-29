const Model = require("./model");

exports.findById = (req, res, next, id) => {
    Model.findById(id)
        .populate("user")
        .then( doc => {
            if (doc) {
                req.doc = doc;
                next();
            } else {
                next(new Error("Document not found"));
            }
            
        })
        .catch( err => {
            next(new Error(err));
        });
};

/**
 * @api {get} /tweets Request all tweets.
 * @apiDescription Shows all documents in json format
 * @apiName All
 * @apiGroup Tweets
 *
 *
 * @apiSuccess {String} _id         unique ID of the Tweet.
 * @apiSuccess {String} content     Content.
 * @apiSuccess {Object} user        User of the tweet.
 * @apiSuccess {String} location    location.
 * @apiSuccess {String} createdAt   Created date of the Tweet.
 * @apiSuccess {String} updateAt    Last update date of the Tweet.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      [{
 *           "_id": "5a6e68be54647f0e410d8e78",
 *           "content": "Pizza de peperoniiiii!!!! ya",
 *           "user": {
 *               "enable": false,
 *               "_id": "5a651994c553170e6a85c581",
 *               "firstname": "C. S",
 *               "lastname": "Lewis",
 *               "email": "lc@gmail.com",
 *               "createdAt": "2018-01-21T22:52:04.795Z",
 *               "updatedAt": "2018-01-24T04:00:01.425Z",
 *               "__v": 0
 *           },
 *           "location": "Sincelejo",
 *           "createdAt": "2018-01-29T00:20:14.204Z",
 *           "updatedAt": "2018-01-29T00:20:14.204Z",
 *           "__v": 0
 *       }]
 *
 */
exports.all = (req, res, next) => {
    const limit = Number(req.query.limit) || 10;
    const skip = Number(req.query.skip) || 0;
    
    const items = Model
        .find()
        .skip(skip)
        .limit(limit)
        .populate("user")
        .sort( { createdAt: -1 } );
    
    const count = Model.count();
    
    Promise.all([items.exec(), count.exec()])
        .then( data => {
            res.json({
                data: data[0],
                limit,
                skip,
                count: data[1]
            });
        })
        .catch( err => {
            next(new Error(err));
        });
};

/**
 * @api {post} /tweets Create a new tweet.
 * @apiDescription Create a new tweet, parameters must be sent in json format.
 * @apiName Create
 * @apiGroup Tweets
 *
 * @apiParam {String} content     Content.
 * @apiParam {String} user        User of the tweet.
 * @apiParam {String} location    location.
 * 
 * @apiSuccess {String} _id         unique ID of the Tweet.
 * @apiSuccess {String} content     Content.
 * @apiSuccess {Object} user        User of the tweet.
 * @apiSuccess {String} location    location.
 * @apiSuccess {String} createdAt   Created date of the Tweet.
 * @apiSuccess {String} updateAt    Last update date of the Tweet.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "_id": "5a6e68be54647f0e410d8e78",
 *           "content": "Pizza de peperoniiiii!!!! ya",
 *           "user": {
 *               "enable": false,
 *               "_id": "5a651994c553170e6a85c581",
 *               "firstname": "C. S",
 *               "lastname": "Lewis",
 *               "email": "lc@gmail.com",
 *               "createdAt": "2018-01-21T22:52:04.795Z",
 *               "updatedAt": "2018-01-24T04:00:01.425Z",
 *               "__v": 0
 *           },
 *           "location": "Sincelejo",
 *           "createdAt": "2018-01-29T00:20:14.204Z",
 *           "updatedAt": "2018-01-29T00:20:14.204Z",
 *           "__v": 0
 *       }
 *
 */
exports.create = (req, res, next) => {
    const body = req.body;
    
    let document = new Model(body);
    document.save()
        .then( doc => {
            res.json(doc);
        })
        .catch( err => {
            next(new Error(err));
        });
};

/**
 * @api {get} /tweets/:id Request tweet information.
 * @apiName Get
 * @apiGroup Tweets
 *
 * @apiParam {String} id tweet unique ID.
 *
 * @apiSuccess {String} _id         unique ID of the Tweet.
 * @apiSuccess {String} content     Content.
 * @apiSuccess {Object} user        User of the tweet.
 * @apiSuccess {String} location    location.
 * @apiSuccess {String} createdAt   Created date of the Tweet.
 * @apiSuccess {String} updateAt    Last update date of the Tweet.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "_id": "5a6e68be54647f0e410d8e78",
 *           "content": "Pizza de peperoniiiii!!!! ya",
 *           "user": {
 *               "enable": false,
 *               "_id": "5a651994c553170e6a85c581",
 *               "firstname": "C. S",
 *               "lastname": "Lewis",
 *               "email": "lc@gmail.com",
 *               "createdAt": "2018-01-21T22:52:04.795Z",
 *               "updatedAt": "2018-01-24T04:00:01.425Z",
 *               "__v": 0
 *           },
 *           "location": "Sincelejo",
 *           "createdAt": "2018-01-29T00:20:14.204Z",
 *           "updatedAt": "2018-01-29T00:20:14.204Z",
 *           "__v": 0
 *       }
 *
 * @apiError Document Not Found the id of the Tweet was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Document Not Found"
 *     }
 */
exports.get = (req, res, next) => {
    res.json(req.doc);
};

/**
 * @api {put} /tweets/:id Update a tweet.
 * @apiDescription Update a tweet, parameters must be sent in json format, except the :id parameter.
 * @apiName Update
 * @apiGroup Tweets
 *
 * @apiParam {String} _id         unique ID of the Tweet.
 * 
 * @apiParam {String} content     Content.
 * @apiParam {String} user        User of the tweet.
 * @apiParam {String} location    location.
 * 
 * @apiSuccess {String} _id         unique ID of the Tweet.
 * @apiSuccess {String} content     Content.
 * @apiSuccess {Object} user        User of the tweet.
 * @apiSuccess {String} location    location.
 * @apiSuccess {String} createdAt   Created date of the Tweet.
 * @apiSuccess {String} updateAt    Last update date of the Tweet.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "_id": "5a6e68be54647f0e410d8e78",
 *           "content": "Pizza de peperoniiiii!!!! ya",
 *           "user": {
 *               "enable": false,
 *               "_id": "5a651994c553170e6a85c581",
 *               "firstname": "C. S",
 *               "lastname": "Lewis",
 *               "email": "lc@gmail.com",
 *               "createdAt": "2018-01-21T22:52:04.795Z",
 *               "updatedAt": "2018-01-24T04:00:01.425Z",
 *               "__v": 0
 *           },
 *           "location": "Sincelejo",
 *           "createdAt": "2018-01-29T00:20:14.204Z",
 *           "updatedAt": "2018-01-29T00:20:14.204Z",
 *           "__v": 0
 *       }
 *
 */
exports.update = (req, res, next) => {
    let document = Object.assign(req.doc, req.body);
    
    document.save()
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            next(new Error(err));
        });
};

/**
 * @api {delete} /tweets/:id Delete a tweet.
 * @apiName Delete
 * @apiGroup Tweets
 *
 * @apiParam {String} id tweet unique ID.
 *
 * @apiSuccess {String} _id         unique ID of the Tweet.
 * @apiSuccess {String} content     Content.
 * @apiSuccess {Object} user        User of the tweet.
 * @apiSuccess {String} location    location.
 * @apiSuccess {String} createdAt   Created date of the Tweet.
 * @apiSuccess {String} updateAt    Last update date of the Tweet.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "_id": "5a6e68be54647f0e410d8e78",
 *           "content": "Pizza de peperoniiiii!!!! ya",
 *           "user": {
 *               "enable": false,
 *               "_id": "5a651994c553170e6a85c581",
 *               "firstname": "C. S",
 *               "lastname": "Lewis",
 *               "email": "lc@gmail.com",
 *               "createdAt": "2018-01-21T22:52:04.795Z",
 *               "updatedAt": "2018-01-24T04:00:01.425Z",
 *               "__v": 0
 *           },
 *           "location": "Sincelejo",
 *           "createdAt": "2018-01-29T00:20:14.204Z",
 *           "updatedAt": "2018-01-29T00:20:14.204Z",
 *           "__v": 0
 *       }
 *
 * @apiError Document Not Found the id of the Tweet was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Document Not Found"
 *     }
 */
exports.delete = (req, res, next) => {
    const doc = req.doc;
    
    doc.remove()
        .then( deleted => {
            res.json(deleted);
        })
        .catch( err => {
            next(new Error(err));
        });
};