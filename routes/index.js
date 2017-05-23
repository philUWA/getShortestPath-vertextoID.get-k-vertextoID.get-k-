var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
const notifier = require('node-notifier');

/* GET home page. 
*/
router.get('/', function(req, res) {
    res.render('index', {});
});

/* If the users city is not entered then to not proceed to the following page
   and and display an error message.
*/
router.post('/register', function(req, res) {
    if (req.body.city == null) {
        res.render('index', {});
        notifier.notify('Please tell us what city you live in.');
    }
    console.log(req.body);

/* If the password has been entered then accumulate all the data from this page
   and the previous page.
*/
    var finishedRegistration = ('password' in req.body);

    if (finishedRegistration) {
        Account.register(
            new Account({
                username: req.body.username,
                genderMe: req.body.genderMe,
                genderYou: req.body.genderYou,
                country: req.body.country,
                city: req.body.city,
                postcode: req.body.postcode,
                email: req.body.email,

                heightMe: req.body.heightMe,
                ethnicityMe: req.body.ethnicityMe,
                childrenMe: req.body.childrenMe,
                bodyMe: req.body.bodyMe,
                faithMe: req.body.faithMe,
                smokerMe: req.body.smokerMe,
                hairMe: req.body.hairMe,
                educationMe: req.body.educationMe,
                drinkerMe: req.body.drinkerMe,
                eyeMe: req.body.eyeMe,
                minAgeMe: req.body.minAgeMe,
                maxAgeMe: req.body.maxAgeMe,

                heightYou: req.body.heightYou,
                ethnicityYou: req.body.ethnicityYou,
                childrenYou: req.body.childrenYou,
                bodyYou: req.body.bodyYou,
                faithYou: req.body.faithYou,
                smokerYou: req.body.smokerYou,
                hairYou: req.body.hairYou,
                educationYou: req.body.educationYou,
                drinkerYou: req.body.drinkerYou,
                eyeYou: req.body.eyeYou,
                minAgeYou: req.body.minAgeYou,
                maxAgeYou: req.body.maxAgeYou,

                potentialMatches: req.body.potentialMatches
            }),
            req.body.password,
            function(err, account) {
                if (err) {
                    return res.render('register', account);            // Stay on the current page if an error occurred.
                }
                passport.authenticate('local')(req, res, function() {  // Authenticate user data and proceed to /matches.
                    res.redirect('/matches');
                });
            }
        );
    } 
/* If the password was not entered remember the data entered from the previous page 
   but remain on current page.
*/
    else {
        res.render('register', req.body);
        console.log('We only have the data from the first form');      
    }
});

/* Re-route to login page. 
*/
router.get('/login', function(req, res) {
    res.render('login', { user: req.user });
});

/* If login is successfull proceed to the corresponding user profile.
   Otherwise stay on login page.
 */
router.post('/login', passport.authenticate('local', { successRedirect: '/profile',
    failureRedirect:'/login' }));

/* Logout of current account and back to index page.
*/
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/* Filters potential matches based on specified contitions and then sorts them from most to least appropriate cantidate.
*/
router.get('/matches', function(req, res) {
    // Increments the page number (offset)/ 
    var nextPerson = req.query.offset ? parseInt(req.query.offset) : 0;

    // Finds each match by id while they are not in the users shortlist.
    Account.find({'_id' : { $nin : req.user.potentialMatches}}, function(err, accounts) {
        var filteredAccounts = accounts.filter(function(account) {

            // The match must satisfy these conditions before it can continue.
            return req.user.username != account.username &&
                   req.user.genderYou === account.genderMe && req.user.genderMe === account.genderYou &&
                   req.user.country === account.country &&
                   req.user.city === account.city;

            // Obtains count by looping through each account. 
            }).map(function(account) {
                var count = 0;

                // The following 11 lines accumulate a count that is tallied at the end.
                if (req.user.heightYou >= (account.heightMe - 10) && req.user.heightYou <= (account.heightMe + 10)) { count++; }
                if (req.user.ethnicityYou === account.ethnicityMe) { count++; }
                if (req.user.childrenYou === account.childrenMe) { count++; }
                if (req.user.bodyYou === account.bodyMe) { count++; }
                if (req.user.faithYou === account.faithMe) { count++; }
                if (req.user.smokerYou === account.smokerMe) { count++; }
                if (req.user.hairYou === account.hairMe) { count++; }
                if (req.user.drinkerYou === account.drinkerMe) { count++; }
                if (req.user.eyeYou === account.eyeMe) { count++; }
                if (req.user.minAgeYou >= account.minAgeMe) { count++; }
                if (req.user.maxAgeYou <= account.maxAgeMe) { count++; }

                // The following nine if statements make sure that each postcode entered conforms with its city.
                if (req.user.city === "melbourne" && (req.user.postcode < 3000 || req.user.postcode >= 4000)) { 
                    res.render('index', {});
                    notifier.notify('Invalid postcode for the city entered.');
                }
                if (req.user.city === "sydney" && (req.user.postcode < 2000 || req.user.postcode >= 3000)) { 
                    res.render('index', {});
                    notifier.notify('Invalid postcode for the city entered.');
                }
                if (req.user.city === "brisbane" && (req.user.postcode < 4000 || req.user.postcode >= 5000)) { 
                    res.render('index', {});
                    notifier.notify('Invalid postcode for the city entered.');
                }     
                if (req.user.city === "adelaide" && (req.user.postcode < 5000 || req.user.postcode >= 6000)) { 
                    res.render('index', {});
                    notifier.notify('Invalid postcode for the city entered.');
                }            
                if (req.user.city === "hobart" && (req.user.postcode < 7000 || req.user.postcode >= 8000)) { 
                    res.render('index', {});
                    notifier.notify('Invalid postcode for the city entered.');
                }            
                if (req.user.city === "perth" && (req.user.postcode < 6000 || req.user.postcode >= 7000)) { 
                    res.render('index', {});
                    notifier.notify('Invalid postcode for the city entered.');
                }            
                if (req.user.city === "auckland" && (req.user.postcode < 1000 || req.user.postcode >= 2000)) { 
                    res.render('index', {});
                    notifier.notify('Invalid postcode for the city entered.');
                }            
                if (req.user.city === "wellington" && (req.user.postcode < 2000 || req.user.postcode >= 3000)) { 
                    res.render('index', {});
                    notifier.notify('Invalid postcode for the city entered.');
                }
                if (req.user.city === "christchurch" && (req.user.postcode < 0 || req.user.postcode >= 1000)) { 
                    res.render('index', {});
                    notifier.notify('Invalid postcode for the city entered.');
                }

                return { account: account, count: count} 

            }).sort(function(a, b) {
            return b.count - a.count;               // Pushes accounts with lower counts to the end of the list.
        });

        console.log(filteredAccounts);
        // If there are no potential matches availble for you then re-direct to the profile page.
        if (filteredAccounts.length === 0) {
            res.redirect('/profile');
            notifier.notify('This is a new website and there are no matches yet available for you based on your requirements.');
            return;
        }

        // Makes sure that the list of potential matches is cyclic.
        if (nextPerson >= filteredAccounts.length) {
                nextPerson = 0;
            }

        // render /matches with all the info specified.
        var accountToReturn = filteredAccounts[nextPerson];
        res.render('matches', { user: req.user, nextMatch: accountToReturn.account, offset: nextPerson + 1, count: accountToReturn.count }, function(err, page) {
            if (err) {
                console.log(err);
            }

            res.end(page);
        });
    });
});

/* Find the the users shorlisted matches by id and renders the /delete page.
   The delete page differs from the matches page in the way that you now have the 
   option to delete matches that are in your shortlist.
*/
router.get('/match', function(req, res) {
    Account.findOne({_id: req.query.match}, function(err, account) {
        res.render('delete', { user: req.user, nextMatch: account})
        console.log(account);
        console.log(err);
    });

});

/* Find the the users shorlisted matches by id and renders the /matches page.
   Pushes the ids on to the users potential matches list.
   If user is browsing the matches page and comes across a match that is in their
   list then the user has the option to delete that match.
*/
router.post('/matches', function(req, res, next) {
    Account.findOne({ _id: req.body.match }, function(err, account) {
        req.user.potentialMatches.push(account._id);
        req.user.save();
        if (req.user.potentialMatches.indexOf(account._id) > -1) {
            res.render('delete', { user: req.user, nextMatch: account})            
        }
        else {
            res.redirect('/matches')
        }
    });
});

/* Pulls id from potential matches list and then that match becomes one of the object
   in the array of canditates again, one again with option to add them to their shorlist.
*/
router.post('/delete', function(req, res, next) {
    Account.findOne({ _id: req.body.match }, function(err, account) {
        req.user.potentialMatches.pull(account._id);
        req.user.save();
        res.redirect('/matches')
    });
});

/* Displays each match in the potential matches array on the users profile page.
*/
router.get('/profile', function(req, res) {
    Account.find({'_id' : { $in : req.user.potentialMatches}}, function(err, potentialMatches) { 
        potentialMatches.forEach(match => console.log(typeof match.username));
        res.render('profile', { user: req.user, potentialMatches : potentialMatches })
    });
});

/* Redirects to profile page.
*/
router.get('/profile', function(req, res, next) {
    res.redirect('/profile')
});

/* Renders the edit with all the users data.
*/
router.get('/edit', function(req, res) {
    console.log('User: ', req.user);
    res.render('edit', { user: req.user });
});

/* Renders the edit page's form with all the users data.
   Upon submition, redirects to /profile.
*/
router.post('/edit', function(req, res, next) {
    console.log('entering edit');
    Account.findOne({ _id: req.user._id }, function(err, account) {
        account.genderMe = req.body.genderMe
        account.genderYou = req.body.genderYou
        account.heightMe = req.body.heightMe;
        account.ethnicityMe = req.body.ethnicityMe;
        account.childrenMe = req.body.childrenMe;
        account.bodyMe = req.body.bodyMe;
        account.faithMe = req.body.faithMe;
        account.smokerMe = req.body.smokerMe;
        account.hairMe = req.body.hairMe;
        account.drinkerMe = req.body.drinkerMe;
        account.eyeMe = req.body.eyeMe;
        account.minAgeMe = req.body.minAgeMe;
        account.maxAgeMe = req.body.maxAgeMe;

        console.log(req.body.ethnicityMe);

        account.heightYou = req.body.heightYou;
        account.ethnicityYou = req.body.ethnicityYou;
        account.childrenYou = req.body.childrenYou;
        account.bodyYou = req.body.bodyYou;
        account.faithYou = req.body.faithYou;
        account.smokerYou = req.body.smokerYou;
        account.hairYou = req.body.hairYou;
        account.drinkerYou = req.body.drinkerYou;
        account.eyeYou = req.body.eyeYou;
        account.minAgeYou = req.body.minAgeYou;
        account.maxAgeYou = req.body.maxAgeYou;

        account.save();

        res.redirect('/profile');
    });
});

/* Renders /chat page.
*/
router.get('/chat', function(req, res) {
    res.render('chat', { user: req.user });
});

/* Redirects to chat page.
*/
router.get('/chat', function(req, res, next) {
    res.redirect('/chat')
});

/* Renders /forgotPassword page.
*/
router.get('/forgotPassword', function(req, res) {
    res.render('forgotPassword', {});
});

// /* Redirects to forgotPassword page.
// */
// router.get('/forgotPassword', function(req, res, next) {
//     res.redirect('/forgotPassword')
// });

/* Renders /architechure page.
*/
router.get('/architecture', function(req, res) {
    res.render('architecture', {});
});

/* Redirects to architecture page.
*/
router.get('/architecture', function(req, res, next) {
    res.redirect('/architecture')
});

/* Renders /references page.
*/
router.get('/references', function(req, res) {
    res.render('references', {});
});

/* Redirects to references page.
*/
router.get('/references', function(req, res, next) {
    res.redirect('/references')
});

/* Redirects to testing page.
*/
router.get('/testing', function(req, res) {
    res.render('testing', {});
});

/* Renders /testing page.
*/
router.get('/testing', function(req, res, next) {
    res.redirect('/testing')
});

module.exports = router;
