
function WordShuffler(holder,opt){
    var that = this;
    var time = 0;
    this.now;
    this.then = Date.now();
    
    this.delta;
    this.currentTimeOffset = 0;
    
    this.word = null;
    this.currentWord = null;
    this.currentCharacter = 0;
    this.currentWordLength = 0;
    
    
    var options = {
        fps : 20,
        timeOffset : 5,
        textColor : '#000',
        fontSize : "50px",
        useCanvas : false,
        mixCapital : false,
        mixSpecialCharacters : false,
        needUpdate : true,
        colors : [
                  '#f44336','#e91e63','#9c27b0',
                  '#673ab7','#3f51b5','#2196f3',
                  '#03a9f4','#00bcd4','#009688',
                  '#4caf50','#8bc34a','#cddc39',
                  '#ffeb3b','#ffc107','#ff9800',
                  '#ff5722','#795548','#9e9e9e',
                  '#607d8b'
                  ]
    }
    
    if(typeof opt != "undefined"){
        for(key in opt){
            options[key] = opt[key];
        }
    }
    
    
    
    this.needUpdate = true;
    this.fps = options.fps;
    this.interval = 1000/this.fps;
    this.timeOffset = options.timeOffset;
    this.textColor = options.textColor;
    this.fontSize = options.fontSize;
    this.mixCapital = options.mixCapital;
    this.mixSpecialCharacters = options.mixSpecialCharacters;
    this.colors = options.colors;
    
    this.useCanvas = options.useCanvas;
    
    this.chars = [
                  'A','B','C','D',
                  'E','F','G','H',
                  'I','J','K','L',
                  'M','N','O','P',
                  'Q','R','S','T',
                  'U','V','W','X',
                  'Y','Z'
                  ];
    this.specialCharacters = [
                              '!','§','$','%',
                              '&','/','(',')',
                              '=','?','_','<',
                              '>','^','°','*',
                              '#','-',':',';','~'
                              ]
    
    if(this.mixSpecialCharacters){
        this.chars = this.chars.concat(this.specialCharacters);
    }
    
    this.getRandomColor = function () {
        var randNum = Math.floor( Math.random() * this.colors.length );
        return this.colors[randNum];
    }
    
    //if Canvas
    
    this.position = {
        x : 0,
        y : 50
    }
    
    //if DOM
    if(typeof holder != "undefined"){
        this.holder = holder;
    }
    
    if(!this.useCanvas && typeof this.holder == "undefined"){
        console.warn('Holder must be defined in DOM Mode. Use Canvas or define Holder');
    }
    
    
    this.getRandCharacter = function(characterToReplace){
        if(characterToReplace == " "){
            return ' ';
        }
        var randNum = Math.floor(Math.random() * this.chars.length);
        var lowChoice =  -.5 + Math.random();
        var picketCharacter = this.chars[randNum];
        var choosen = picketCharacter.toLowerCase();
        if(this.mixCapital){
            choosen = lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
        }
        return choosen;
        
    }
    
    this.writeWord = function(word){
        this.word = word;
        this.currentWord = word.split('');
        this.currentWordLength = this.currentWord.length;
        
    }
    
    this.generateSingleCharacter = function (color,character) {
        var span = document.createElement('span');
        span.style.color = color;
        span.innerHTML = character;
        return span;
    }
    
    this.updateCharacter = function (time) {
        
        this.now = Date.now();
        this.delta = this.now - this.then;
        
        
        
        if (this.delta > this.interval) {
            this.currentTimeOffset++;
            
            var word = [];
            
            if(this.currentTimeOffset === this.timeOffset && this.currentCharacter !== this.currentWordLength){
                this.currentCharacter++;
                this.currentTimeOffset = 0;
            }
            for(var k=0;k<this.currentCharacter;k++){
                word.push(this.currentWord[k]);
            }
            
            for(var i=0;i<this.currentWordLength - this.currentCharacter;i++){
                word.push(this.getRandCharacter(this.currentWord[this.currentCharacter+i]));
            }
            
            
            if(that.useCanvas){
                c.clearRect(0,0,stage.x * stage.dpr , stage.y * stage.dpr);
                c.font = that.fontSize + " sans-serif";
                var spacing = 0;
                word.forEach(function (w,index) {
                             if(index > that.currentCharacter){
                             c.fillStyle = that.getRandomColor();
                             }else{
                             c.fillStyle = that.textColor;
                             }
                             c.fillText(w, that.position.x + spacing, that.position.y);
                             spacing += c.measureText(w).width;
                             });
            }else{
                
                if(that.currentCharacter === that.currentWordLength){
                    that.needUpdate = false;
                }
                this.holder.innerHTML = '';
                word.forEach(function (w,index) {
                             var color = null
                             if(index > that.currentCharacter){
                             color = that.getRandomColor();
                             }else{
                             color = that.textColor;
                             }
                             that.holder.appendChild(that.generateSingleCharacter(color, w));
                             }); 
            }
            this.then = this.now - (this.delta % this.interval);
        }
    }
    
    this.restart = function () {
        this.currentCharacter = 0;
        this.needUpdate = true;
    }
    
    function update(time) {
        time++;
        if(that.needUpdate){
            that.updateCharacter(time);
        }
        requestAnimationFrame(update);
    }
    
    this.writeWord(this.holder.innerHTML);
    
    
    console.log(this.currentWord);
    update(time);
}


var once=false; var introIDs = ["intro1","intro2","intro3","intro4","intro5","intro6","intro7","intro8",
                                "intro9", "intro10", "intro11", "intro12", "intro13", "intro14"];
var keyWordIDs = ["keyWord1", "keyWord2", "keyWord3", "keyWord4", "keyWord5"];
var cenWords = ["Hi.", "Welcome.","Hey.","Stop.","LOL.","Ok.","One.","Last.","Hit.","Enjoy."];
function getID(thisID){
    var modal; var span; var cenText;
    if(thisID == "contactBtn"){
        
        
        
    }
    else if(thisID == "aboutBtn"){
        modal = document.getElementById("about");
        modal.style.display = "block";
        // Get the <span> element that closes the modal
        span = document.getElementsByClassName("close")[1];
        if(!once){
            for (var i=0; i<introIDs.length;i++){
                new WordShuffler(document.getElementById(introIDs[i]),{
                                         textColor : '#fff',
                                         timeOffset : 4,
                                         mixCapital : true,
                                         mixSpecialCharacters : true
                                         });
            }
            for (var i=0; i<keyWordIDs.length;i++){
                new WordShuffler(document.getElementById(keyWordIDs[i]),{
                                 textColor : '#ff9900',
                                 timeOffset : 12,
                                 mixCapital : true,
                                 mixSpecialCharacters : true
                                 });
            }
            once=true;
        }
        
        htmlMove();
        cppMove();
        javaMove();
        swiftMove();
    }
    else if(thisID == "resumeBtn" || thisID == "keyWord5"){
        modal = document.getElementById("resume");
        modal.style.display = "block";
        // Get the <span> element that closes the modal
        span = document.getElementsByClassName("close")[0];
    }
    else if(thisID ==  "homeBtn"){
        cenText = document.getElementById("centerText").textContent;
        if(cenText == "Enjoy."){
//            document.getElementById("centerText").innerHTML = "Enjoy.";
            Typed.new(".centerText", {
                      strings: ["Enjoy."],
                      contentType: 'html', // or 'text'
                      showCursor: false
                      });
        }
        else {
            for(var i=0; i<cenWords.length;i++){
                if(cenText == cenWords[i]){
//                    document.getElementById("centerText").innerHTML = cenWords[i+1];
                    Typed.new(".centerText", {
                              strings: [cenWords[i+1]],
                              contentType: 'text', // or 'text'
                              typeSpeed: 50,
                              shuffle: true
                              });
                    break;
                }
            }
            
        }
        return;
        
    }
    else if(thisID == "pptBtn"){
        modal = document.getElementById("ppt");
        modal.style.display = "block";
        span = document.getElementsByClassName("close")[2];
    }
    
    
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    
}

function htmlMove() {
    var elem = document.getElementById("htmlBar");
    var width = 10;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 65) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = "HTML  CSS JS " + width * 1  + '%';
        }
    }
}
function cppMove() {
    var elem = document.getElementById("cppBar");
    var width = 10;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 80) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = "C++ " + width * 1  + '%';
        }
    }
}
function javaMove() {
    var elem = document.getElementById("javaBar");
    var width = 10;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 75) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = "Java " + width * 1  + '%';
        }
    }
}
function swiftMove() {
    var elem = document.getElementById("swiftBar");
    var width = 10;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 60) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = "Swift " + width * 1  + '%';
        }
    }
}



