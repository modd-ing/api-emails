'use strict';

const Promise = require( 'bluebird' );
const _ = require( 'lodash' );
const email = require( 'emailjs' );
const emailTemplates = require( '../templates' );

module.exports = function () {

  // Promisify the seneca .act() method
  const act = Promise.promisify( this.act, { context: this });

  this.add( 'role:api,path:emails,cmd:sendEmail', function( msg, done ) {

    const messageParameters = msg.message || {};

    const server = email.server.connect({
      user: process.env.SMTP_USER,
      password: process.env.SMTP_PASS,
      port: process.env.SMTP_PORT,
      host: process.env.SMTP_HOST
    });

    const message = {
      text: messageParameters.text,
      from: messageParameters.from || 'Modding <antesepic@gmail.com>',
      to: messageParameters.to,
      cc: messageParameters.cc,
      bcc: messageParameters.bcc,
      subject: messageParameters.subject,
      'content-type': messageParameters['content-type'] || 'text/html; charset=utf-8'
    };

    if ( msg.template ) {

      let template = emailTemplates( msg.template, msg.context );

      if ( false !== template ) {

        message.text = template.text;
        message.subject = template.subject;

      }

    }

    if ( ! message.text ) {

      const err = new Error( 'Message text can not be empty.' );

      done( err, null );

      return;

    }

    server.send( message, ( err, message ) => {

      if ( err ) {

        done( err, null );

        return;

      }

      done( null, {});

    });

  });

  return {
    name: 'api-emails'
  };

};
