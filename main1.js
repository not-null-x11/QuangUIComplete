document.addEventListener('DOMContentLoaded',function(){
    var currentWeek = document.getElementById('current-week');
    var Saturday = document.getElementById('saturday');
    var ListAllDate = [];
    ListAllDate.push(document.querySelectorAll('.monday'));
    ListAllDate.push(document.querySelectorAll('.tuesday'));
    ListAllDate.push(document.querySelectorAll('.wednesday'));
    ListAllDate.push(document.querySelectorAll('.thursday'));
    ListAllDate.push(document.querySelectorAll('.friday'));
    ListAllDate.push(document.querySelectorAll('.saturday'));
    var ListExpire = document.querySelectorAll('.expire');
    var ListBooked = document.querySelectorAll('.booked');
    var ListAvailable = document.querySelectorAll('.available');
    var IdRoom = document.getElementById('id-room');
    let now = new Date();
    
    currentWeek.addEventListener('load',renderTimeTable(1,2017));
    console.log(IdRoom.value)
    for(let x of ListAvailable){
      x.addEventListener('click',function sendRequest(){
        //tiet-yyyy-mm-dd{
        //   tiet:
        //   ngaythangnam:
        //   idroom
        // }
        var data = {
          time: this.innerText,
          IdRoom: IdRoom.innerText
        }
        console.log(data);

        //write here to send data
      });
    }

    function renderTimeTable(week,year){
      //lay ra ngay dau tien cua tuan
      currentWeek.innerHTML = `Tuần: ${week}`;
      var FirstDayOfYear = new Date(`1-1-${year}`);
      FirstDayOfYear.setDate(FirstDayOfYear.getDate()+(6-FirstDayOfYear.getDay()));

      var parseWeekToDay = (week-1)*7;
      FirstDayOfYear.setDate(FirstDayOfYear.getDate() + parseWeekToDay);
      var count;
      for( let i = 6; i > 0;i--){
        count = 1;
        Saturday.setAttribute('title',`${FirstDayOfYear.getDate()}-${FirstDayOfYear.getMonth()+1}-${FirstDayOfYear.getFullYear()}`)
        Saturday = Saturday.previousElementSibling;
        for(let x of ListAllDate[i-1]){
          x.setAttribute(`value`,`Tiết ${count}/ Ngày ${FirstDayOfYear.getDate()}-${FirstDayOfYear.getMonth()+1}`);
          if(count == 10) count++;
        }
        FirstDayOfYear.setDate(FirstDayOfYear.getDate()-1);
      }

      //add title for td's attribute
      for(let x of ListExpire){
        x.setAttribute('title',"Hết hạn không thể đặt");
      }
      for(let x of ListBooked){
        x.setAttribute('title',"Đã được người khác đặt");
      }
    }

})