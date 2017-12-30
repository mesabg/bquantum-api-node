$(document).ready(function(){
    var json = {};
    var hashKey = "ww";

    //-- Get initial json
    $.ajax({
        method: 'GET',
        url: 'data',
        success: function(response){
            document.getElementById("json-data").appendChild(
                renderjson
                    .set_show_to_level(6)
                    (json = response)
            );
        }
    });


    //-- Update JSON
    $('form#update-json').submit(function(event){
        event.preventDefault();
        var data = {};
        $(this).serializeArray().forEach(function(element){
            data[element.name] = element.value;
        });

        console.log("Sending http request");
        $.ajax({
            method: 'POST',
            url: 'data',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response){
                $('#json-data').children().remove();
                document.getElementById("json-data").appendChild(
                    renderjson
                        .set_show_to_level(6)
                        (json = response)
                );
                hashKey = data.hashKey;
                console.log("New JSON is :: ", json);
            }
        });
    });


    //-- Send JSON to BQ
    $('button#send-json').on('click', function(){
        $.ajax({
            method: 'POST',
            url: 'pay',
            data: JSON.stringify({
                data: json,
                hashKey: hashKey
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response){
                $('#json-response').children().remove();
                document.getElementById("json-response").appendChild(
                    renderjson
                        .set_show_to_level(6)
                        (response)
                );
                console.log("JSON BQ response is :: ", response);
            }
        });
    });
});