# Derby-Starter2

- Server module for Derby 0.6 apps
- Written in Javascript
- Express middlware and routes are configurable
- Coffeescript is supported
- Influenced by [derby-starter](https://github.com/derbyjs/derby-starter)

## Known Issues
- `favicon.ico` file at public folder is required
- MONGO_URL, PORT, SESSION_SECRET environment variables are required
- Redis is not included

### Installation
```javascript
npm install derby-starter2
```

### Setting
#### Step 1. Require
```javascript
var derbyStarter = require('derby-starter2');
```
#### Step 2. Derby app
```javascript
var app = require('./app');
```
#### Step 3. Options
```javascript
var options = {
  middleware: function(expressApp, store) {
    // express middleware
    express.use(myMiddleware);
  },
  setup: function(store, app, expressApp, derby) {
    // express routes
    expressApp.get('/', myRouteHandler);
    // store init
    myStoreInit(store);
    // etc
  }
}
```
#### Step 4. Start
```javascript
derbyStarter(app, options);
```

## The MIT License

Copyright (c) 2014 Vladimir Makhaev

Permission is hereby granted, free of charge,
to any person obtaining a copy of this software and
associated documentation files (the "Software"), to
deal in the Software without restriction, including
without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom
the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice
shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
