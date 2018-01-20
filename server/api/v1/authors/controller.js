
const Model = require('./model');

exports.findById = (req, res, next, id) => {
    Model.findById(id)
        .then( doc => {
            if (doc) {
                req.doc = doc;
                next();
            } else {
                 res.json({
                     message: "Document not found"
                 })
            }
            
        })
        .catch( err => {
            next(new Error(err))
        });
};

exports.all = (req, res, next) => {
    Model.
        find()
        .populate('author')
        .then( docs => {
            res.json(docs)
        })
        .catch( err => {
            next(new Error(err))
        });
};

exports.create = (req, res, next) => {
    const body = req.body;
    
    let document = new Model(body);
    document.save()
        .then( doc => {
            res.json(doc)
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.get = (req, res, next) => {
    res.json(req.doc);
};

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

exports.disable = (req, res, next) => {
   
   Model.findByIdAndUpdate(req.params.id, { disable: true }, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        res.json(doc);
    });
};