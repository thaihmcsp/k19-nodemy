async function addList (){
  const listName = $('#listName').val()
  try {
    const res = await $.ajax({
      url:'/list',
      type:'POST',
      data: {listName: listName}
    })
    $('.list').html(res)
  } catch (error) {
    alert(error.responseJSON.mess)
    console.log(12, error);
  }
}

async function deleteList(id){
  try {
    const res = await $.ajax({
      url: '/list/'+id,
      type:'DELETE'
    })
    $('.list').html(res)
  } catch (error) {
    console.log(error);
  }
}