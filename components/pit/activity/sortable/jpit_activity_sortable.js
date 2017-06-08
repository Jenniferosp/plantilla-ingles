var JPIT_ACTIVITY_SORTABLE_NAMESPACE = 'jpit.activities.sortable';

/**
 * Namespace jpit.activities.sortable
 *
 * This namespace contain all related to sortable activity
 */
jpit.activities.sortable = jpit.activities.registerType(JPIT_ACTIVITY_SORTABLE_NAMESPACE);


/**
 * Namespace jpit.activities.sortable.instances
 *
 * This array store all sortable instances
 */
jpit.activities.sortable.instances = [];

/**
 * Class globals
 * Namespace jpit.activities.sortable
 *
 * This class persists globally some variables used in the activity
 */
jpit.activities.sortable.globals = {
    "actualSortable" : 0
};

jpit.activities.sortable.toString = function(){    
    return JPIT_ACTIVITY_SORTABLE_NAMESPACE;
}; 

/**
 * Class utility
 * Namespace jpit.activities.sortable
 *
 * This class contain some utility methods to encapsulate logic
 */
jpit.activities.sortable.utility = {};

jpit.activities.sortable.utility.randOrder = function(){
    return (Math.round(Math.random())-0.5);
};

/**
 * Class game
 * Namespace jpit.activities.sortable
 *
 */
jpit.activities.sortable.activity = function (container) {

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
        "list_items" : [],
        "getLocalId" : function () {
            return "jpit_activities_sortable_" + this.id;
        },

        "processBoard" : function () {
            $container.addClass('jpit_activities_sortable_board').attr('id', this.getLocalId() + '_board');
            
            $container.find('ul.sortable').each(function(){
                var $list_item = $(this);

                $list_item.find('[data-position]').each(function() {
                    var $item = $(this);
                    
                    $item.addClass('sortable-item');
                    
                    var $icon;
                    if ($list_item.hasClass('sortable-horizontal')) {
                        $icon = $('<span class="icon-sortable ui-icon ui-icon-arrowthick-2-e-w"></span>');
                    }
                    else {
                        $icon = $('<span class="icon-sortable ui-icon ui-icon-arrowthick-2-n-s"></span>');
                    }

                    $item.prepend($icon);
                });

                $list_item.sortable({containment: $list_item, opacity: 0.5});
                obj.list_items[obj.list_items] = $list_item;

            });
        },

        "disable" : function(){
            $.each(obj.list_items, function() {
                $(this).sortable( "option", "disabled", true );
            });
        },

        "enable" : function(){
            $.each(obj.list_items, function() {
                $(this).sortable( "option", "disabled", false );
            });
        },

        "weight" : function () {
            var corrects = 0;
            var lists = this.container.find('[data-position]').length;
            var i = 0;
            this.container.find('[data-position]').each(function() {
                var $this = $(this);
                if ($this.attr('data-position') == i) {
                    corrects++;
                }
                i++;
            });

            return corrects * 100 / lists;
        },

        "highlight" : function (classCorrect, classWrong) {
            var corrects = 0;
            var lists = this.container.find('[data-position]').length;
            var i = 0;
            this.container.find('[data-position]').each(function() {
                var $this = $(this);
                if ($this.attr('data-position') == i) {
                    $this.addClass(classCorrect);
                }
                else {
                    $this.addClass(classWrong);
                }
                i++;
            });
        }
    };

    jpit.activities.sortable.globals.actualSortable++;
    obj.id = jpit.activities.sortable.globals.actualSortable;

    obj.processBoard();    
    jpit.activities.sortable.instances.push(obj);
    
    return obj;

};
