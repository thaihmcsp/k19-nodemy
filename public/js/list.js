let limit = 5
let totalPage
function render(page){
  $.ajax({
    url:`/user/list?page=${page}&limit=${limit}`,
    type:'GET'
  })
  .then(function(data){
    $('.listData').html('')
    data.map(function(ele){
      let tr = `
      <tr>
        <td>${ele.username}</td>
        <td>${ele.password}</td>
      </tr>
      `
      $('.listData').append(tr)
    })
  })
  .catch(function(err){
    console.log(err);
  })
}

render(1,5)
renderButton()

function renderButton(){
  $.ajax({
    url:'/user/list',
    type:'GET'
  })
  .then(function(data){
    totalPage = Math.ceil(data.length/limit)
    $('.buttonList').html('')
    for(let i = 0;i<totalPage; i++){
      let button = `
      <button onclick='getData(${i + 1})'>${i + 1}</button>
      `
      $('.buttonList').append(button)
    }
  })
  .catch(function(err){
    console.log(err);
  })
}
$('.down').on('click', function(){
  getData(1)
})
$('.up').on('click', function(){
  getData(2)
})


function getData(page){
  console.log(page);
  render(page)
  $('.up').off('click')
  $('.down').off('click')

  if( totalPage !== page && page > 1 ){
    $('.up').on('click', function(){
      getData(page + 1)
    })
    $('.down').on('click', function(){
      getData(page - 1)
    })
  }

  if(page === 1){
    $('.down').on('click', function(){
      getData(1)
    })
    $('.up').on('click', function(){
      getData(2)
    })
  }

  if(page === totalPage){
    $('.down').on('click', function(){
      getData(totalPage - 1)
    })
    $('.up').on('click', function(){
      getData(totalPage)
    })
  }
}

$('#limit').on('change', function(){
  limit = $('#limit').val()
  render(1)
  renderButton()
  $('.up').off('click')
  $('.down').off('click')
  if(totalPage >=2){
    $('.up').on('click', function(){
      getData(1)
    })
  }else{
    $('.down').on('click', function(){
      getData(1)
    })
    $('.up').on('click', function(){
      getData(2)
    })
  }
})