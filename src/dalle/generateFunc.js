const send = require('../dalle/generate/send.js');

async function createPicture(userPrompt, promptQty) {
    const request = await send(userPrompt, promptQty);

    if(request.hasOwnProperty('data')){
        request.pictures = request.data.map(elem => {
            return new Buffer.from(elem.b64_json, "base64");
        });
    }
    return request
}

module.exports = createPicture;