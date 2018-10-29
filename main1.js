document.addEventListener('DOMContentLoaded',function(){
    var currentWeek = document.getElementById('current-week');
    var MonDay = document.getElementById('monday');
    let now = new Date();
    //gia tri cua nha hoc va phong hoc
    var HomeLearningValue,ClassroomValue;


    currentWeek.addEventListener('load',getCurrentWeek(event));
    function renderTable(event){
        event.preventDefault();
        HomeLearningValue = event.currentTarget[0].value;
        ClassroomValue = event.currentTarget[1].value;
        console.log(ClassroomValue,HomeLearningValue)
    }
    
    //find week current on year
    function findCurrentWeek(){
        let sum = 0;
        for(x = 1; x<= arguments[0];x++){
          sum+= arguments[x];
        }
        return Math.floor(sum/=7);
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
    function getCurrentWeek(event){
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
        dayOfMonday = now.getDate() - now.getDay() + 1;
        currentMonth = now.getMonth() +1;
        //dayonweek will run from monday to sunday and fill date&month to att title
        var DayOnWeek = new Date(currentMonth+'-'+dayOfMonday+'-'+now.getFullYear());
        var temp = MonDay;
        for(let x=0; x<6; x++){
          temp.setAttribute(`title`,`${DayOnWeek.getDate()}-${currentMonth}`);
          //next to the next day on week
          temp = temp.nextElementSibling;
          //check the last day of month or not
          currentMonth = nextMonth(DayOnWeek.getDate(),currentMonth,isLeapYear);
          //next day
          DayOnWeek.setDate(DayOnWeek.getDate()+1);

        }
    }
})