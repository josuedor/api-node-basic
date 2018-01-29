const Model = require("./model");

exports.findById = (req, res, next, id) => {
    Model.findById(id)
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

exports.total = (req, res, next) => {
    Model.count({enable: true},(err, count) => {
        if(err){next(new Error(err));}
        req.total = count;
        next();
    });
};

/**
 * @api {get} /users Request all users.
 * @apiDescription Shows all documents in json format
 * @apiName All
 * @apiGroup Users
 *
 *
 * @apiSuccess {String} _id         unique ID of the users.
 * @apiSuccess {String} firstname   Firstname of the users.
 * @apiSuccess {String} lastname    Lastname of the users.
 * @apiSuccess {String} email       Email of the users.
 * @apiSuccess {Boolean} enable     Is enable or disable.
 * @apiSuccess {String} createdAt   Created date of the users.
 * @apiSuccess {String} updateAt    Last update date of the users.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      [{
 *           "enable": true,
 *           "_id": "5a6e84b3bfdaf21d078719d8",
 *           "firstname": "Test firstname",
 *           "lastname": "Test lastname",
 *           "email": "test@gmail.com",
 *           "createdAt": "2018-01-29T02:19:31.834Z",
 *           "updatedAt": "2018-01-29T02:19:31.834Z",
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
        .limit(limit);
    
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
 * @api {post} /user Create a new user.
 * @apiDescription Create a new user, parameters must be sent in json format.
 * @apiName Create
 * @apiGroup Users
 *
 * 
 * @apiParam {String} firstname   Firstname of the users.
 * @apiParam {String} lastname    Lastname of the users.
 * @apiParam {String} email       Email of the users.
 * @apiParam {Boolean} enable     Is enable or disable. default true (optional) 
 * 
 * 
 * @apiSuccess {String} _id         unique ID of the users.
 * @apiSuccess {String} firstname   Firstname of the users.
 * @apiSuccess {String} lastname    Lastname of the users.
 * @apiSuccess {String} email       Email of the users.
 * @apiSuccess {Boolean} enable     Is enable or disable.
 * @apiSuccess {String} createdAt   Created date of the users.
 * @apiSuccess {String} updateAt    Last update date of the users.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "enable": true,
 *           "_id": "5a6e84b3bfdaf21d078719d8",
 *           "firstname": "Test firstname",
 *           "lastname": "Test lastname",
 *           "email": "test@gmail.com",
 *           "createdAt": "2018-01-29T02:19:31.834Z",
 *           "updatedAt": "2018-01-29T02:19:31.834Z",
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
 * @api {get} /users/:id Request user information.
 * @apiName Get
 * @apiGroup Users
 *
 * @apiParam {String} id user unique ID.
 *
 * @apiSuccess {String} _id         unique ID of the users.
 * @apiSuccess {String} firstname   Firstname of the users.
 * @apiSuccess {String} lastname    Lastname of the users.
 * @apiSuccess {String} email       Email of the users.
 * @apiSuccess {Boolean} enable     Is enable or disable.
 * @apiSuccess {String} createdAt   Created date of the users.
 * @apiSuccess {String} updateAt    Last update date of the users.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "enable": true,
 *           "_id": "5a6e84b3bfdaf21d078719d8",
 *           "firstname": "Test firstname",
 *           "lastname": "Test lastname",
 *           "email": "test@gmail.com",
 *           "createdAt": "2018-01-29T02:19:31.834Z",
 *           "updatedAt": "2018-01-29T02:19:31.834Z",
 *           "__v": 0
 *       }
 *
 * @apiError Document Not Found the id of the user was not found.
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
 * @api {put} /users/:id Update user information.
 * @apiDescription Update a user, parameters must be sent in json format, except the :id parameter.
 * @apiName Update
 * @apiGroup Users
 *
 * @apiParam {String} id user unique ID.
 * 
 * @apiParam {String} firstname   Firstname of the users.
 * @apiParam {String} lastname    Lastname of the users.
 * @apiParam {String} email       Email of the users.
 *
 * @apiSuccess {String} _id         unique ID of the users.
 * @apiSuccess {String} firstname   Firstname of the users.
 * @apiSuccess {String} lastname    Lastname of the users.
 * @apiSuccess {String} email       Email of the users.
 * @apiSuccess {Boolean} enable     Is enable or disable.
 * @apiSuccess {String} createdAt   Created date of the users.
 * @apiSuccess {String} updateAt    Last update date of the users.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "enable": true,
 *           "_id": "5a6e84b3bfdaf21d078719d8",
 *           "firstname": "Test firstname",
 *           "lastname": "Test lastname",
 *           "email": "test@gmail.com",
 *           "createdAt": "2018-01-29T02:19:31.834Z",
 *           "updatedAt": "2018-01-29T02:19:31.834Z",
 *           "__v": 0
 *       }
 *
 * @apiError Document Not Found the id of the user was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Document Not Found"
 *     }
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
 * @api {put} /users/:id/enable Enable or disable user.
 * @apiDescription Enable or disable user, parameters must be sent in json format, except the :id parameter.
 * @apiName Update
 * @apiGroup Users
 *
 * @apiParam {String} id user unique ID.
 * 
 * @apiParam {String} value   true for enable or false for disable.
 *
 * @apiSuccess {String} _id         unique ID of the users.
 * @apiSuccess {String} firstname   Firstname of the users.
 * @apiSuccess {String} lastname    Lastname of the users.
 * @apiSuccess {String} email       Email of the users.
 * @apiSuccess {Boolean} enable     Is enable or disable.
 * @apiSuccess {String} createdAt   Created date of the users.
 * @apiSuccess {String} updateAt    Last update date of the users.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "enable": true,
 *           "_id": "5a6e84b3bfdaf21d078719d8",
 *           "firstname": "Test firstname",
 *           "lastname": "Test lastname",
 *           "email": "test@gmail.com",
 *           "createdAt": "2018-01-29T02:19:31.834Z",
 *           "updatedAt": "2018-01-29T02:19:31.834Z",
 *           "__v": 0
 *       }
 *
 * @apiError Document Not Found the id of the user was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Document Not Found"
 *     }
 */
exports.enable = (req, res, next) => {
    
    const value = req.body.value;
    
    Model.findByIdAndUpdate(req.params.id, { enable: value }, {new: true}, function(err, doc){
        if (err) return next(new Error(err));
        res.json(doc);
    });
};