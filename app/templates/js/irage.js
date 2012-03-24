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
           what: '',
           fmt: 'json',
           where: 'cZ'+lon+','+lat, // cZ{longitude},{latitude}
           apikey:"ss6jdfmjsppb8wxqm6w7etaw",  // sandbox api key 
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
            , 1200*i);
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
                   apikey:"ss6jdfmjsppb8wxqm6w7etaw",  // pixre.org sandbox api key 
                   UID: uid, // unique use id :)
               },
               success: function (busndata) {
                   var div = $("#results");
                   if (busndata.phones) {
                       div.append(
                        '<div class="result">'
                        +'<div>'+name+'</div>'
                        +'<div>'+busndata.phones[0].dispNum+'</div>'
                        +'</div>'
                        );
                   }
               }
            });
    };
};
