'use strict';

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  res.json({
          "_links": {
              "test:get-sales-journey": {
                  "href": "$host/stubs/orca/journey/{journey_id}",
                  "templated": true
              },
              "orca:create-basket": {
                  "href": "$host/stubs/orca/create-basket",
                  "templated": false
              },
              "orca:get-something": {
                  "href": "$host/stubs/orca/get-something",
                  "templated": false
              },
              "orca:find-account": {
                  "href": "$host/stubs/orca/find_account?party_id={party_id}",
                  "templated": true
              },
              "self": {
                  "href": "$host/orca/"
              }
          }
      }
  );
};