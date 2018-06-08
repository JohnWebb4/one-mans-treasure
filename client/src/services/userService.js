import $ from 'jquery';

export function signupService({username, password}, callback){
  $.post('/signup', {
    user: username, pw: password, created_at: Date.now()
  })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    callback(error);
  })
}

export function loginService({username, password}, callback){
  $.post('/login', {
    user: username, pw: password
  })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    callback(error);
  })
}

export function updateUserService({UserId, Username, Password, OriginalPw}, callback) {
  $.ajax({
    type:'PUT',
    url: `/account/${UserId}`,
    data: {
      user: Username,
      pw: Password,
      originalPw: OriginalPw
    }
  })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    callback(error);
  })
}

