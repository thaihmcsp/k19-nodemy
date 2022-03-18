async function addUser (){
  const username = $('#username').val()
  const password = $('#password').val()
  console.log(username, password);
  try {
    const res = await $.ajax({
      url:'/user/create',
      type:'POST',
      data: {username: username, password:password}
    })
    $('.listData').html('')
    $('.listData').html(res)
    // window.location.reload()
  } catch (error) {
    console.log(13, error);
  }
}

async function deleteUser (id){
  try {
    const res = await $.ajax({
      url:'/user/'+id,
      type:'DELETE'
    })

    console.log(res);
    $('.listData').html('')
    $('.listData').html(res)

    // window.location.reload()
  } catch (error) {
    console.log(error);
  }
}