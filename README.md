# BLACKLUX.
> Modern luxury shopping production ready site. 

***

### Technology Stack
#### FRONTEND
* NEXT.js (React Framework)
* Styled Components (For styling w/ pure CSS)
* Framer Motion (For animation)
* React Hot Toast (For notification pop ups)
* URQL (For fetching data)

### BACKEND
* GraphQL (For API)
* Stripe (For payment system)
* Auth0 (For authentication)
* Cloudinary (For image optimization)
* Strapi (For handling products / Headless CMS)

***

### Instruction to run the program
1. Make sure lastest version of NODE is installed on your machine (v.16 or higher) https://nodejs.org/en/download/
2. Do ```$ npm install``` on both: frontend & backend folder.
3. Now, register at Cloudinary https://cloudinary.com/ and get the: username, key and secret credential.
4. For backend, you don't have to clone it. Under root of blacklux folder, install strapi using.
```npx create-strapi-app@latest backend```
5. Go to .env and add the following variables:
```CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```
6. On **config > plugin.js** in backend, add the plugin cloudinary. The final version looks like this:
```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  // ...
});
```
7. Install cloudinary package: ```$ npm install @strapi/provider-upload-cloudinary```
8. Run the backend: ```$ npm run develop```. It leads you to strapi admin on http://localhost:1337/ where you need to register an account for strapi.
9. Once you're logged in, on http://localhost:1337/ go to content type builder and build the following keys.
![strapi admin content builder](https://i.imgur.com/7avHo28.png)
10. Now, start adding products.
11. Once you're done, you can run the GraphQl Server at: http://localhost:1337/graphql
```js
query {
  products {
    data {
      attributes {
        title 
        description
        price
        slug 
        image {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
```

![graphql server of blacklux](https://i.imgur.com/RNj17yg.png)
12. Now, go to the frontend folder where we're going to configure environment variables.
13. Register Stripe and Auth0 and once you're done, on ```.env.local ``` on root of frontend, add the following variables:
```
NEXT_PUBLIC_BACKEND_API='http://localhost:1337/graphql'
BASE_URL='http://localhost:3000'
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=''
NEXT_PUBLIC_STRIPE_SECRET_KEY=''
AUTH0_CLIENT_SECRET=''
AUTH0_CLIENT_ID=''
AUTH0_ISSUER_BASE_URL=''
AUTH0_SECRET=''
AUTH0_BASE_URL='http://localhost:3000'
```
14. Make sure the credentials are done correctly. 
15. Now, we need to connect Auth0 to Stripe, so whenever user registers an account in our site with Auth0, them are registered on Stripe concurrently so that later, we can display their orders history.
16. In order to do that, go to Auth0 and create an application called BLACKLUX.
![auth0 application blacklux](https://i.imgur.com/0xNESDD.png)
17. Set the blacklux application's callback url to: http://localhost:3000/api/auth/callback
18. ![auth0 api callback](https://i.imgur.com/hdu4N8F.png)
19. Now, go to: **Auth Pipeline > rule** and create a new rule called Auth0toStripe which contains:
```js
function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  
  if ('stripe_customer_id' in user.app_metadata) {
    context.idToken['http://localhost:3000/stripe_customer_id'] = user.app_metadata.stripe_customer_id;
    return callback(null, user, context);
  }
  
  // pass stripe secret code in the params
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
```
20. Make sure to pass, Stripe Secret code in the params.
21. Run frontend: ```$ npm run dev` 
http://localhost:1337/

API can be retrieved at: 
![blacklux api](https://i.imgur.com/J7FGIOo.png)

***

### BLACKLUX SCREENSHOT

![blacklux running next.js and strapi in terminal](https://i.imgur.com/qph9RDW.png)

![blacklux home page](https://i.imgur.com/VBmVq39.png)

![blacklux home page scroll down](https://i.imgur.com/9MRMCEN.png)

![blacklux login page auth0](https://i.imgur.com/scKnKQD.png)

![blacklux user logged in home page](https://i.imgur.com/wVMOKrd.png)

![blacklux user profile page](https://i.imgur.com/OhONo6I.png)

![blacklux product info page](https://i.imgur.com/geXzSeO.png)

![blacklux notification when product is added to cart](https://i.imgur.com/nZM4ZE5.png)

![blacklux multiple products added to cart](https://i.imgur.com/J7lzLU1.png)

![blacklux products on cart](https://i.imgur.com/Z7MTj7Y.png)

![blacklux products on cart scrollable](https://i.imgur.com/63LMUUD.png)

![blacklux checkout page stripe](https://i.imgur.com/G6DSNPo.png)

![blacklux checkout page stripe test code](https://i.imgur.com/iHeoRAw.png)

![blacklux thank you page after checkout](https://i.imgur.com/V3V89gt.png)

![blacklux thank you page after checkout](https://i.imgur.com/V7WPwHh.png)

![blacklux thank you page after checkout cat xd](https://i.imgur.com/YSpkoeT.png)

![blacklux strapi admin to manage products](https://i.imgur.com/ZtCDwO2.png)
