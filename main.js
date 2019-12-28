'use strict';

const urlSignUp = 'https://teachapi.herokuapp.com/sign_up';
const urlSignIn = 'https://teachapi.herokuapp.com/sign_in';
const urlUsers = 'https://teachapi.herokuapp.com/users';
const urlPosts = 'https://teachapi.herokuapp.com/posts';

const updateProfileTagByLocalStorage = () => {
  const profileTag = document.getElementById('profile');
  let s = '';
  s += '<table border>';
  s += '<tr><th>id</th><th>name</th><th>bio</th><th>email</th><th>created_at</th><th>updated_at</th></tr>';
  s += '<tr>';
  s += `<td>${localStorage.id}</td><td>${localStorage.name}</td>`;
  s += `<td>${localStorage.bio}</td><td>${localStorage.email}</td>`;
  s += `<td>${localStorage.created_at}</td><td>${localStorage.updated_at}</td>`;
  s += '</tr>';
  s += '</table>';
  profileTag.innerHTML = s;
};

// ブラウザ更新時にプロフィール欄を更新する
updateProfileTagByLocalStorage();

const updateLocalStorageProfile = obj => {
  localStorage.id = obj.id;
  localStorage.name = obj.name;
  localStorage.bio = obj.bio;
  localStorage.token = obj.token;
  localStorage.email = obj.email;
  localStorage.created_at = obj.created_at;
  localStorage.updated_at = obj.updated_at;
};

const updateLocalStorageAndProfileTag = resJson => {
  updateLocalStorageProfile(resJson);
  updateProfileTagByLocalStorage();
};

const fetchWrap = (url, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.token
  };
  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  /* log出力 */
  console.log('fetchWrap() url : ');
  console.log(url);
  console.log('fetchWrap() options : ');
  console.log(options);
  console.log('fetchWrap() response : ');

  return fetch(url, options)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      return resJson;
    })
    .catch(console.error);
};

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
  fetchWrap(urlSignUp, 'POST', bodyObj).then(updateLocalStorageAndProfileTag);
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
  fetchWrap(urlSignIn, 'POST', bodyObj).then(updateLocalStorageAndProfileTag);
};

const onclickButtonUsersGet = () => {
  const page = document.getElementById('usersGetPage').value;
  const limit = document.getElementById('usersGetLimit').value;
  const query = document.getElementById('usersGetQuery').value;
  const qs = new URLSearchParams({
    page,
    limit,
    query
  });
  fetchWrap(`${urlUsers}?${qs}`);
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
  fetchWrap(`${urlUsers}/${id}`, 'PUT', bodyObj).then(updateLocalStorageAndProfileTag);
};

const onclickButtonUsersDelete = () => {
  const id = document.getElementById('usersDeleteId').value;
  fetchWrap(`${urlUsers}/${id}`, 'DELETE').then(updateLocalStorageAndProfileTag);
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
  fetchWrap(`${urlUsers}/${id}/timeline?${qs}`);
};

const onclickButtonPostsPost = () => {
  const text = document.getElementById('postsPostText').value;
  const bodyObj = {
    post_params: {
      text
    }
  };
  fetchWrap(urlPosts, 'POST', bodyObj);
};

const onclickButtonPostsPut = () => {
  const id = document.getElementById('postsPutId').value;
  const text = document.getElementById('postsPutText').value;
  const bodyObj = {
    post_params: {
      text
    }
  };
  fetchWrap(`${urlPosts}/${id}`, 'PUT', bodyObj);
};

const onclickButtonPostsDelete = () => {
  const id = document.getElementById('postsDeleteId').value;
  fetchWrap(`${urlPosts}/${id}`, 'DELETE');
};

const onclickButtonPostsGet = () => {
  const page = document.getElementById('postsGetPage').value;
  const limit = document.getElementById('postsGetLimit').value;
  const query = document.getElementById('postsGetQuery').value;
  const qs = new URLSearchParams({
    page,
    limit,
    query
  });
  fetchWrap(`${urlPosts}?${qs}`);
};

const onclickButtonFollowPost = () => {
  const id = document.getElementById('followPostId').value;
  const method = 'POST';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.token
  };
  fetch(`${urlUsers}/${id}/follow`, {
    method,
    headers
  })
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
    })
    .catch(console.error);
};

const onclickButtonFollowDelete = () => {
  const id = document.getElementById('followDeleteId').value;
  const method = 'DELETE';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.token
  };
  fetch(`${urlUsers}/${id}/follow`, {
    method,
    headers
  })
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
    })
    .catch(console.error);
};
