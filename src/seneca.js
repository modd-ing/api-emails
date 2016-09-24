'use strict';

const seneca = require( 'seneca' )();

seneca
  .use( 'seneca-amqp-transport' )
  .use( './seneca-plugins/api-emails' );

seneca.ready( function( err ) {

  if ( err ) {

    process.exit( 1 );

    return;

  }

  seneca
    .listen({
      pin: 'role:api,path:emails',
      type: 'amqp',
      url: 'amqp://rabbitmq-api'
    });

});

module.exports = function() {

  return seneca;

};
