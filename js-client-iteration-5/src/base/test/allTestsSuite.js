// importing all tests that make up the suite of tests that are build on the ES6 module system

/////////////////////////////////
// base code
/////////////////////////////////
import '../utils/strings.test.js'
import '../utils/dom.test.js'
import '../utils/dates.test.js'
import '../utils/appends.test.js';
import '../utils/rock.test.js'

import '../observable/observable.test.js'
import '../service/translation.service.test.js'
import '../router/router.test.js'
import '../menu/menu.test.js'


/////////////////////////////////
// not base code
/////////////////////////////////

import '../../event/event.test.js'
import '../../service/json.service.test.js'
