const spiderHam = document.getElementById("spiderHam");
const peniParker = document.getElementById("peniParker");
const spiderGwen = document.getElementById("spiderGwen");
const miles = document.getElementById("milesMorales");
const spiderman = document.getElementById("spiderMan");
const spiderNoir = document.getElementById("Noir");
const SVGS = document.getElementsByClassName("svgs");

spiderHam.addEventListener("click", () => {
    makeVisible(0);
});

peniParker.addEventListener("click", () => {
    makeVisible(1);
})

spiderGwen.addEventListener("click", () => {
    makeVisible(2);
})

miles.addEventListener("click", () => {
    makeVisible(3);
})

spiderman.addEventListener("click", () => {
    makeVisible(4);
})

spiderNoir.addEventListener("click", () => {
    makeVisible(5);
})


function makeVisible(index) {
    for(var i = 0; i < SVGS.length; i=i+1) {
        if(i === index) {
            SVGS[i].style.display = "block";
        } else {
            SVGS[i].style.display = "none";
        }
    }
}