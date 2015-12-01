$(document).ready(function() {
    var pusher = new Pusher('de504dc5763aeef9ff52'),
        order_book_channel = pusher.subscribe('order_book'),
        trades_channel = pusher.subscribe('live_trades'),
        symbol = "$";

    //$.ajax({
    //    type: "GET",
    //    url: "http://query.yahooapis.com/v1/public/yql",
    //    jsonp: "callback",
    //    dataType: "jsonp",
    //    data: {
    //        q: 'select * from html where url = "https://www.bitstamp.net/api/ticker/"',
    //        format: 'json'
    //    },
    //    success: function(response) {
    //        var data = $.parseJSON(response.query.results.body),
    //            last = data.last,
    //            bid = data.bid,
    //            ask = data.ask;

    //        $('.ticker__last').text(symbol + last);
    //        $('.ticker__bid').text(symbol + bid);
    //        $('.ticker__ask').text(symbol + ask);

            trades_channel.bind('trade', function(data) {
                var last = (data.price).toFixed(2);

                $('.ticker__last').text(symbol + last);
                console.log("Last:", last);
            });

            order_book_channel.bind('data', function(data) {
                var orders = data,
                    asks = [],
                    bids = [],
                    bidMax,
                    askMin;

                $.each((orders.bids), function(key, value) {
                    bids.push(parseFloat(value[0]));
                });

                bidMax = _.max(bids).toFixed(2);

                console.log("Bid:", bidMax);
                $('.ticker__bid').text(symbol + bidMax);

                $.each((orders.asks), function(key, value) {
                    asks.push(parseFloat(value[0]));
                });

                askMin = _.min(asks).toFixed(2);

                console.log("Ask:", askMin);
                $('.ticker__ask').text(symbol + askMin);
            });
    //    }
    //});
});
