Minimal Angular App
===================

This is a basic angular app using:

- ui.router
- ngResource
- angular-jwt

The front-end framework is `bootstrap#v4.0.0-alpha`.

It uses IIFE's to manage global variables.

Uses Lo-Dash template strings for the grunt [templates](https://lodash.com/docs#template).

## Generators

You can use `grunt -h` to see a list of available tasks:

To start a new app run:

```bash
grunt start --name=chooseName
```

There are additional options.

One you have done this, you can generate anyone of these:

### controller

```bash
grunt g:controller --name=main
```

This will create a controller javascript file and a view directory.

### factory

```bash
grunt g:factory --name=factory_name
```

### service

```bash
grunt g:service --name=service_name
```

### constant

```bash
grunt g:constant --name=test --key=API --value=http://localhost:3000 --type=string
grunt g:constant --name=twitter --key=TWITTER --value=process.env.TWITTER_CLIENT_ID
```

### directive

```bash
grunt g:directive --name=directive_name
```

This will create both a javascript file and a corresponding view file found in `app/views/directives`.
