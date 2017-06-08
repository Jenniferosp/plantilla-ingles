var JPIT_ACTIVITY_GUESSING_NAMESPACE = 'jpit.activities.guessing';

/**
 * Namespace jpit.activities.guessing
 *
 * This namespace contain all related to guessing activity
 */
jpit.activities.guessing = jpit.activities.registerType(JPIT_ACTIVITY_GUESSING_NAMESPACE);


/**
 * Namespace jpit.activities.guessing.instances
 *
 * This array store all guessing instances
 */
jpit.activities.guessing.instances = [];

/**
 * Class globals
 * Namespace jpit.activities.guessing
 *
 * This class persists globally some variables used in the activity
 */
jpit.activities.guessing.globals = {
    "actualGuessing" : 0,
    "uniqueIdAnswer" : 0
};

jpit.activities.guessing.toString = function(){    
    return JPIT_ACTIVITY_GUESSING_NAMESPACE;
}; 

jpit.activities.guessing.inputypes = {
    "mono" : 0,
    "multi" : 1
};

/**
 * Class utility
 * Namespace jpit.activities.guessing
 *
 * This class contain some utility methods to encapsulate logic
 */
jpit.activities.guessing.utility = {};

jpit.activities.guessing.utility.randOrder = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Class game
 * Namespace jpit.activities.guessing
 *
 * This class have control to the questions list
 */
jpit.activities.guessing.activity = function (container) {
    var $container;

    if (typeof container == 'object') {
        $container = container;
    }
    else {
        $container = $(container);
    }

    var obj = {
        "id" : 0,
        "container" : $container,
        "getLocalId" : function () {
            return "jpit_activities_guessing_" + this.id;
        },
        "corrects" : 0,
        "wrongs" : 0,
        "limitCorrects" : 0,
        "limitWrongs" : 0,

        "enable" : function(){
            obj.container.find('.board-objects-to-guess .cover').removeClass(classEnable);
        },

        "disable" : function(classDisable){
            obj.container.find('.board-objects-to-guess .cover').addClass(classDisable);
        },

        "restart" : function(){
            obj.container.find(".board-objects-to-guess").attr('disabled', false).val(1);
        },

        "weight" : function () {
            var calculatedWeight = this.isEndedCorrect() ? 100 : (this.corrects * 100 / this.limitCorrects);
            return calculatedWeight;
        },
        
        "isEnded" : function () {
            if(this.corrects >= this.limitCorrects || this.wrongs >= this.limitWrongs){
                return true;
            }
            
            return false;
        },

        "isEndedCorrect" : function () {
            
            if(this.corrects >= this.limitCorrects){
                return true;
            }
            else if(this.wrongs >= this.limitWrongs){
                return false;
            }
            
            return false;
        },

        "highlight" : function (option_guessing, correct, classCorrect, classWrong) {
            var $option_guessing;
            
            if (typeof option_guessing == 'object') {
                $option_guessing = option_guessing;
            }
            else {
                $option_guessing = $(option_guessing);
            }
            
            if(correct){
                setTimeout(function() {
                    $option_guessing.removeClass(classCorrect);
                }, 1000);
            }
            else {
                setTimeout(function() {
                    $option_guessing.removeClass(classWrong);
                }, 1000);
            }
        }
    };
    
    return obj;

};
