let underLine = document.getElementById("under-line")
let taskTabs = document.querySelectorAll(".task-tabs:nth-child(1) .hi")
let tabs = document.querySelectorAll(".task-tabs div")
let mode= "all"
let filterList=[]

// let taskTabs = document.getElementsByClassName("hi") >htmlcollection은 foreach를못씀

for(let i=1; i<tabs.length;i++){
  tabs[i].addEventListener("click",function(event){filter(event)})
}


taskTabs.forEach((item)=>
  item.addEventListener("click",(e)=> horizontalIndicator(e)))

  function horizontalIndicator(e){
    underLine.style.left= e.currentTarget.offsetLeft + "px";
    underLine.style.width= e.currentTarget.offsetWidth + "px";
    underLine.style.top= 
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";

  }

  //유저가 값을 입력한다
let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let taskList=[]
addButton.addEventListener("click",addTask)
//+버튼을 눌렀을 때 addTask의 기능을 수행한다

function addTask(){
  //사용자가 input창에 적은 값을 taskcontent에 저장한다
  //추가정보가 필요할때, 객체를 만든다. 필요한 관련있는 정보를 하나로 묶어주는 것이 객체다.
  let task = {
    id:randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete:false
  }
  taskList.push(task)
  //그리고 task리스트에 그 값을 추가한다
  render()
}

//tasklist를 그리기위한 함수. list를 담고있는 div를 가지고온다
function render(){
    let list=[]
    if(mode == "all"){
      list = taskList
    }else if(mode == "ongoing" || mode == "done"){
      list = filterList
    }

    
    let resultHTML=``
    for(let i=0; i<list.length; i++){
      if(list[i].isComplete == true){resultHTML += `<div class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">check</button>
        <button onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;

      }else{
        resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`;

      }

    }
    //버튼을 클릭하면 toggle함수에 클릭된 아이템의 아이디값을 매개변수로 넣어주겠다.

    document.getElementById("task-board").innerHTML =resultHTML
    console.log(taskList);
    console.log(filterList);
}

function toggleComplete(id){
  for (let i=0; i<taskList.length; i++){
      if(taskList[i].id == id){
        taskList[i].isComplete= !taskList[i].isComplete;//현재 value의 반대 value를 갖고온다.
        break;//for문이 끝나도록 하는 것.
      }
  }
  render()//값을 바꿨으니 불러서 ui를 업데이트해줘야해!
}

function randomIDGenerate(){
  return '_' + Math.random().toString(36).substring(2, 9);
}

function deleteTask(id){
  for (let i=0; i<taskList.length; i++){
    if(taskList[i].id==id){
      taskList.splice(i,1)
      break;
    }
  }
  render()
}




//필터링
//event.target을 console.log(what, event.target.id) 여기넣으면 뭐가 클릭된지 보인다
function filter(event){
  mode = event.target.id
  filterList = [];
  if(mode == "ongoing"){
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].isComplete == false){
        filterList.push(taskList[i])
        //i를 돌면서 false인것만 찾아서 배열에 추가하세요
      }
    }
    render()
  }else if(mode=="done"){
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].isComplete == true){
        filterList.push(taskList[i])

      }
    }  
    render()
  }
}
  


  // +버튼을 클릭하면 할일이 추가된다
  // delete버튼을 누르면 할일이 삭제된다
  // check버튼을 누르면 할일이 끝나면서 밑줄이 간다
  // 진행중 끝남 탭을 누르면, 언더바가 이동한다
  // 끝남탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만
  // 전체탭을 누르면 다시 전체 아이템으로 돌아옴
