const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
    
        let dev = await Dev.findOne({ github_username });
        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            let { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        
            dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
                })

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )
            
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
    
        return response.json(dev);
    },

    async update(request, response) {
        const _id = request.params.id;
        const { techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ _id }, (err, dev) => {
            if(!!!dev) 
                return response.status(500).send({ retorno: 'Registro não encontrado!' });
        });

        if(!!dev) {
            const techsArray = parseStringAsArray(techs);
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                };

                await Dev.updateOne(
                    {"_id": _id}, 
                    { $set:  {
                            techs: techsArray,
                            location
                        } 
                    }, 
                    function(err, ret) {
                        if(!!ret){
                            dev.techs = techsArray;
                            return response.json(dev);
                        }
                        return response.status(500).send({ error: err });
                    }
                );
        }
    },

    async delete(request, response) {
        const _id = request.params.id;

        let dev = await Dev.findOne({ _id }, (err, dev) => {
            if(!!!dev) 
                return response.status(500).send({ retorno: 'Registro não encontrado!' });
        });

        if(!!dev) {
            await Dev.deleteOne(
                {"_id": _id}, 
                { }, 
                function(err, ret) {
                    if(!!ret) {
                        return response.json({ retorno: 'Ok'});
                    }
                    return response.status(500).send({ error: err });
                }
            );
        }
    }
};