export function CreateCookie(email){
    var token = TokenGeneration()

    document.cookie = "Email = "+ email+", AuthID = "+token
    console.log(document.cookie)
}
    
    
    
    
export function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}



export function isAuthenticated(cookie) {
    // Check if a user token exists in local storage
    console.log("THE AUTHID "+ getCookie('AuthID'))
    return getCookie('AuthID') !== null
    
};


function TokenGeneration(){

    var token =  rand() + rand();
    return token
}


var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};











