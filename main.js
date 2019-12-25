'use strict';

const urlSignUp = 'https://teachapi.herokuapp.com/sign_up';
const urlSignIn = 'https://teachapi.herokuapp.com/sign_in';
const urlUsers = 'https://teachapi.herokuapp.com/users';
const urlPosts = 'https://teachapi.herokuapp.com/posts';

const onclickButtonSignUp = () => {
  const name = document.getElementById("signUpName").value;
  const bio = document.getElementById("signUpBio").value;
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;
  const passwordConfirmation = document.getElementById("signUpPasswordConfirmation").value;
  const bodyObj = {
    "sign_up_user_params": {
      "name": name,
      "bio": bio,
      "email": email,
      "password": password,
      "password_confirmation": passwordConfirmation
    }
  }
  const method = "POST";
  const body = JSON.stringify(bodyObj);
  const headers = {
    'Content-Type': 'application/json'
  };
  fetch(urlSignUp, { method, headers, body })
    .then((res) => res.json())
    .then(resJson => {
      console.log(resJson)
      // 今サインアップしたユーザのトークンを保存する
      localStorage.token = resJson.token;
    })
    .catch(console.error);
}
