$.processJSON = function( data ) {
    // title
    $( "#post-container" ).append( '<div class="sixteen columns"><h1>'+data.Title+'</h1><h5>'+data.Subtitle+'</h5><hr/></div>' );

    // blog posts
    var postId = $.urlParam( "id" );
    if( postId < 0 ) {
        // iterate over the posts and put them in the table
        $.each( data.posts, function( i, e ) {
            $( "#overview" ).prepend( '<tr><td><a href="index.html?id='+i+'#disqus_thread" data-disqus-identifier="'+i+'">'+e.Title+'</a></td><td>'+e.Date+'</td></tr>' );
        });   
    } else {

        $.each( data.posts, function( i, e ) {
            // show post x that is called with 'index.html?id=x'
            if( postId == i ) {
                // if we found a post, hide the overview container
                $( "#overview-container" ).hide();

                // add meta stuff 
                $( "head" ).append( '<meta name="author" content="'+e.Author+'">' );
                $( "head" ).append( '<meta name="date" content="'+e.Date+'">' );
                $( "head" ).append( '<meta name="keywords" content="'+e.Tags+'">' );

                // the content
                $( "#post-container" ).append( '<div class="sixteen columns"><h3>'+e.Title+'</h3><h4>'+e.Date+' by '+e.Author+'</h4><p>'+e.Content+'</p></div>' );

                // back button
                $( "#post-container" ).append( '<div class="sixteen columns"><p><a href="index.html">Back</a></p></div>');

                // load disqus
                $( "#disqus" ).append( '<div class="sixteen columns"><div id="disqus_thread"></div><script type="text/javascript">var disqus_shortname = "varyo"; disqus_identifier = "'+postId+'";(function() {var dsq = document.createElement("script"); dsq.type = "text/javascript"; dsq.async = true;dsq.src = "//" + disqus_shortname + ".disqus.com/embed.js";(document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(dsq);})();</script></div>' );
            }
        });

    }
}

$.urlParam = function( name ) {
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    if( !results ) return -1;
    return results[1];
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
