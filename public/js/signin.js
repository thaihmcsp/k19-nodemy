
$('.login').on('click', function(){
  const username = $('#username').val()
  const password = $('#password').val()
  console.log(username, password);
  $.ajax({
    url:'/user/login',
    type:'POST',
    data:{username: username, password: password}
  })
  .then(function(data){
    window.location.href = '/home'
  })
  .catch(function(err){
    console.log(err);
    alert( err.responseJSON.mess);
  })
})