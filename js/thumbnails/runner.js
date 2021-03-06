var chai=require('chai')
var expect=chai.expect
var mocha=require('mocha')

describe('load',function(){  

    beforeEach(function(){
        browser.url('/thumbnails/test.html') 
          
    })

    it('api_url',function(){
        var examplar='/thumbnails/data/posts?page=1&per_page=10&exclude=' 
        var url=browser.execute(
            function(){
                return(window.thumbnails_test.api_url(1))
            }
        ).value
        expect(url)
            .to
            .equal(examplar)
    })

    it('load',function(){
        browser.execute(
            function(){
                window.thumbnails_test.load_new()  
            }
        )
        expect(browser.isExisting('.thumbnail-card'))
            .to
            .equal(true) 
    })
    it('sort',function(){
        browser.execute(
            function(){
                window.thumbnails_test.load_new()  
            })
        browser.execute(
            function(){
                window.thumbnails_test.sort()})
        var order=browser.execute(
            function(){ 
                var els=window.thumbnails_test.iso.getFilteredItemElements() 
                var order=jQuery.map(els,function(b,c){return(jQuery(b).attr('data-sort'))})
                return(order)
            }).value
        
        var largest=0
        var sorted=true
        for(i=0;i<order.length; i++){
            if(order[i]>= largest){
                largest=order[i]
            }else{
                sorted=false
            }
        }
        expect(sorted)
            .to
            .equal(true)
    })  
    after(function(){
        //console.log(browser.log('browser'))
    })
})
