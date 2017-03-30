/**
 * Created by MLE3657 on 30/03/2017.
 */
addPicture(config.key, image, person, group)
    .then(
        function (json) {
            trainModel(config.key, group, (err, json) => {
                if (err) return node.error(err);
                data.irma.info = "OK";
                return node.send(data);
            });
        },
        function(err){
            return node.error(err);
            data.irma.info = "Error : Bad informations";
        }
    );

const addPicture = (apiKey, image, person, group) => {
    var newUrl = "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + group + "/persons/" + person.persId + "/persistedFaces?targetFace=" +
        person.faceRectangle.left + "," + person.faceRectangle.top + "," + person.faceRectangle.width + "," + person.faceRectangle.height;
    let req = {
        url: newUrl,
        method: 'POST',
        body: image,
        headers: {
            'Content-type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': apiKey
        }
    }

    let cb = (err, response, body) => {
        if (err) return callback(err);

        let json = JSON.parse(body);
        callback(undefined, json);
    };


    return new Promise(function(resolve, reject) {
        request(req, cb);
    });
};
