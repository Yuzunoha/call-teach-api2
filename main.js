'use strict';

const urlSignUp = 'https://teachapi.herokuapp.com/sign_up';
const urlSignIn = 'https://teachapi.herokuapp.com/sign_in';
const urlUsers = 'https://teachapi.herokuapp.com/users';
const urlPosts = 'https://teachapi.herokuapp.com/posts';

const onclickButtonSignUp = () => {
  const name = document.getElementById('signUpName').value;
  const bio = document.getElementById('signUpBio').value;
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  const passwordConfirmation = document.getElementById('signUpPasswordConfirmation').value;
  const bodyObj = {
    sign_up_user_params: {
      name: name,
      bio: bio,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
  };
  const method = 'POST';
  const body = JSON.stringify(bodyObj);
  const headers = {
    'Content-Type': 'application/json'
  };
  fetch(urlSignUp, {
    method,
    headers,
    body
  })
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      // 返却されたトークンを保存する
      localStorage.token = resJson.token;
    })
    .catch(console.error);
};

const onclickButtonSignIn = () => {
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;
  const passwordConfirmation = document.getElementById('signInPasswordConfirmation').value;
  const bodyObj = {
    sign_in_user_params: {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
  };
  const method = 'POST';
  const body = JSON.stringify(bodyObj);
  const headers = {
    'Content-Type': 'application/json'
  };
  fetch(urlSignIn, {
    method,
    headers,
    body
  })
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      // 返却されたトークンを保存する
      localStorage.token = resJson.token;
    })
    .catch(console.error);
};

const onclickButtonUsersGet = () => {
  const page = document.getElementById('usersGetPage').value;
  const limit = document.getElementById('usersGetLimit').value;
  const query = document.getElementById('usersGetQuery').value;
  const method = 'GET';
  const qs = new URLSearchParams({
    page,
    limit,
    query
  });
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.token
  };
  fetch(`${urlUsers}?${qs}`, {
    method,
    headers
  })
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
    })
    .catch(console.error);
};

const onclickButtonUsersPut = () => {
  const id = document.getElementById('usersPutId').value;
  const name = document.getElementById('usersPutName').value;
  const bio = document.getElementById('usersPutBio').value;
  const bodyObj = {
    user_params: {
      name,
      bio
    }
  };
  const method = 'PUT';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.token
  };
  const body = JSON.stringify(bodyObj);
  fetch(`${urlUsers}/${id}`, {
    method,
    headers,
    body
  })
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
    })
    .catch(console.error);
};

const onclickButtonUsersDelete = () => {
  const id = document.getElementById('usersDeleteId').value;
  const method = 'DELETE';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.token
  };
  fetch(`${urlUsers}/${id}`, {
    method,
    headers
  })
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
    })
    .catch(console.error);
};

const onclickButtonUsersTimeline = () => {
  const id = document.getElementById('usersTimelineId').value;
  const page = document.getElementById('usersTimelinePage').value;
  const limit = document.getElementById('usersTimelineLimit').value;
  const query = document.getElementById('usersTimelineQuery').value;
  const qs = new URLSearchParams({
    page,
    limit,
    query
  });
  const method = 'GET';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.token
  };

  fetch(`${urlUsers}/${id}/timeline?${qs}`, {
    method,
    headers
  })
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
    })
    .catch(console.error);
};

const onclickButtonPostsPost = () => {
  const text = document.getElementById('PostsPostText').value;
  const bodyObj = {
    "post_params": {
      text
    }
  };
  const method = 'POST';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.token
  };
  const body = JSON.stringify(bodyObj);
  fetch(urlPosts, {
    method,
    headers,
    body
  })
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
    })
    .catch(console.error);
};

