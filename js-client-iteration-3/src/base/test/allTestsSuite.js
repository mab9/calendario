// importing all tests that make up the suite of tests that are build on the ES6 module system

/////////////////////////////////
// base code
/////////////////////////////////
import '../church/strings.test.js'
import '../church/dom.test.js'

import '../church/appends.test.js';

import '../church/church.test.js'
import '../church/rock.test.js'

import '../observable/observable.test.js'


import '../utils/dates.test.js'
import '../service/translation.service.test.js'


/////////////////////////////////
// not base code
/////////////////////////////////

import '../../event/event.test.js'
import '../../service/json.service.test.js'
