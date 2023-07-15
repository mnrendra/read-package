# @mnrendra/read-package
Read (obtain) the `package.json` file from any directory within a NodeJS module and parse it into a JSON.

## Install
```bash
npm i @mnrendra/read-package
```

## Usage

Using `CommonJS`:
```javascript
const { readPackage, readPackageSync } = require('@mnrendra/read-package')

// Asynchronously
readPackage().then(({ name, version }) => {
  console.log('asynchronously:', name, version)
})

// Synchronously
const { name, version } = readPackageSync()
console.log('synchronously:', name, version)
```

Using `ES Module`:
```javascript
import { readPackage, readPackageSync } from '@mnrendra/read-package'

// Asynchronously
readPackage().then(({ name, version }) => {
  console.log('asynchronously:', name, version)
})

// Synchronously
const { name, version } = readPackageSync()
console.log('synchronously:', name, version)
```

### Examples

#### 1. Read the `package.json` file in your development project:
Assuming your project's `~/project-name/package.json` file is as follows:
```json
{
  "name": "project-name",
  "version": "1.0.0"
}
```

Then, you can access and read the `~/project-name/package.json` file from any directory within your project.<br/>
Here are some examples:<br/>

##### • Read from `~/project-name/src/index.js`:
```javascript
const { readPackage } = require('@mnrendra/read-package')

// Synchronously
const { name, version } = readPackageSync()
console.log('synchronously:', name, version) // Output: synchronously: project-name 1.0.0
```

##### • Read from `~/project-name/src/any-directory/index.mjs`:
```javascript
import { readPackageSync } from '@mnrendra/read-package'

// Asynchronously
readPackage().then(({ name, version }) => {
  console.log('asynchronously:', name, version) // Output: asynchronously: project-name 1.0.0
})
```

#### 2. Read the `package.json` file in your published module:
Assuming your module is installed in the `/consumer/node_modules/module-name/` directory and the `package.json` file for your module located at `/consumer/node_modules/module-name/package.json` is as follows:
```json
{
  "name": "module-name",
  "version": "1.0.0"
}
```

Then, you can access and read your `package.json` file from any directory within your module.<br/>
Here are some examples:<br/>

##### • Read from `/consumer/node_modules/module-name/dist/index.js`:
```javascript
"use strict";
const { readPackage } = require('@mnrendra/read-package');

// Synchronously
const { name, version } = readPackageSync();
console.log('synchronously:', name, version); // Output: synchronously: module-name 1.0.0
```

##### • Read from `/consumer/node_modules/module-name/dist/any-directory/index.js`:
```javascript
"use strict";
const { readPackage } = require('@mnrendra/read-package');

// Asynchronously
readPackage().then(({ name, version }) => {
  console.log('asynchronously:', name, version); // Output: asynchronously: module-name 1.0.0
});
```

# Types
```typescript
import type {
  Package // @mnrendra/types-package
} from '@mnrendra/read-package'
```

## License
[MIT](https://github.com/mnrendra/read-packag/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
