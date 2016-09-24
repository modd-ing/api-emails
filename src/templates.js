'use strict';

const _ = require( 'lodash' );

module.exports = function( templateName, context ) {

  if ( ! templateName in templates ) {

    return false;

  }

  return {
    text: templates[ templateName ].text( context ),
    subject: templates[ templateName ].subject
  };

}

const templates = {
  passwordUpdateRequest: {
    text: _.template(
      'Hello <%= context.username %>,<br>' +
      'You can find the link to reset your password below. If you did not request ' +
      'this email, feel free to ignore it.<br><br>' +
      '<a href="<%= env.SITE_URL %>recover"><%= env.SITE_URL %>recover</a>',
      {
        variable: 'context',
        imports: {
          env: process.env
        }
      }
    ),
    subject: 'Password reset',
  }
}
