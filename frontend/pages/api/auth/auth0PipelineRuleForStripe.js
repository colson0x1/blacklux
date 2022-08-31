function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  
  if ('stripe_customer_id' in user.app_metadata) {
    context.idToken['http://localhost:3000/stripe_customer_id'] = user.app_metadata.stripe_customer_id;
    return callback(null, user, context);
  }
  
  // pass stripe secret code in the second parenthesis
  const stripe = require('stripe')('');
  
  const customer = {
    email: user.email,
    description: user.name
  };

  stripe.customers.create(customer, function(err, customer) {
    if (err) {
        return callback(err);
    }

    user.app_metadata.stripe_customer_id = customer.id;

    auth0.users.updateAppMetadata(user.user_id, user.app_metadata).then(function() {
        context.idToken['http://localhost:3000/stripe_customer_id'] = user.app_metadata.stripe_customer_id;
        callback(null, user, context);
    }).catch(function(err) {
      callback(err);
    });
  });
  
}