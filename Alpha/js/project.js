//data_complete, data_donors, data_pledges, data_days, data_title, data_location, data-desc
$(function(){

    $.urlParam = function(name){
        var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    Parse.initialize("hwicp64PU4dlUrTVLSksoFmEcg0S3WPjQ2thXwQk", "6Eqi0Zjxo4p6FYWDUM31akYmtR7XBiRkBhHE3EBp");
    
    var PostObject = Parse.Object.extend("Post");
    var postObject = new PostObject();
    
    function daydiff(date) {
        var today = new Date();
        var timeDiff = Math.abs(date.getTime() - today.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        return diffDays;
    }
    
    function pull() {
    
        var query = new Parse.Query(PostObject);
        query.equalTo("objectId", $.urlParam('id'));
        query.find({
            success: function(results) {
                var d = results[0].attributes.lastDate;
                $('#data_complete').attr("data-percent", ((results[0].attributes.funds/results[0].attributes.goal) * 100));
                $('#data_donors').html(results[0].attributes.supporters);
                $('#data_pledges').html(results[0].attributes.pledged);
                $('#data_days').html(daydiff(d));
                $('#data_title').html(results[0].attributes.title);
                $('#data_location').html(results[0].attributes.location);
                $('#data-desc').html(results[0].attributes.desc);
                $('#header3').attr("style", "background:url("+ results[0].attributes.img + ");");
                $('#mtitle').html(results[0].attributes.title);
            },

            error: function(error) {
                alert('Could\'nt find listed project. Contact support team at support@yaar.com.');
            }
      
        });
    }
    
    pull();
});