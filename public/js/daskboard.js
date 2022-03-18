
async function getUser (){
  try {
    const res = await $.ajax({
      url:'/daskboard/user',
      type:'GET'
    })
    $('.body').html('')
    $('.body').html(res)
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}