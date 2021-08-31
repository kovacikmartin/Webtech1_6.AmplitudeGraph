var eventSource = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
var data;

var graph = document.getElementById("graph")

var sinFun = {
    x: [],
    y: [],
    marker: {color: "lightskyblue"}
};

var cosFun = {
    x: [],
    y: [],
    marker: {color: "plum"}
};

var layout = {
    
    xaxis:{
        zerolinecolor: "plum",
        tickfont:{
            color: "lightskyblue"
        }
    },

    yaxis:{
        zerolinecolor: "plum",
        tickfont:{
            color: "lightskyblue"
        }
    },
    paper_bgcolor:"black",
    plot_bgcolor:"black"
};

plots = [sinFun, cosFun];
Plotly.newPlot(graph, plots, layout, {showlegend: false});

function isSinChecked(){
    var sinBtn = document.getElementById("sin");
    if(sinBtn.checked)
        Plotly.restyle(graph, {visible: true}, 0);
    else
        Plotly.restyle(graph, {visible: false}, 0)
}

function isCosChecked(){
    var cosBtn = document.getElementById("cos");
    if(cosBtn.checked)
        Plotly.restyle(graph, {visible: true}, 1);
    else
        Plotly.restyle(graph, {visible: false}, 1)
}

function isAmpChecked(){

    var ampText = document.getElementById("ampTextInput");
    var ampSlider = document.getElementById("ampSlider");

    if(document.getElementById("ampTextBox").checked)
        ampText.style.display = "inline";
    else
        ampText.style.display = "none";

    if(document.getElementById("ampSliderBox").checked)
        ampSlider.style.display = "inline";
    else
        ampSlider.style.display = "none";

}

eventSource.onmessage = function(event) {

    var amp = document.getElementById("ampSlider").value;

    data = JSON.parse(event.data);
    sinFun = {
        x: [[data.x]],
        y: [[data.y1]]
    };
    cosFun = {
        x: [[data.x]],
        y: [[data.y2]]
    };

    Plotly.extendTraces(graph, {
        x: [[data.x], [data.x]],
        y: [[data.y1*amp], [data.y2*amp]]},
        [0, 1]
    )
};

document.getElementById("endPlot").onclick = function(){
    eventSource.close();
}

class AmplitudeControl extends HTMLElement{
    
    constructor() {
        super();
      }
    connectedCallback() {

        const template = document.querySelector('template');   
        const clone = document.importNode(template.content, true);
        this.appendChild(clone);
      }
}

customElements.define("amplitude-controls", AmplitudeControl);