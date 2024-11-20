var userPicture = document.getElementById("user-picture");
var userOptions = document.getElementById("user-options");

userPicture.addEventListener('click', () => {
    if(!userOptions.contains(event.target)){
        if(userOptions.classList.contains('is-hidden')){
            userOptions.classList.remove('is-hidden');
            userOptions.classList.add('is-visible');
        }else{
            userOptions.classList.remove('is-visible');
            userOptions.classList.add('is-hidden');
        }
    }
});

window.addEventListener('click', () => {
    if(!userPicture.contains(event.target)){
        userOptions.classList.remove('is-visible');
        userOptions.classList.add('is-hidden');
    }
});

window.document.onscroll = () => {
    userOptions.classList.remove('is-visible');
    userOptions.classList.add('is-hidden');
};