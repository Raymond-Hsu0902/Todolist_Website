const text = document.querySelector(".text");
const save = document.querySelector(".save");
const list = document.querySelector(".list");
const filter = document.querySelector(".filter");
const btn_all = document.querySelector(".btn_all");
const btn_unfinished = document.querySelector(".btn_unfinished");
const btn_finished = document.querySelector(".btn_finished");
const countNum = document.querySelector(".countNum");
const clear= document.querySelector(".clear");



let data = [

] 



function renderData(){
    let str = '';
    data.forEach(function(item,index){
        if (data[index].checked) {
        str += `<li>
        <input type="checkbox"  data-num="${index}" class="checkbox" name="" id="" value = "" checked>
        <span>✔</span>
        <div class="listText">

        <label>
        <p> ${item.content}</p>
        </label>
        <input class="delete" type="button" data-num = "${index}" value="X">
        </div>
        </li>`}
        else {
            str += `<li>
        <input type="checkbox"  data-num="${index}" class="checkbox" name="" id="" value = "">
        <span>✔</span>
        <div class="listText">
        <label>
        <p> ${item.content}</p>
        </label>
        <input class="delete" type="button" data-num = "${index}" value="X">
        </div>
        </li>`
        }
})
list.innerHTML = str;
count();
const cursor = filter.querySelector(".cursor");
listFilter(cursor);
}

//點擊checklist

list.addEventListener("click", function (e) {
    let num = e.target.dataset.num;
    let checkbox = list.querySelectorAll(".checkbox");
    if (e.target.nodeName !== "INPUT" || e.target.className === "delete") {
        return
    }
    if (checkbox[num].checked) {
        data[num].checked = true;
    } else {
        data[num].checked = false;
    }
    renderData();

})
//新增待辦功能
save.addEventListener("click",function(e){
    if (text.value == ""){
        alert("請輸入內容");
        return;
    }

    data.push({
        checked: false,
        content:text.value
    });//推到data裡面
    renderData();
})

//刪除待辦功能
const  cut = document.querySelector(".delete");
list.addEventListener("click",function(e){
    let num = e.target.getAttribute("data-num")
    if (e.target.getAttribute("class") === "delete"){
        data.splice(num,1);
        renderData();
    }else{

        return;

    }


})

//篩選器邏輯


function listFilter(e){

    const checkbox = list.querySelectorAll(".checkbox");
        if(e.value  === "已完成"){
            btn_unfinished.classList.remove("cursor");
            btn_all.classList.remove("cursor");
            for (let i = 0; i < data.length; i++) {
                if (data[i].checked === true) {
                    checkbox[i].parentNode.style.display = 'flex';
                } else {
                    checkbox[i].parentNode.style.display = 'none';
                }
            }
        }
        else if(e.value  === "待完成"){
            btn_finished.classList.remove("cursor");
            btn_all.classList.remove("cursor");
            for (let i = 0; i < data.length; i++) {
                if (data[i].checked  === true) {
                    checkbox[i].parentNode.style.display = 'none';
                } else {
                    checkbox[i].parentNode.style.display = 'flex';
                }
            }
        }
        else{
            btn_unfinished.classList.remove("cursor");
            btn_finished.classList.remove("cursor");
            for (let i = 0; i < data.length; i++) {
                    checkbox[i].parentNode.style.display = 'flex';
            }
        }
}


filter.addEventListener("click", function (e) {
    e.target.classList.add("cursor");
    listFilter(e.target)

})

//計算待完成項目

function count(){
    let number = 0;
    for (let i = 0; i < data.length; i++) {
        if(data[i].checked===false){
            number++
        }
    }
    countNum.innerHTML = `<p class="countNum">${number}個待完成項目</p>`
}

//刪除已完成項目

clear.addEventListener("click",function(){
    //從後往前數，就不用處理中間值被刪掉的問題
    for (let i = data.length - 1; i > -1; i--) {
        if(data[i].checked===true){

            data.splice(i,1);
        }
    }
    renderData();
})


renderData()