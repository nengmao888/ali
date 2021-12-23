$(function () {
    // alert(test);
    // 1. Press Enter to save the complete data to local storage
    // Var todolist = [{title: "XXX ", done: false}]
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("please enter what do you want to do");
            } else {
                // Read the original data from the local storage first
                var local = getDate();
                // console.log(local);
                // Append the latest data to the local array
                local.push({ title: $(this).val(), done: false });
                // store this array local to local storage
                saveDate(local);
                // 2. ToDoList locally stores data rendering loaded into the page
                load();
                $(this).val("");
            }
        }
    });
    // 3. ToDoList delete operation
    $("ol, ul").on("click", "a", function () {
        // alert(test);
        // Get local storage first
        var data = getDate();
        console.log(data);
        // Modify the data
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index, 1);
        // Save to local storage
        saveDate(data);
        // Re-render the page
        load();
    });
    // 4. ToDoList ongoing and completed option operation
    $("ol, ul").on("click", "input", function() {
        // alert(test);
        // Get local storage first
        var data = getDate();
        // Modify the data
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        //    data[?].dane = ?
        data[index].done = $(this).prop("checked");
        console.log(data);
        // Save to local storage
        saveDate(data);  
        // Re-render the page
        load();
    });
    // Read data stored locally
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // The data in the local store is in string format, but we need object format
            return JSON.parse(data);
        } else {
            return []
        }
    }
    // Save local storage data,trans to string format
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    // Render load data
    function load(){
        // Read data stored locally
        var data = getDate();
        console.log(data);
        // Empty the contents of the elements in OL before traversing
        $("ol, ul").empty();
        var todoCount = 0; //the number of doing 
        var doneCount = 0; //the number of done 
        // Iterate over the data
        $.each(data, function(i, n){
            // console.log(n);
            if(n. done){
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>")
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>")
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})