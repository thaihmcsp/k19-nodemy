let button = $('button')
button.on('click', async function(){
  try {
    const username = $('#username').val()
    const password = $('#password').val()
    const res = await $.ajax({
      url:`/user/create`,
      type:'POST',
      data:{
        username: username,
        password: password
      }
    })
    console.log(14, res);
  } catch (error) {
    console.log(error);
    alert(error.responseJSON.mess)
  }
})