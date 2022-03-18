$.ajax({
  url:'http://localhost:3000/user',
  type:'GET'
}).then(function(data){
  console.log(6, data);
}).catch(function(err){
  console.log(8, err);
})

function logout(){
  $.ajax({
    url:'/user/logout',
    type:'PUT'
  })
  .then(function(data){
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log(data);
  })
  .catch(function(err){
    console.log(err);
  })
}

async function test (){
  try {
    console.log(new Date());
    const res1 = $.ajax({
      url:'/test1',
      type:'get'
    })
    const res2 = $.ajax({
      url:'/test2',
      type:'get'
    })

    console.log(await res1);
    console.log(await res2);
    console.log(new Date());
  } catch (error) {
    console.log(error);
  }
}