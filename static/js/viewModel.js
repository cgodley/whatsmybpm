ko.bindingHandlers.heartProgress = {
    init: function(element, valueAccessor) {
        $(element).addClass("heartProgress");
        for (var i = 0; i < 4; i++)
           $("<span>").appendTo(element);
    },
    
    update: function(element, valueAccessor) {
        var observable = valueAccessor();
        $("span", element).each(function(index) {
            $(this).toggleClass("fullHeart", index < observable());
        });
    }
};

function BpmViewModel() {
    
    TAB_NAMES = ['Measure', 'History'];
    
    // Data
    var self = this;
    self.tabs = TAB_NAMES;
    self.chosenTabId = ko.observable(TAB_NAMES[0]);

    // Behaviours    
    self.goToTab = function(tab) { self.chosenTabId(tab) };
    self.fullHeartCount = ko.observable(0);
    self.historyItems = ko.observableArray([]);
    
    self.removeHistoryItem = function(item) {
        self.historyItems.remove(item);
        saveHistory();
    };
};

var model = new BpmViewModel();
ko.applyBindings(model);

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function loadHistory() {
    var history = [];
    if(supports_html5_storage()) {
        if(localStorage.historyData) {
            history = JSON.parse(localStorage.historyData);
        }
    }
    model.historyItems.removeAll();
    ko.utils.arrayPushAll(model.historyItems(), history);
    model.historyItems.valueHasMutated();
}
        
function saveHistory() {
    if(supports_html5_storage()) {
        localStorage.historyData = ko.toJSON(model.historyItems);
    }
}