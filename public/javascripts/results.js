async function loadContent() {
    const params = new URLSearchParams(window.location.search)
    // const course = params.get("course")
    // const department = params.get("department")
    // const quarter = params.get("quarter")

    let res = await fetchJSON(`/api/v1/course/search?${params.toString()}`)
    let course
    if (res.status == 404 || res.status == 500) {
        course = ""
    } else {
        course = res.course
    }
    if (res.create) {
        postClass(course)
    }

    document.getElementById("courses-results").innerHTML = `
    <div class="card">
        ${course ? 
        `<h3>${course.courseId}: ${course.courseTitle}</h3>
        <p>College: ${course.courseCollege}</p>
        <p>Credits: ${course.credits}</p>
        <span> <button id=${course.courseId} onclick=selectCourse(this.id)> View Course </button>` : 
        ` <p>No matching courses found</p>`}
    </div>
    `
    // TO DO: Add save icon that will add course to saved page for user
}

// sends POST request to save course in the databse
async function postClass(course) {
    await fetch(`/api/v1/course`, {
        method: 'POST', 
        body: course
    })
}

async function selectCourse(id) {
    console.log("selectCourse")
    // const courseId = event.id; // FIND WAY TO GET COURSE ID FROM DYNAMIC HTML ELEMENT

    location.href = `/course_detail.html?course=${id}`;

    
}

async function fetchJSON(route) {
        const res = await fetch(route);
        return await res.json();
      }