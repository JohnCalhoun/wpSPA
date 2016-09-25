var progress={}

progress.start=function(id,selector,template){
    return(function(e,cached){
        var screen=jQuery(id)
        if( screen.length ==0 ){
            jQuery(selector)
                .append(template())
        }
        screen.show(0)
    })
}

progress.stop=function(id){
    return(function(){
        jQuery(id).hide(0)
    })
}

module.exports=progress

