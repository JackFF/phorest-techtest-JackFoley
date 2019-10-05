const express = require('express');
const router = express.Router();
const request = require('request');

//  client search route
router.get('/clientSearch', (req, res) => {

    res.render('clients/clientSearch');
});

//  Client search results route
router.get('/clientSearchResults', (req, res) => {

    //  Getting email and phone querys
    const email = req.query.email;
    const phone = req.query.phone;

    //  Authentication settings
    const username = 'global/cloud@apiexamples.com';
    const password = 'VMlRo/eh+Xd8M~l';
    const options = {

    //?email=${email}&phone=${phone}

    url: `http://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/client`,
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

//  Add voucher route
router.get('/addVoucher', (req, res) => {

    const clientId = req.query.clientId;
    const amount = req.query.amount;

    console.log('Amount: ' + amount);

    //  Authentication settings
    const username = 'global/cloud@apiexamples.com';
    const password = 'VMlRo/eh+Xd8M~l';

    request.post('https://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/voucher', {

        auth: {

            user: username,
            password: password
        },

        json: {

            clientId: clientId,
            creatingBranchId: "SE-J0emUgQnya14mOGdQSw",
            expiryDate: "2019-10-05T16:05:58.806Z",
            issueDate: "2019-10-05T16:05:58.806Z",
            originalBalance: 133.15
        }
    }, (err, res, body) => {

        if (err) {

            console.log(err);
        }

        else {

            console.log('Res1: ' + res);
            console.log('Body1: ' + body);

            console.log('Res2: ' + JSON.stringify(res));
            console.log('Body2: ' + JSON.stringify(body));
        }
    });

    res.render('clients/clientSearch');
});

//  Client search POST
router.post('/clientSearch', (req, res) => {

    const email = req.body.email;
    const phone = req.body.phone;

    //  Redirect to clients result page and pass email and phone inputs
    res.redirect(`/clients/clientSearchResults?email=${email}&phone=${phone}`);
});

//  Client search POST to add voucher
router.post('/clientSearchResults', (req, res) => {

    const clientId = req.body.clientId;
    const amount = req.body.amount;

    res.redirect(`/clients/addVoucher?clientId=${clientId}&amount=${amount}`);
});

module.exports = router;