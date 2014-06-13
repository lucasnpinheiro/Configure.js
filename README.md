[![Build Status](https://travis-ci.org/ankr/Configure.js.png)](https://travis-ci.org/ankr/Configure.js)

Configure.js
============

Javascript object that behaves somewhat similar to CakePHPs `Configure` class, in terms of the `read` and `write` methods.
- http://book.cakephp.org/2.0/en/development/configuration.html#configure-class
- https://github.com/cakephp/cakephp/blob/master/lib/Cake/Core/Configure.php

I use it for storing global configuration - that does not pollute global scope - in an easy accessible way.

See `testsSpec.js` for examples.

Configure.js + PHP / CakePHP
----------------

Sometimes you want to send some information from PHP to JS and do not necessarily want to do an ajax request just for that.

One way to do that is to create a data array in PHP and simply pass that to JS in your view using `json_encode`.

```php
<?php
$data = [
	'foo' => [
		'bar' => [
			'baz' => 123
		]
	]
];

<script>
Configure.reset(<?= json_encode($data); ?>);
</script>
```

And then you can get to that information from JS
```javascript
Configure.read('foo.bar.baz'); // 123
```
