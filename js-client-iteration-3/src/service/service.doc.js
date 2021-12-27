
import "../domain.doc.js"

/**
 * @callback onEventsReadyCallback
 * @param    {Event[]} events - array of events
 * @return   {undefined} void
 */


/**
 * Common interface for all services (abstract factory pattern)
 *
 * @typedef {{loadEvents: (function(onEventsReadyCallback): undefined)}} VakansieService
 * */
