const express = require('express');
const router = express.Router();
const request = require('request');

//  client search route
router.get('/clientSearch', (req, res) => {

    res.render('clients/clientSearch');
});

//  client search results route
router.get('/clientSearchResults', (req, res) => {

    //  Getting email and phone querys
    const email = req.query.email;
    const phone = req.query.phone;

    //  Authentication settings
    const username = 'global/cloud@apiexamples.com';
    const password = 'VMlRo/eh+Xd8M~l';
    const options = {

    url: `http://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/client?email=${email}&phone=${phone}`,
    auth: {

        user: username,
        password: password
        }
    };

    //  GET request function for Phorest API
    request(options, (err, response, body) => {

        if(err) {

            console.log(err);
        }

        else {

            //  JSON client data
            const data = JSON.parse(body);

            //  client results page 
            res.render('clients/clientSearchResults', {client: data._embedded.clients});
        }
    });
});

router.post('/clientSearch', (req, res) => {

    const email = req.body.email;
    const phone = req.body.phone;

    //  Redirect to clients result page and pass email and phone inputs
    res.redirect(`/clients/clientSearchResults?email=${email}&phone=${phone}`);
});

module.exports = router;