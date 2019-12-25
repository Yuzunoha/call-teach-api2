'use strict';

const urlSignUp = 'https://teachapi.herokuapp.com/sign_up';
const urlSignIn = 'https://teachapi.herokuapp.com/sign_in';
const urlUsers = 'https://teachapi.herokuapp.com/users';
const urlPosts = 'https://teachapi.herokuapp.com/posts';

const onclickButtonSignIn = () => {
  const name = document.getElementById("singInName").value;
  const bio = document.getElementById("singInBio").value;
  const email = document.getElementById("singInEmail").value;
  const password = document.getElementById("singInPassword").value;
  const passwordConfirmation = document.getElementById("singInPasswordConfirmation").value;
  const body = {
    "sign_up_user_params": {
      "name": name,
      "bio": bio,
      "email": email,
      "password": password,
      "password_confirmation": passwordConfirmation
    }
  }
  console.log(body);
}

