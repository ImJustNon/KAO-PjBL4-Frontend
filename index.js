async function handleSubmit(){
    const inputStudentId = document.getElementById("input_student_id");
    const inputStudentPrefix = document.getElementById("input_student_prefix");
    const inputStudentFirstname = document.getElementById("input_student_firstname");
    const inputStudentLastname = document.getElementById("input_student_lastname");
    const inputStudentNickname = document.getElementById("input_student_nickname");
    const prefixBox = document.getElementById("prefix_box");

    const modalIcon = document.getElementById("modal_icon");
    const modalTitle = document.getElementById("modal_title");
    const modalDescription = document.getElementById("modal_description");

    if(!inputStudentId.value) inputStudentId.classList.add("input-error");
    if(!inputStudentFirstname.value) inputStudentFirstname.classList.add("input-error");
    if(!inputStudentLastname.value) inputStudentLastname.classList.add("input-error");
    if(!inputStudentNickname.value) inputStudentNickname.classList.add("input-error");
    if(!inputStudentPrefix.value) prefixBox.classList.add("input-error");
    if(!inputStudentId.value || !inputStudentFirstname.value || !inputStudentLastname.value || !inputStudentNickname.value || !inputStudentPrefix.value) return;

    try{
        const response = await axios.post("https://kao-pjbl4-backend.vercel.app/api/v1/student/register", {
            studentId: inputStudentId.value,
            studentPrefix: inputStudentPrefix.value,
            studentFirstname: inputStudentFirstname.value,
            studentLastname: inputStudentLastname.value,
            studentNickname: inputStudentNickname.value
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    
        if(response.data.status === "FAIL"){
            modalIcon.innerHTML = `<i class="fa-solid fa-circle-xmark fa-6x text-[#eb7171]"></i>`;
            modalTitle.innerHTML = "Register Failed";
            modalDescription.innerHTML = response.data.message;
            handleOpenModal();
        }
        else if(response.data.status === "OK"){
            modalIcon.innerHTML = `<i class="fa-solid fa-circle-check fa-6x text-[#79eb71]"></i>`;
            modalTitle.innerHTML = "Register Success";
            modalDescription.innerHTML = "";       
            handleOpenModal();
        }
    }
    catch(e){
        console.log(e);
        modalIcon.innerHTML = `<i class="fa-solid fa-circle-xmark fa-6x text-[#eb7171]"></i>`;
        modalTitle.innerHTML = "Somthing went Wrong";
        modalDescription.innerHTML = e;      
        handleOpenModal(); 
    }
}

function handleOpenPrefixDropdown(){
    const prefixDropdown = document.getElementById("prefix_dropdown");
    if(prefixDropdown.className.includes("hidden")){
        prefixDropdown.classList.remove("hidden");
        prefixDropdown.classList.add("flex");
    }
    else {
        prefixDropdown.classList.remove("flex");
        prefixDropdown.classList.add("hidden");
    }
}

function handleSelectedPrefix(prefix_value){
    const inputStudentPrefix = document.getElementById("input_student_prefix");
    const prefixTitle = document.getElementById("prefix_title");
    if(prefix_value === "girl"){
        inputStudentPrefix.value = "Miss";
        prefixTitle.innerHTML = "Miss";
        changeColor();
    }
    else if(prefix_value === "boy"){
        inputStudentPrefix.value = "Master";
        prefixTitle.innerHTML = "Master";
        changeColor();
    }
    function changeColor(){
        prefixTitle.classList.remove("text-[#ababab]");
        prefixTitle.classList.add("text-black");
    }
}