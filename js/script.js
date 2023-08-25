let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

/* typewriter effect with alterating text */
var typed = new Typed(".auto-type", {
    strings: ["Web Developer.", "Computer Science student.", "Problem Solver."],
    typeSpeed: 150,
    backSpeed: 100,
    loop: true
})

/* scroll spy */ 
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    // when a section enters or exits the viewport
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // get the corresponding nav link and set it as active
                const activeLink = document.querySelector(`.navbar a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    // add click event to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // remove active class from all links
            navLinks.forEach(lnk => lnk.classList.remove('active'));

            // add active class to the clicked link
            link.classList.add('active');
        });
    });

    // create the IntersectionObserver
    const options = {
        threshold: 0.7 // 70% of the section is in view
    };
    const observer = new IntersectionObserver(handleIntersection, options);

    // observe all sections
    sections.forEach(section => observer.observe(section));
});


/* leadership vertical tabs */
$(document).on("click", ".v-tabs .menu div", function() {
	var numberIndex = $(this).index();

	if (!$(this).hasClass("active")) {
		$(".v-tabs .menu div").removeClass("active");
		$(".v-tabs ul li").removeClass("active");

		$(this).addClass("active");
		$(".v-tabs ul").find("li:eq(" + numberIndex + ")").addClass("active");

		var listItemHeight = $(".v-tabs ul")
			.find("li:eq(" + numberIndex + ")")
			.innerHeight();
		$(".v-tabs ul").height(listItemHeight + "px");
	}
});