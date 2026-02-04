document.addEventListener('DOMContentLoaded', function() {
    const toggleRA = document.querySelector('.toggle-RA');
    const skillsRA = document.querySelector('.skills-RA');
    if(toggleRA && skillsRA){
        toggleRA.addEventListener('click', function(){
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            if(!expanded){
                skillsRA.removeAttribute('hidden');
                toggleRA.textContent = 'See less';
            } else {
                skillsRA.setAttribute('hidden', '');
                toggleRA.textContent = 'See more';
            }
        });
    }

    const toggleCourse = document.querySelector('.toggle-course');
    const skillsCourse = document.querySelector('.skills-course');
    if(toggleCourse && skillsCourse){
        toggleCourse.addEventListener('click', function(){
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            if(!expanded){
                skillsCourse.removeAttribute('hidden');
                toggleCourse.textContent = 'See less';
            } else {
                skillsCourse.setAttribute('hidden', '');
                toggleCourse.textContent = 'See more';
            }
        });
    }
});