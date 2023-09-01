console.log("page loading...");

var cookieDiv = document.querySelector(".cookie-policy");

document.addEventListener('DOMContentLoaded', () => {
    const previews = document.querySelectorAll('.image-preview');
    previews.forEach(preview => {
        const input = preview.previousElementSibling;
        input.addEventListener('change', (event) => {
            const file = input.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.src = e.target.result;
                    img.onload = () => {
                        if (img.width > preview.offsetWidth || img.height > preview.offsetHeight) {
                            const scaleFactor = Math.min(preview.offsetWidth / img.width, preview.offsetHeight / img.height);
                            img.style.width = img.width * scaleFactor + 'px';
                            img.style.height = img.height * scaleFactor + 'px';
                        }

                        preview.innerHTML = '';
                        preview.appendChild(img);
                    };
                };

                reader.readAsDataURL(file);
            } else {
                    preview.innerHTML = '';
                }
        });
                       

         // Bonus feature: Move image within THE preview  area using the mouse cursor,
        let isDragging = false;
        let offsetX, offsetY;

        preview.addEventListener('mousedown', (e) => {
                            if (e.target.tagName === 'IMG') {
                                isDragging = true;
                                offsetX = e.clientX - e.target.getBoundingClientRect().left;
                                offsetY = e.clientY - e.target.getBoundingClientRect().top;
                            }
        })

        document.addEventListener('mousemove', (e) => {
                            if (isDragging) {
                                    const x = e.clientX - offsetX - preview.getBoundingClientRect().left;
                                    const y = e.clientY - offsetY - preview.getBoundingClientRect().top;
                                    preview.querySelector('img').style.transform = `translate(${x}px, ${y}px)`;
                                   

                                    
                            } 
        });

        document.addEventListener('mouseup', () => {
                                isDragging = false;
        });

    });
});

                
                
       



/// FUNCTION TO REMOVE FOOTER
function accept() {
    cookieDiv.remove();
}