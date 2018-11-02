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
        var data = {
          time: this.innerText,
          IdRoom: IdRoom.innerText
        }
        //write here to send data
      });
    }

    //find week current on year
    function findCurrentWeek(){
        let sum = 0;
        for(x = 1; x<= arguments[0];x++){
          sum+= arguments[x];
        }
        return Math.ceil(sum/=7);
      }

    function nextMonth(date,month,isLeapYear){
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          if(date == 31)
            return ++month;
          else return month;
        case 4:
        case 6:
        case 9:
        case 11:
          if(date == 30)
            return ++month;
          else return month;
        case 2:
          if((isLeapYear && date == 29) || (!isLeapYear && date == 28))
            return ++month;
          else return month;
        default:
          console.error(`wrong fomat`);
          break;
      }
    }
    function leapYear(year)
      {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
      }

    //find weekcurren with leapyear condition
    function getCurrentWeek(){
        //check whether this year is leap or not
        let isLeapYear = leapYear(now.getFullYear());
        //render currentweek
        let result; 
        let dayOfMonday,currentMonth;
        
        if(isLeapYear){
  
            result=findCurrentWeek(now.getMonth()+1,now.getDate()+1,31,29,31,30,31,30,31,31,30,31,30,31);
          }
          else{
            result=findCurrentWeek(now.getMonth()+1,now.getDate()+1,31,28,31,30,31,30,31,31,30,31,30,31);
          }
        currentWeek.innerHTML = `Tuần: ${result}`;

        //get date of monday and current month
        now.setDate(now.getDate()-now.getDay() +1)
        dayOfMonday = now.getDate();
        currentMonth = now.getMonth() +1;
        //dayonweek will run from monday to sunday and fill date&month to att title
        var DayOnWeek = new Date(currentMonth+'-'+dayOfMonday+'-'+now.getFullYear());
        var temp = MonDay;
        for(let x=0; x<6; x++){
          let count = 1;
          temp.setAttribute(`title`,`${DayOnWeek.getDate()}-${currentMonth}`);
          for(let y of ListAllDate[x]){
            //change format value here
            y.setAttribute(`value`,`Tiết ${count}/ Ngày ${DayOnWeek.getDate()}-${currentMonth}`);
            y.setAttribute(`title`,`Tiết ${count++}/ Ngày ${DayOnWeek.getDate()}-${currentMonth}`);
          }
          
          //next to the next day on week
          temp = temp.nextElementSibling;
          //check the last day of month or not
          currentMonth = nextMonth(DayOnWeek.getDate(),currentMonth,isLeapYear);
          //next day
          DayOnWeek.setDate(DayOnWeek.getDate()+1);

        }
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