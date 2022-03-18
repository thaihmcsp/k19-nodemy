async function add (){
  let name = $('#name').val()
  let status = $('#status').val()
  let deadline = $('#deadline').val()
  console.log(name, status, deadline);
  if(name && status && deadline){
    try {
      const res = await $.ajax({
        url:'/todo',
        type:'POST',
        data: { name, status, deadline}
      })
      console.log(res);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }else{
    alert('hay dien du thong tin')
  }
  
}