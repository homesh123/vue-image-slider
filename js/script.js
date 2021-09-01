let slideIndex = 1;

var vm = new Vue({
    el: '.slider-wrapper',
    data(){
        return {
            slides:[
                {
                    imageURL:"https://dummyimage.com/1000x400/000000/fff.jpg&text=Slide+Image+Here",
                    caption:"Caption 1",
                    link:"http://www.google.com"
                },
                {
                    imageURL:"https://dummyimage.com/1000x400/000033/fff.jpg&text=Slide+Image+Here",
                    caption:"Caption 2",
                    link:"http://www.yahoo.com"
                },
                {
                    imageURL:"https://dummyimage.com/1000x400/004400/fff.jpg&text=Slide+Image+Here",
                    caption:"Caption 3",
                    link:"http://www.bing.com"
                }
            ],
        }
    },
    methods:{
        slideAction(n){
            this.showSlide(slideIndex += n);
        },
        selectedSlide(n) {
            this.showSlide(slideIndex = n);
        },
        showSlide(n){
            var i;
            var slides = document.getElementsByClassName("slides");
            var dots = document.getElementsByClassName("slides_dots");
            if (n > slides.length) {
              slideIndex = 1
            }
            if (n < 1) {
              slideIndex = slides.length
            }
            for (i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
              dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex - 1].style.display = "block";
            if(dots[slideIndex - 1]){
            dots[slideIndex - 1].className += " active";
            }
        }
    }
})

vm.showSlide(1);
