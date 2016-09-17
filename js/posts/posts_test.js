goog.require('goog.testing.ContinuationTestCase')
goog.require('goog.testing.jsunit')
goog.require('goog.testing.PropertyReplacer')
goog.require('goog.events.EventTarget')

goog.require('bh.render.posts')

if(typeof thumbnail_test_flag != 'undefined'){
var stubs;

var setUp=function(){
    stubs=new goog.testing.PropertyReplacer();
    stubs.replace(  bh.render.posts,
                    "api_url", 
                    function(page){
                        return("/src/test/json/post.json")
                    } 
                    )
}

var tearDown=function(){
    stubs.reset();
}
var testLoad=function(){
    var event_target=new goog.events.EventTarget();
    goog.events.listenOnce( event_target,
                            "check",
                            function(){})
    var triggered=false; 
    waitForEvent(
        event_target,
        "check",
        function(){           
            assertNotEquals("data should be inserted",0,$('.card').length)
        }
    );
    $(document).on("thumbnail_rendered",function(){
        triggered=true;
        event_target.dispatchEvent('check')
    });

    bh.render.posts.load(1)
}

var testCase=new goog.testing.ContinuationTestCase();
testCase.autoDiscoverTests();
G_testRunner.initialize(testCase);

}