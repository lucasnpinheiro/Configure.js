[![Build Status](https://travis-ci.org/ankr/Configure.js.png)](https://travis-ci.org/ankr/Configure.js)

Configure.js
============

Javascript object that behaves somewhat similar to CakePHPs `Configure` class, in terms of the `read` and `write` methods.
- http://book.cakephp.org/2.0/en/development/configuration.html#configure-class
- https://github.com/cakephp/cakephp/blob/master/lib/Cake/Core/Configure.php

I use it for storing global configuration - that does not pollute global scope - in an easy accessible way.

API
---
*A `path` is a string of dot-separated words describing the path to a value in the internal data object.*

### Configure.read([path])
Will return the value of a given path from the internal data object.

| Name | Type   | Default       | Optional | Description               |
|------|--------|---------------|----------|---------------------------|
| path | String | undefined     | YES      | Dot separated string path |

#### Return values
- Will return what ever data that is at the end of `path`.
- If `path` does not exists `undefined` is returned.
- If no `path` is provided a reference to the root data object is returned.

### Configure.write(path, data)
Will assign `data` at the end of `path`. If path does not exists it will be created on the fly as literal objects (`{}`).

| Name | Type   | Default | Optional | Description               |
|------|--------|---------|----------|---------------------------|
| path | String | N/A     | NO       | Dot separated string path |
| data | Mixed  | N/A     | NO       | Any value                 |

#### Return values
`Configure.write` always returns `true`.


### Configure.reset([data])
Reset the interal data object. Optionally set it to a given data object.

| Name | Type  | Default       | Optional | Description               |
|------|-------|---------------|----------|---------------------------|
| data | Mixed | undefined     | YES      | Dot separated string path |

#### Return values
`Configure.reset` always returns `undefined`.

Examples
--------
```javascript
// Initial setup
Configure.reset({
	foo : {
		bar : {
			baz : 'Hello world'
		}
	}
});

// Read a value
Configure.read('foo.bar.baz'); // 'Hello world'

// Edit the value
Configure.write('foo.bar.baz', 'Squirrel');

// Read it again
Configure.read('foo.bar.baz'); // 'Squirrel'
```


Configure.js + PHP
----------------

Sometimes you want to send some information from PHP to JS and do not necessarily want to do an ajax request just for that. One way to do that is to create a data array in PHP and simply pass that to JS in your view using `json_encode`.

```php
<?php
$data = [
	'foo' => [
		'bar' => [
			'baz' => 'Hello world'
		]
	]
];

<script>
Configure.reset(<?= json_encode($data); ?>);
</script>
```

And then you can get to that information from JS
```javascript
Configure.read('foo.bar.baz'); // Hello world
```
