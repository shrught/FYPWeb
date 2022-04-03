d3.csv("static/mtgox_accounts.csv").then(function(data){
    var d = data;
    var button = d3.select("#button");
    var form = d3.select("#form");
    var searchid;
    var searchbyusername;
    var searchbyemail;
    var idbtn = document.getElementById("idbtn");
    idbtn.onclick = SearchbyID;
    var usernamebtn = document.getElementById("usernamebtn");
    usernamebtn.onclick = SearchbyUN;
    var emailbtn = document.getElementById("emailbtn");
    emailbtn.onclick = SearchbyEM;
    console.log("hello");
    
    button.on("click", runEnter);
    form.on("submit", runEnter);
    
function SearchbyID(){
    searchid = true;
    searchbyemail = false;
    searchbyusername = false;
    console.log("ID");
    document.getElementById("searchby").innerHTML = "Search by ID";
}

function SearchbyUN(){
    searchid = false;
    searchbyemail = false;
    searchbyusername = true;
    console.log("UN");
    document.getElementById("searchby").innerHTML = "Search by username";
}

function SearchbyEM(){
    searchid = false;
    searchbyemail = true;
    searchbyusername = false;
    console.log("EM");
    document.getElementById("searchby").innerHTML = "Search by email";
}
// Defining the function
function runEnter() {

    // This line of code selects the <tbody> from the html and clears it. If this is not used, then the results would appear on top of the previous result.
    d3.select("tbody").html("") 
    
    // This code is needed to prevent the page from reloading.
    d3.event.preventDefault(); 
    
    // This code will get the user's input from what the user will type in the html <input> since we assigned it the "user-input" id. It will get the value and store it in our inputValue variable
    var inputValue = d3.select("#user-input").property("value");
    
    // This code will filter the movies looking at the actors column. It will store the values when there is a match from the text sequence the user entered and the text from our actors column from the CSV data.
    
    
    var filteredResult;
    if(searchbyusername === true){
        filteredResult = d.filter(d => d.Username.includes(inputValue));
    }
    else if(searchid === true){
        filteredResult = d.filter(d => d.UserID.includes(inputValue));
    }
    else if(searchbyemail === true){
        filteredResult = d.filter(d => d.Email.includes(inputValue));
    }
    else{
        filteredResult = d.filter(d => d.Username.includes(inputValue));
    }
    
    // This was the easiest approach I found to sort the results by a different column in descending order. I had to include a new script in my head to use the _.sortBy 
    //This is the script:  
    //<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.10.0/lodash.min.js"></script>
    var output = _.sortBy(filteredResult, 'UserID').reverse()
    // Once I had all the values in my output variable, all I needed was to loop through them and add them to the table one by one. This was done using d3, where I inserted the value for each one of the columns I wanted using the necessary html to fit each table row.
    for (var i = 0; i < filteredResult.length; i++) {
        d3.select("tbody").insert("tr").html(
            "<td>" + [i+1] + "</td>" +
            "<td>" + (output[i]['UserID'])+"</a>"+"</td>" + 
            "<td>" + (output[i]['Username'])+"</td>" +
            "<td>" + (output[i]['Email'])+"</td>" +
            "<td>" + (output[i]['Password'])+"</td"
        ) 
    }
    };
    });