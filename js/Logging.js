/*
 * NASA Worldview
 * 
 * This code was originally developed at NASA/Goddard Space Flight Center for
 * the Earth Science Data and Information System (ESDIS) project. 
 *
 * Copyright (C) 2013 United States Government as represented by the 
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 */

/**
 * Namespace: Logging
 * Simple logging utility.
 * 
 * For basic logging
 * (begin code)
 * var log = Logger.getLogger()
 * log.message("This is a message");
 * (end code)
 * 
 * For debugging messages that can be turned on and off
 * (begin code)
 * var log = Logger.getLogger()
 * log.debug("This is not printed");
 * Logging.debug()
 * log.debug("This is printed");
 * (end code)
 * 
 * Assign names to loggers to turn debug logging on or off for certain loggers.
 * (begin code)
 * var logA = Logger.getLogger("A");
 * var logB = Logger.getLogger("B");
 * Logging.debug("B");
 * logA.debug("This is not printed");
 * logB.debug("This is printed");
 * (end code)
 * 
 * There is no hierarchy of loggers as in log4j. Turning on debug logging
 * for a given name only enables loggers that exactly match that name.
 * 
 * This delgates to the corresponding console methods if available, otherwise
 * it delgates to console.log. If console is not defined, nothing is
 * printed out.
 */
(function(ns) {
    
    var debugging = {};
    var debuggingAll = false;

    /**
     * Function: debug
     * Enables debug logging.
     * 
     * Parameters:
     * namespace - If specified, this enables debug logging for all <Loggers> 
     * with the given namespace. If not specified, this enables debug logging
     * for all <Loggers>.
     */
    ns.debug = function(namespace) {
        if ( namespace === undefined ) {
            debuggingAll = true;
        }
        debugging[namespace] = true;
    };
    
    /**
     * Function: undebug
     * Disables debug logging.
     * 
     * Parameters:
     * namespace - If specified, this disables logging for all <Loggers>
     * with the given namespace. If not specified, this disables debug logging
     * for all <Loggers> except for those explicitly enabled.
     */
    ns.undebug = function(namespace) {
        if ( namespace === undefined ) {
            debuggingAll = false;
        } else {
            if ( namespace in debugging ) {
                delete debugging[namespace];
            }
        }
    };    
       
    /**
     * Class: Logging.Logger
     * Sample logger
     * 
     * Constructor: Logger
     * Creates a new instance.
     * 
     * Parameters:
     * namespace - The name given to this logger.
     */    
    ns.Logger = function(namespace) {

        var self = {};
        
        /**
         * Method: message
         * Prints an error message to the console. Uses console.log or does
         * nothing if console does not exist.
         * 
         * Parameters:
         * message - The message to print to the console.
         */
        self.message = function(message) {
            if ( console ) {
                console.log(message);
            }
        };
                
        /**
         * Method: error
         * Prints an error message to the console. Uses console.error if
         * it exists, otherwise uses console.log. Does nothing if console
         * does not exist.
         * 
         * Parameters:
         * message - The message to print to the console.
         */
        self.error = function(message) {
            if ( console ) {
                if ( console.error ) {
                    console.error(message);
                } else {
                    console.log(message);
                }
            }
        };

        /**
         * Method: warn
         * Prints an warning message to the console. Uses console.warn if
         * it exists, otherwise uses console.log. Does nothing if console
         * does not exist.
         * 
         * Parameters:
         * message - The message to print to the console.
         */
        self.warn = function(message) {
            if ( console ) {
                if ( console.warn ) {
                    console.warn(message);
                } else {
                    console.log(message);
                }
            }
        };
        
        /**
         * Method: info
         * Prints an information message to the console. Uses console.info if
         * it exists, otherwise uses console.log. Does nothing if console
         * does not exist.
         * 
         * Parameters:
         * message - The message to print to the console.
         */
        self.info = function(message) {
            if ( console ) {
                if ( console.info ) {
                    console.info(message);
                } else {
                    console.log(message);
                }
            }
        };
        
        /**
         * Method: trace
         * Prints a stack trace to the console. If console.trace does not
         * exist, this method does nothing.
         */
        self.trace = function() {
            if ( console && console.trace ) {
                console.trace();
            }
        };
        
        /**
         * Method: debug
         * Prints a debug message to the console if debugging is enabled.
         * Debugging can be enabled by calling Logging.debug with the namespace
         * of this logger, or by calling Logging.debug with no parameters.
         * If the console object does not exist, this method does nothin.
         * 
         * Parameters:
         * message - The message to print to the console.
         */
        self.debug = function(message) {
            if ( debuggingAll ) {
                self.message(message);
            } else if ( namespace !== undefined && namespace in debugging ) {
                self.message(message);
            }
        }
       
        return self;       
    };
                
}(window.Logging = window.Logging || {}));
