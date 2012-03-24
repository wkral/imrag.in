var IRAGE = {};


/**
 * query by name
 */
IRAGE.findByName = function (text) {
    //http://www.yellowapi.com/docs/places/#findbusiness
    $.ajax({
       url: "/yellowapi/FindBusiness/",  // XXX: yellowapi doesnt to jsonP :(
       dataType: 'json',
       data: { 
           what: text,
           fmt: 'json',
           where: 'canada`', // XXX: need bigger place to get more chance 
           apikey:"ss6jdfmjsppb8wxqm6w7etaw",  // sandbox api key 
           UID: Math.random(), 
       },
       success: IRAGE.display,
    });
};

IRAGE.findByLocation = function (text) {
    throw "not implemented";
};


IRAGE.display = function (data) {

    var div = $("#results").empty();
    //div.text(JSON.stringify(data));
    if (!data.listings) {
        div.text("No result for "+text+"!");
        return;
    }
    for (var i=0; i<data.listings.length; i++) {
        var busn = data.listings[i];  // business
        var name = busn.name;
        // yellowapi sandbox limit 1 call per sec :(
        // even slower they are not happy..
        div.append("<div>"+name+"</div>");
        /*
        setTimeout(
            PIXREORG.getYellowapiBusnCallBack(name,busn.address.prov,busn.id,busn.merchantUrl,uid)
            , 1200*i);
        */
    }

};

