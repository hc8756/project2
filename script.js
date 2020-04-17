
    window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};
	
	let displayTerm = "";
	
    function searchButtonClicked(){
        console.log("searchButtonClicked() called");
        const GIPHY_URL="https://api.giphy.com/v1/gifs/search?";
        let GIPHY_KEY="Gd4QNuLwAdImrpZDlz6ASyfRbj6MKkKi"; //added own key
        let url= GIPHY_URL;
        url+="api_key="+GIPHY_KEY;
        let term=document.querySelector("#searchterm").value;
        displayTerm=term;
        term=term.trim();
        term= encodeURIComponent(term);
        if(term.length<1) return;
        url+="&q="+term;
        //Make it so that limit increases when you scroll down+load loading image
        //Finda way to sort images
        let limit=20;
        url+="&limit="+limit;
        document.querySelector("#status").innerHTML="<b>Searching for "+displayTerm+"</b>";
        console.log(url);
        getData(url);
    }

    function getData(url){
        let xhr=new XMLHttpRequest();
        xhr.onload=dataLoaded;
        xhr.onerror=dataError;
        xhr.open("GET",url);
        xhr.send();
    }

    function dataLoaded(e){
        let xhr=e.target;
        console.log(xhr.responseText);
        let obj= JSON.parse(xhr.responseText);
        if(!obj.data || obj.data.length==0){
            document.querySelector("#status").innerHTML="<b>No results found for "+displayTerm+"</b>";
            return;
        }
        let results= obj.data;
        console.log("results.length="+results.length);
        let bigString="";
        for (let i=0;i<results.length;i++){
            let result=results[i];
            let smallURL=result.images.fixed_width_downsampled.url;
            if(!smallURL) smallURL = "images/no-image-found.png";
            let url=result.url;
            //download button 
            let line=`<div class='result'> <img src='${smallURL}' title='${result.id}'/>`;
            line+= `<span><a target= '_blank' href= '${url}' id = cpText > View on Giphy </a></span>`;
            //start of copy url functions
            line+=`<button class="copyURLButton" onclick="copyURLText('${smallURL}')"> <--Copy URL</button>`;
            line += `<button class="favButton" onclick= "addToFavorites('${smallURL}')">Favorite</button></div>`;
            bigString+=line;
        }
        document.querySelector("#content").innerHTML= bigString;
        //document.querySelector("#status").innerHTML= "<b>Success!</b><p><i>Here are"+results.length+" results for "+displayTerm+"</i></p>";
    }

    //makes a giant button for copying the URL of the GIF
    function copyURLText(url)
    {
        /*const Userinput = document.createElement('input');
        Userinput.setAttribute('readonly', 'readyonly');
        Userinput.setAttribute('value', url);
        document.body.appendChild(Userinput);
        Userinput.select();
        Userinput.setSelectionRange(0, 9999);
        if (document.execCommand("Copy", "false", "null")){
            alert("URL Copy is now copied!");
        }
        else {
            alert("URL didn't copy over try again!")
        }*/
        var cpText= document.createElement("textarea");
        document.body.appendChild(cpText);
        cpText.value = url;
        cpText.select();
        document.execCommand("copy");
        alert("Url has been copied");
        document.body.removeChild(cpText);
    }
    function dataError(e){
        console.log("An error occurred");
    }
    //global vairable for  favorites array
    let favArray = [];
    function showFavorites(){
        let line = "";
        for(var i = 0; i< favArray.length;i++){
            line += '<img src =' + favArray[i] + "/>";
        }
        document.querySelector("#content").innerHTML= "";
        document.querySelector("#status").innerHTML = "Favorites";
        document.querySelector("#content").innerHTML= line ;

    }
   
    function addToFavorites(url){
        favArray.push(url);
        alert("added to favorites !");
    }
