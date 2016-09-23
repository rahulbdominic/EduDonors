$(function(){

    Parse.initialize("hwicp64PU4dlUrTVLSksoFmEcg0S3WPjQ2thXwQk", "6Eqi0Zjxo4p6FYWDUM31akYmtR7XBiRkBhHE3EBp");
    
    var PostObject = Parse.Object.extend("Post");
    var postObject = new PostObject();
    
    function daydiff(date) {
        var today = new Date();
        var timeDiff = Math.abs(date.getTime() - today.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        return diffDays;
    }
    
    function addItem(results, cont, i, mode) {
        var d = new Date(2015, 07, 15);
        var container = document.getElementById(cont);
        var item = document.createElement("div");
        item.setAttribute("class", "grid_" + mode);
        item.innerHTML = '<a href="#" class="thumb-img"> <img src="'
            + results[i].attributes.img
            + '" alt="Title"></a>'
            + '<div class="project-short sml-thumb" style="border: 0;">'
            + '<div class="top-project-info">'
            + '<div class="content-info-short clearfix">'
            + '<div class="wrap-short-detail">'
            + '<h3 class="rs acticle-title"><a class="be-fc-orange" href="'
            + 'project.html?id=' + results[i].id + '">'
            + results[i].attributes.title
            + '</a></h3>'
            + '<p class="rs title-description">'                                   
            + results[i].attributes.shortDesc
            + '</p>'
            + '<p class="rs project-location">'
            + '<i class="icon iLocation"></i>Location '
            + results[i].attributes.location
            + '</p>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<div class="bottom-project-info clearfix" style="background:white">'
            + '<div class="fee-item line-progress">'
            + '<div class="bg-progress">'
            + '<span  style="width: 50%"></span>'
            + '</div>'
            + '</div>'
            + '<div class="group-fee clearfix">'
            + '<div class="fee-item"><p class="rs lbl">Funded</p><span class="val">' 
            + ((results[i].attributes.funds/results[i].attributes.goal) * 100) + '%'
            + '</span></div><div class="sep"></div><div class="fee-item"><p class="rs lbl">Pledged</p><span class="val">$'
            + results[i].attributes.pledged 
            + '</span></div><div class="sep"></div><div class="fee-item"><p class="rs lbl">Time Left</p><span class="val">' 
            + daydiff(results[i].attributes.lastDate)
            + '</span>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
        container.appendChild(item);
    }
    
    function pull() {
        var today = new Date();
        var query = new Parse.Query(PostObject);
        query.greaterThan("lastDate", today).ascending("createdAt");
        query.find({
            success: function(results) {
                if(results.length > 4 ){
                    for(var i = 0; i < 3; i++) {
                        addItem(results, "NewProj_Container", i, 4);
                    }
                } else {
                    for(var i = 0; i < results.length; i++) {
                        addItem(results, "NewProj_Container", i, 4);
                    }
                }
            },

            error: function(error) {
                alert('An error has occured while loading data. Contact support team at support@yaar.com.');
            }
      
        });
        query = new Parse.Query(PostObject);
        query.descending("createdAt");
        query.find({
            success: function(results) {
                addItem(results, "EOT_Container", 0, 9);
            },

            error: function(error) {
                alert('An error has occured while loading data. Contact support team at support@yaar.com.');
            }
      
        });
    }
    pull();
});