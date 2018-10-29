document.addEventListener('DOMContentLoaded',function(){
    var HomeLearning = document.getElementById('home-learning');
    var Classroom = document.getElementById('classroom');
    var FormList = document.getElementById('form-list');
    //gia tri cua nha hoc va phong hoc
    var HomeLearningValue,ClassroomValue;

    FormList.addEventListener('submit',renderTable);

    function renderTable(event){
        event.preventDefault();
        HomeLearningValue = event.currentTarget[0].value;
        ClassroomValue = event.currentTarget[1].value;
        console.log(ClassroomValue,HomeLearningValue)
    }


})