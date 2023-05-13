const start = document.getElementById("start");


let test = null;
const Watch = function(){
    this.sec = 0;
    this.min = 0;
    this.interval = null
    this.startTime = function(){
        this.interval = setInterval(this.updateTime.bind(this), 1000);
    }
    this.updateTime = function(){
        if(test.active === false){
            this.endTime();
        }
        this.sec += 1;
        if(this.sec === 60){
            this.sec = 0;
            this.min += 1;
        }
        let time = document.getElementById("time");
        time.innerText = `${this.min} mins ${this.sec} seconds`
        if(this.min === 5){
            this.endTime();
            test.endTest();
        }
    }
    this.endTime = function(){
        clearInterval(this.interval);
    }
}
start.addEventListener("click", (e) =>{
    start.style.visibility = "hidden";
    test = new Test();
    let watch = new Watch();
    watch.startTime();
    test.startTest();
});

function genOutput(){
    output = "";
    for (let i = 0; i < 4; i++) {
        let ascii = Math.floor((Math.random() * 26) + 65);
        output += String.fromCharCode(ascii);
    }
    for (let i = 0; i < 3; i++) {
        output += Math.floor((Math.random() * 10));
    }
    return output;
}
Test = function(){
    this.active = true;
    this.correct = 0;
    this.incorrect = 0;
    document.getElementById("correct").innerText = this.correct;
    document.getElementById("incorrect").innerText = this.incorrect;
    this.startTest = function(){
        let output = genOutput();
        document.getElementById("output").innerText = output;
        let response = document.getElementById("response");
        response.addEventListener("keypress", function(event) {
            if (event.key === "Enter" && this.active === true) {
                let input = response.value;
                response.value = "";
                if(input === output){
                    this.correct++;
                    document.getElementById("correct").innerText = this.correct;
                } else {
                    this.incorrect++;
                    document.getElementById("incorrect").innerText = this.incorrect;
                }
                output = genOutput();
                document.getElementById("output").innerText = output;
                if(this.correct + this.incorrect === 50) {
                    this.endTest();
                };
            }
        }.bind(this));
    }
    this.endTest = function(){
        document.getElementById("output").innerText = "Click the button to start";
        start.style.visibility = "visible";
        this.active = false;
        let result = document.getElementById("result");
        let total = test.correct + test.incorrect;
        let percent = null;
        if(total === 0){
            percent = 0;
        } else {
            percent = Math.round((test.correct/total) * 100);
        }
        result.innerText = `You completed ${total} entries with ${percent}% accuracy.`;
    }
}




