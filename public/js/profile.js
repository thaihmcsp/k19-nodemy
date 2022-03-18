
async function upload (){
  try {
    const form = $('form')[0]
    const formData = new FormData(form)
    const res = await $.ajax({
      url:'/user/622756a4759091eff6ea92b7/profile',
      type: 'PUT',
      data: formData,
      processData: false,
      contentType: false,
    })
  } catch (error) {
    console.log(13, error);
  }
}