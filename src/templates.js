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
      'You can find the link to update your password below. If you did not request ' +
      'this email, feel free to ignore it.<br><br>' +
      '<a href="<%= env.SITE_URL %>password/update?token=<%= context.token %>">Update the password</a>',
      {
        variable: 'context',
        imports: {
          env: process.env
        }
      }
    ),
    subject: 'Password update',
  },
  emailConfirmedUpdateRequest: {
    text: _.template(
      'Hello <%= context.username %>,<br>' +
      'Please follow the link below to confirm your email address.<br><br>' +
      '<a href="<%= env.SITE_URL %>email/confirm?token=<%= context.token %>">Confirm your email</a>',
      {
        variable: 'context',
        imports: {
          env: process.env
        }
      }
    ),
    subject: 'Confirm your email',
  }
}
