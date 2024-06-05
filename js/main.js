/* typewriter effect with alterating text */
var typed = new Typed(".auto-type", {
    strings: ["a Computer Science student.", "a Developer.", "an Entrepreneur.", "a Trojan."],
    typeSpeed: 100,
    backSpeed: 50,
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
        link.addEventListener('click', function(event) {
            event.preventDefault();
            // remove active class from all links
            navLinks.forEach(lnk => lnk.classList.remove('active'));

            // add active class to the clicked link
            link.classList.add('active');

            // scroll to the corresponding section
            const targetId = link.getAttribute('href').substring(1); // remove the '#' from the href attribute
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetPosition = targetElement.offsetTop - 100; // offset header height
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // create the IntersectionObserver
    const options = {
        threshold: 0.5 // 50% of the section is in view
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
        
        if ($(window).width() > 768) {  // only adjust height for larger screens
            var listItemHeight = $(".v-tabs ul")
                .find("li:eq(" + numberIndex + ")")
                .innerHeight();
            $(".v-tabs ul").height(listItemHeight + "px");
        }
    }
});

/* fade in on scroll */
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.fade-in'); // target all "fade-in" sections

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top; // get the position of the section relative to the viewport
        const sectionBottom = section.getBoundingClientRect().bottom; // get the position of the section's bottom relative to the viewport
        const windowHeight = window.innerHeight;

        // check if ANY part of the section is in the viewport
        if (sectionTop < windowHeight && sectionBottom > 0) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        } else {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
        }
    });
});


/* vertical animated timeline */
(function($) {
    // cached jQuery objects
    const timeline = $('.timeline'),
          timelineLine = $('.line'),
          timelineProgress = $('.progress'),
          timelineDot = $('.dot-container'),
          timelineEntry = $('.item');

    let lastScrollY = -1,
        isAnimating = false;

    $(window).on({
        'scroll': updateLayout,
        'resize': updateLayout
    });

    function adjustLine() {
        isAnimating = false;
        
        // adjust the timeline line's top and bottom based on the dots
        timelineLine.css({
            top: timelineEntry.first().find(timelineDot).offset().top - timelineEntry.first().offset().top,
            bottom: timeline.offset().top + timeline.outerHeight() - timelineEntry.last().find(timelineDot).offset().top
        });

        if (lastScrollY !== $(window).scrollTop()) {
            lastScrollY = $(window).scrollTop();
            adjustProgress();
        }
    }

    function adjustProgress() {
        const lastDotTop = timelineEntry.last().find(timelineDot).offset().top,
              progressTop = lastDotTop + lastScrollY - $(window).scrollTop(),
              progressOffset = timelineProgress.offset().top + lastScrollY - $(window).scrollTop();
    
        // calculate the new height based on the scroll position and apply
        const newHeight = Math.min(progressTop, lastScrollY + $(window).outerHeight() / 2) - progressOffset;
        timelineProgress.css({ height: `${newHeight}px` });
    
        // add/remove class based on the position of the dot
        timelineEntry.each(function() {
            const dotTop = $(this).find(timelineDot).offset().top;
    
            // extra condition to check whether the element has the 'js-triggered' class
            if ((dotTop + lastScrollY - $(window).scrollTop()) < lastScrollY + 0.5 * $(window).outerHeight()) {
                if (!$(this).hasClass('js-triggered')) {
                    $(this).addClass('js-active js-triggered');
                }
            } else {
            }
        });
    }    

    function updateLayout() {
        if (!isAnimating) {
            requestAnimationFrame(adjustLine);
        }
        isAnimating = true;
    }
})(jQuery);

// project demo slider
document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const demoVideos = document.querySelectorAll('.demo-img video');
    const projects = document.querySelectorAll('.project-description.clickable');
    const progresses = document.querySelectorAll('.progress-var-1');
    const extraInfos = document.querySelectorAll('.extra-info.retractable');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    function resetProgresses() {
        progresses.forEach(progress => {
            progress.style.transition = 'none';
            progress.style.width = '0%';
        });
    }

    function animateProgress(index, duration) {
        resetProgresses();
        progresses[index].style.transition = `width ${duration}ms linear`;
        progresses[index].style.width = '100%';
    }

    function activateProject(index) {
        demoVideos[currentIndex].classList.remove('active');
        demoVideos[currentIndex].pause();
        demoVideos[currentIndex].currentTime = 0;
        projects[currentIndex].classList.remove('active');
        extraInfos[currentIndex].style.display = 'none';

        currentIndex = index;

        demoVideos[currentIndex].classList.add('active');
        projects[currentIndex].classList.add('active');
        extraInfos[currentIndex].style.display = 'block';

        const duration = demoVideos[currentIndex].duration * 1000; // convert to milliseconds
        animateProgress(currentIndex, duration);
        demoVideos[currentIndex].play();

        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(nextProject, duration);
    }

    function nextProject() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= demoVideos.length) nextIndex = 0;
        activateProject(nextIndex);
    }

    function prevProject() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = demoVideos.length - 1;
        activateProject(prevIndex);
    }

    function restartAutoRotate() {
        clearInterval(autoRotateInterval); // clear existing interval
        startAutoRotate(); // start a fresh one
        const duration = demoVideos[currentIndex].duration * 1000; // convert to milliseconds
        animateProgress(currentIndex, duration); // start the progress bar animation
    }

    demoVideos.forEach((video, index) => {
        video.addEventListener('click', function() {
            resetProgresses();
            restartAutoRotate();
        });
    });

    projects.forEach((project, index) => {
        project.addEventListener('click', function() {
            resetProgresses();
            restartAutoRotate();
        });
    });

    let isPaused = false;

    function togglePause() {
        if (isPaused) {
            restartAutoRotate();
        } else {
            resetProgresses();
            stopAutoRotate();
        }
        isPaused = !isPaused;
    }

    demoVideos.forEach((video, index) => {
        video.addEventListener('click', togglePause);
    });

    projects.forEach((project, index) => {
        project.addEventListener('click', function() {
            activateProject(index); // change the project on clicking its description
            resetProgresses();
            restartAutoRotate();
        });
    });

    prevBtn.addEventListener('click', () => {
        resetProgresses();
        prevProject();
        restartAutoRotate();
    });

    nextBtn.addEventListener('click', () => {
        resetProgresses();
        nextProject();
        restartAutoRotate();
    });

    let autoRotateInterval;

    function startAutoRotate() {
        const duration = demoVideos[currentIndex].duration * 1000; // convert to milliseconds
        autoRotateInterval = setInterval(nextProject, duration);
    }

    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    const demoContainer = document.querySelector('.demo-container');

    let observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoRotate();
                activateProject(currentIndex);
            } else {
                stopAutoRotate();
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(demoContainer);

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoRotate();
        } else {
            startAutoRotate();
        }
    });

    function activateAllProjectsForMobile() {
        demoVideos.forEach(video => video.classList.add('active'));
        projects.forEach(project => project.classList.add('active'));
        extraInfos.forEach(info => (info.style.display = 'block'));
    }

    function deactivateAllProjectsForMobile() {
        demoVideos.forEach(video => video.classList.remove('active'));
        projects.forEach(project => project.classList.remove('active'));
        extraInfos.forEach(info => (info.style.display = 'none'));
    }

    if (window.innerWidth <= 992) {
        stopAutoRotate(); // stop any auto-rotation
        activateAllProjectsForMobile(); // show all demos at once
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 992) {
            stopAutoRotate();
            activateAllProjectsForMobile();
        } else {
            deactivateAllProjectsForMobile();
            startAutoRotate(); // start the auto rotation again for larger screens
            activateProject(currentIndex); // ensure a single project is active
        }
    });

    function rearrangeForMobile() {
        const demoContainer = document.querySelector('.demo-container');
        const demoVideos = document.querySelectorAll('.demo-img video');
        const projects = document.querySelectorAll('.projects .project');

        for (let i = 0; i < demoVideos.length; i++) {
            demoContainer.appendChild(demoVideos[i]);
            if (projects[i]) {
                demoContainer.appendChild(projects[i]);
            }
        }
    }

    function rearrangeForDesktop() {
        const demoContainer = document.querySelector('.demo-container');
        const demoVideos = document.querySelectorAll('.demo-container > video');
        const projects = document.querySelectorAll('.demo-container > .project');
        const demoImgDiv = document.querySelector('.demo-img');
        const projectsDiv = document.querySelector('.projects');

        demoVideos.forEach(video => demoImgDiv.appendChild(video));
        projects.forEach(project => projectsDiv.appendChild(project));
    }

    if (window.innerWidth <= 992) {
        rearrangeForMobile();
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 992) {
            rearrangeForMobile();
        } else {
            rearrangeForDesktop();
        }
    });
});


/* archive project item pop up effect */
document.addEventListener('DOMContentLoaded', function() {
    let gridItems = document.querySelectorAll('.project-wrapper'); 

    let observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // If the item is in the viewport
            if (entry.isIntersecting) {
                let delay = (parseInt(entry.target.getAttribute('data-index')) || 0) * 0.1; 
                entry.target.style.animation = `popUp 0.5s forwards ${delay}s`;
                entry.target.dataset.scale = '1';  // store the scale value in a data attribute
            }            
        });
    }, {
        threshold: 0.1  // at least 10% of the item is visible
    });

    gridItems.forEach((item, index) => {
        item.setAttribute('data-index', index);
        observer.observe(item);
    });

    gridItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.setProperty('--scale', this.dataset.scale || '1');
        });
    });
    
});