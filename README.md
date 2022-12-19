# Angular OpenID Connect with Auth0 Example

This example shows you how to integrate OpenID Connect authentication with Angular and Auth0.

Please read [Add OpenID Connect to Angular Apps Quickly][blog] to see how this app was created.

**Prerequisites:**

- [Node.js 14+](https://nodejs.org/)
- An [Auth0 Account](https://auth0.com/signup)

> [Auth0](https://auth0.com) is an easy to implement, adaptable authentication and authorization platform. Basically, we make your login box awesome.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example, clone it.

```
git clone https://github.com/oktadev/auth0-angular-example.git
cd auth0-angular-example
```

### Create an OIDC App on Auth0

To add authentication with Auth0, you'll first need a [free Auth0 account](https://auth0.com/signup). Install the [Auth0 CLI](https://github.com/auth0/auth0-cli#installation) and run `auth0 login` to register your account. Then, run `auth0 apps create`. Specify a name and description of your choosing. Choose **Single Page Web Application** and use `http://localhost:4200/home` for the Callback URL. Specify `http://localhost:4200` for the rest of the URLs.

You can also use the Auth0 Console:

* [Log in](https://auth0.com/auth/login) to Auth0 or [create an account](https://auth0.com/signup) if you don't have one. Go to **Applications** > **Create Application**.
* Choose **Single Page Web Applications** as the application type and click **Create**.
* Click **Angular**, then the **Settings** tab.
* Add `http://localhost:4200/home` as an Allowed Callback URL and `http://localhost:4200` as a Logout URL.
* Specify `http://localhost:4200` as an Allowed Origin and click **Save Changes** at the bottom.

Modify `src/app/auth-routing.module.ts` to add your Auth0 OIDC settings:

```ts
const config = {
  domain: 'YOUR-AUTH0-DOMAIN',
  clientId: 'YOUR-AUTH0-CLIENT-ID',
  redirectUri: window.location.origin + '/home',
  httpInterceptor: {
    allowedList: ['/api/*']
  },
};
```

Run `ng serve` in your app, and you should see a login button at `http://localhost:4200/home`.

## Links

This example uses the following open source libraries:

* [Angular](https://angular.io)
* [Auth0 Angular SDK](https://github.com/auth0/auth0-angular)
* [OktaDev Schematics](https://github.com/oktadev/schematics)

## Help

Please post any questions as comments on the [blog post][blog].

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: https://auth0.com/blog/add-oidc-to-angular-apps-quickly/
