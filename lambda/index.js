var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
    var buf = new Buffer(event.body.replace(/^data:image\/\w+;base64,/, ""),'base64');
    
    var params = {
        Image: {
            Bytes: buf
        },
        Attributes: [
            "ALL"
        ]
    };
    
    new AWS.Rekognition().detectFaces(params, function(err, data) {
       if (err) callback(err);
       else callback(null, data);
    });
};