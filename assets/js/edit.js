$("#ed_beast").submit( function(event){
    //Prevent the default sumbit action and replace it with this function.
    event.preventDefault();


    var undex_array = $(this).serializeArray();
    var data = {};

    $.map(undex_array, function(n ,i){
        data[n['name']] = n['value']
    })

    console.log(data)

    var request = {
        "url" : `http://localhost:3000/api/beasts/${data.id}`,//`https://nimreths-beasts.herokuapp.com/api/beasts/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done( function(response){
        alert("Data updated.")
    })
})

if(window.location.pathname == '/edit-menu'){
    //Select the element by class and initialize it to a variable.
    $onDelete = $("a.delete")
    //Execute a function once the selected element is clicked.
    $onDelete.click( function(){
        //Initialize the id from the html attribute.
        var id = $(this).attr("data-id")

        //Create a request variable.
        var request = {
            "url" : `http://localhost:3000/api/beasts/${id}`,//`https://nimreths-beasts.herokuapp.com/api/beasts/${data.id}`,
            "method" : "DELETE"
        }

        //Handle deletion notification.
        if(confirm("Are you sure you want to delete this beast?")){
            $.ajax(request).done( function(response){
                alert("Beast deleted from database.")

                //Reload the current page.
                location.reload()
            })
        }
    })
}