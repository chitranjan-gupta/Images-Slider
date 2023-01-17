document.addEventListener("DOMContentLoaded",()=>{initialise();});
//Wait for the full html to load then it start initialising
function log(t){console.log(t);}//It make logging concise
function getIndex(objectArray,object){
  //It returns index of the object from the object Array otherwise negative index
  for(let i = 0; i < objectArray.length;i++){if(objectArray[i] === object)return i;}
  return -1;
}
function initialise(){
  const labelSection = document.querySelector("#slider");
  labelSection.addEventListener("click",function(){shuffle()},false);
  const labelArray = document.querySelector("#slider").children;//Array of the labels
  const activeElement = document.querySelector("#slide4");//Active element
  const leftButton = document.querySelector("#leftButton");//Left Button
  const rightButton = document.querySelector("#rightButton");//Right Button
  leftButton.addEventListener("click",function(){
    shuffle(document.querySelector("#slider").querySelector("label.active").previousElementSibling);});
  rightButton.addEventListener("click",function(){ 
    shuffle(document.querySelector("#slider").querySelector("label.active").nextElementSibling);});
  try{if(activeElement instanceof HTMLLabelElement){ //Checking the active element is label
    let index = getIndex(labelArray,activeElement), leftAlign = 0, rightAlign = 3;
    if(index !== -1){activeElement.className = "";activeElement.classList.add("active");
      for(let i = index - 1;i >= 0;i--){labelArray[i].className = "";
        if(leftAlign !== 3){labelArray[i].classList.add(`slide${++leftAlign}`);}
        else{labelArray[i].classList.add("slide3");}
      }
      for(let j = index + 1;j < labelArray.length;j++){labelArray[j].className = "";
        if(rightAlign != 6){labelArray[j].classList.add(`slide${++rightAlign}`);}
        else{labelArray[j].classList.add("slide6");}
      }
}}}catch(e){log(e);}}

function shuffle(element){
  const labelArray = document.querySelector("#slider").children;//Array of labels
  const currentElement = element || this.event.srcElement;
  try{if(currentElement instanceof HTMLLabelElement){
    //Check if the clicked element is label 
      if(!(currentElement.classList.contains("active"))){
        //Check the clicked element is not the active element
        let index = getIndex(labelArray,currentElement);
        //Get the index of clicked element from the array of labels
        let leftAlign = 0, rightAlign = 3, prevElement = false,nextElement = false;
        if(index !== -1){ //Check if the index of the element is non negative
          if(index < 2){
            //if the index of active element is less than 2 we get last element from label Array
            labelArray[labelArray.length - 1].className = "";
            labelArray[labelArray.length - 1].classList.add("slide3");
            labelArray[0].before(labelArray[labelArray.length - 1]);++index;
          }
          if(index > (labelArray.length - 3)){
            //if the index of active element is more than length of the label array 
            //we get first element from label Array
            labelArray[0].className = "";labelArray[0].classList.add("slide6");
            labelArray[labelArray.length - 1].after(labelArray[0]);--index;
          }
          if(!prevElement){
            if(labelArray[index - 1])if(labelArray[index - 1].classList.contains("active"))prevElement = true;
          }
          //It checks that previous to clicked element is active element;
          //if yes then it set prevElement variable to true
          if(!nextElement){
            if(labelArray[index + 1])if(labelArray[index + 1].classList.contains("active"))nextElement = true;
          }
          //It checks that next to clicked element is active element;
          //if yes then it set nextElement variable to true
          if(!prevElement && !nextElement)return;
          //If not anyone of the nextElement ya prevElement is true; nothing happens
          currentElement.className = "";//It clears the className of clicked element
          currentElement.classList.add("active");
          //It adds the active className to clicked element to make it active
          beforeElement(index);afterElement(index);
          function beforeElement(index){
            let count = 0;
            for(let i = index - 1;i >= 0;i--){
              if(count > 2)return;
              if(leftAlign !== 3){
                labelArray[i].className = "";
                labelArray[i].classList.add(`slide${++leftAlign}`);
              }
              ++count;
            }
          }

          function afterElement(index){
            let count = 0;
            for(let i = index + 1;i < labelArray.length;i++){
              if(count > 2)return;
              if(rightAlign !== 6){
                labelArray[i].className = "";
                labelArray[i].classList.add(`slide${++rightAlign}`);
              }
              ++count;
            }
          }
}}}}catch(e){log(e);}}
