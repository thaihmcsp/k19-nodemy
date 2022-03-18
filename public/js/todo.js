$('#add').on('click', function(){
  const name = $('#name').val()
  const deadline = $('#deadline').val()
  const status = $('#status').val()
  $.ajax({
    type:'POST',
    url:'/todo',
    data: {
      name: name, 
      deadline:deadline, 
      status:status
    }
  })
  .then(function(data){
    console.log(data);
    render()
    $('#closeModal').trigger('click')
  })
  .catch(function(err){
    console.log(err);
  })
})

render ()

function render (){
  $.ajax({
    url:'/todo',
    type:'GET'
  }).then(function(data){
    $('.todo').html('')
    $('.doing').html('')
    $('.done').html('')
    for(let i = 0; i<data.data.length; i++){
      let div = `
      <tr>
        <td>${data.data[i].name}</td>
        <td>${data.data[i].deadline}</td>
        <td>
          <button>update</button>
          <button>X</button>
        </td>
      </tr>
      `
      $(`.${data.data[i].status}`).append(div)
    }
  })
  .catch(function(err){
    console.log(err);
  })
}