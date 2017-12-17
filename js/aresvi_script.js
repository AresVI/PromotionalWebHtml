(function() {

// Localize jQuery variable
    var jQuery;

    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type","text/javascript");
        script_tag.setAttribute("src",
            "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    scriptLoadHandler();
                }
            };
        } else { // Other browsers
            script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main();
    }

    /******** Our main function ********/
    function main() {
        jQuery(document).ready(function($) {
            const aresvi = $("#aresvi");
            const cuit = aresvi.attr("data-cuit");
            $.get("http://165.227.89.229:8080/api/search_result/" + cuit, function (data) {
                //console.log(data);
                var link_aresvi = $("<a href='http://165.227.89.229/certifications.html?company=" + cuit +"' target='_blank'></a>");
                $(link_aresvi).append("<span>" + data.category + "</span>");
                $(link_aresvi).append("<img src='http://165.227.89.229/images/Ares_logoBlanco.png'>");
                $(aresvi).append(link_aresvi);
            })

        });
    }

})(); // We call our anonymous function immediately