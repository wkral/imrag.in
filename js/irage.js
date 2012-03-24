var IRAGE = {};

//apikey:"ss6jdfmjsppb8wxqm6w7etaw",  // sandbox api key 
//apikey:"43g48je4fubcb9pngsbvqjc2",  // sandbox api key 
var APIKEY ="43g48je4fubcb9pngsbvqjc2"; 

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
           where: 'Vancouver', // XXX: need bigger place to get more chance 
           apikey:APIKEY,  // sandbox api key 
           pgLen: 5,
           UID: Math.random(), 
       },
       success: IRAGE.display,
    });
};

IRAGE.findByLocation = function (lon,lat) {
    //http://www.yellowapi.com/docs/places/#findbusiness
    $.ajax({
       url: "/yellowapi/FindBusiness/",  // XXX: yellowapi doesnt to jsonP :(
       dataType: 'json',
       data: { 
           what: 'business',
           fmt: 'json',
           where: 'cZ'+lon+','+lat, // cZ{longitude},{latitude}
           apikey:APIKEY,  // sandbox api key 
           pgLen: 5,
           UID: Math.random(), 
       },
       success: IRAGE.display,
    });
};


IRAGE.display = function (data) {

    var div = $("#results").empty();
    //div.text(JSON.stringify(data));
    if (!data.listings) {
        div.text("No result for "+text+"!");
        return;
    }
    var uid = Math.random();
    for (var i=0; i<data.listings.length; i++) {
        var busn = data.listings[i];  // business
        var name = busn.name;
        // yellowapi sandbox limit 1 call per sec :(
        // even slower they are not happy..
        setTimeout(
            IRAGE.getYellowapiBusnCallBack(name,busn.address.prov,busn.id,busn.merchantUrl, uid)
            , 1500*i);
    }

};


IRAGE.getYellowapiBusnCallBack = function (name, prov, id, url, uid) {
    return function () {
            $.ajax({
               url: "/yellowapi/GetBusinessDetails/",  // XXX: yellowapi doesnt to jsonP :(
               dataType: 'json',
               data: { 
                   prov: prov,
                   'bus-name': name.substr(0,1),   //XXX: the listing only works with limited string!
                   listingId: id,
                   fmt: 'json',
                   apikey:APIKEY,  // sandbox api key 
                   UID: uid, // unique use id :)
               },
               success: function (busndata) {
                   var div = $("#results");
                   if (busndata.phones) {
                       var result1 = $(
                        '<div class="result">'
                        +'<div>'+name+'</div>'
                        +'<div>'+busndata.phones[0].dispNum+'</div>'
                        +'</div>'
                        );
                       result1.appendTo(div);
                       $.ajax({
                           url: "/businesses/",  // XXX: yellowapi doesnt to jsonP :(
                           type: 'POST',
                           dataType: "json",
                           contentType: "application/json",
                           data: {'name': name, 'contacts': [ 
                                {'type': "Telephone", "value": "555-1234"},
                                //{'type': 'Email', 'value': 'someone@somepleace.com'} 
                            ] }, 
                       });
                   }
               }
            });
    };
};
