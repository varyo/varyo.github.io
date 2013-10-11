$.processJSON = function( data ) {
    // title
    $( "#post-container" ).append( '<div class="sixteen columns"><h1>'+data.Title+'</h1><h5>'+data.Subtitle+'</h5><hr/></div>' );

    // blog posts
    var postId = $.urlParam( "id" );
    $.each( data.posts, function( i, e ) {
        // show post x that is called with 'index.html?id=x'
        if( postId == i ) {
           // add meta stuff 
           $( "head" ).append( '<meta name="author" content="'+e.Author+'">' );
           $( "head" ).append( '<meta name="date" content="'+e.Date+'">' );
           $( "head" ).append( '<meta name="keywords" content="'+e.Tags+'">' );

           // the content
           $( "#post-container" ).append( '<div class="sixteen columns"><h3>'+e.Title+'</h3><h4>'+e.Date+' by '+e.Author+'</h4><p>'+e.Content+'</p></div>' );

           // load disqus
           $( "#disqus" ).append( '<div class="sixteen columns"><div id="disqus_thread"></div><script type="text/javascript">var disqus_shortname = "varyo"; // required: replace example with your forum shortnamevar disqus_identifier = "'+postId+'";(function() {var dsq = document.createElement("script"); dsq.type = "text/javascript"; dsq.async = true;dsq.src = "//" + disqus_shortname + ".disqus.com/embed.js";(document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(dsq);})();</script></div>' );
        }
    });
}

$.urlParam = function( name ) {
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    return results[1] || 0;
}

$( document ).ready(function() {    
    $.getJSON( "./blog/posts.json" )
        .done(function( json ) {
            // success
            $.processJSON( json );
        })
        .fail(function( jqxhr, textStatus, error ) {
            // fail
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
    });
});
