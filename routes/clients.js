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

            //  Check if any clients are returned
            if(data.page.size > 0) {

                //  client results page 
                res.render('clients/clientSearchResults', {client: data._embedded.clients});
            }

            else {

                req.flash('error_msg', 'Client does not exist');
                res.redirect('/clients/clientSearch');
            }
        }
    });
});

//  Add voucher route
router.get('/addVoucher', (req, res) => {

    const clientId = req.query.clientId;
    const amount = req.query.amount;
    const name = req.query.name;

    //  Authentication settings
    const username = 'global/cloud@apiexamples.com';
    const password = 'VMlRo/eh+Xd8M~l';

    request.post('https://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/voucher', {

        auth: {

            user: username,
            password: password
        },

        //  JSON payload for voucher
        json: {

            clientId: clientId,
            creatingBranchId: "SE-J0emUgQnya14mOGdQSw",
            expiryDate: "2019-10-05T16:05:58.806Z",
            issueDate: "2019-10-05T16:05:58.806Z",
            originalBalance: 133.15
        }
    }, (err, response, body) => {

        if (err) {

            console.log(err);
        }

        else {

            //  Check if voucher was successfully added
            if(response.statusCode === 201) {

                req.flash('success_msg', `€${amount} voucher successfully added to client: ${name}`);
                res.redirect('/clients/clientSearch');
            }

            else {

                req.flash('error_msg', `Unable to add voucher for client: ${name}`);
                res.redirect('/clients/clientSearch');
            }
        }
    });
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
    const name = req.body.name;

    res.redirect(`/clients/addVoucher?clientId=${clientId}&amount=${amount}&name=${name}`);
});

module.exports = router;