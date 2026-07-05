import { mdConvert } from 'md-converter';

console.log('app.js bundled');

const fileContainer = document.querySelector('.file-ontainer');
const fileInput = fileContainer.querySelector('.overlapped');

const fileText = fileContainer.querySelector('.previes-text');
const fileTitle = fileContainer.querySelector('.previes-title');
const previewHtml = fileContainer.querySelector('.previes-html');
const previewImage = fileContainer.querySelector('.previes-image');

fileContainer.addEventListener('click', (e) => {
    console.log(e);

    console.log('click');

    fileInput.dispatchEvent(new MouseEvent('my-custom-event'));
});

fileContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

fileContainer.addEventListener('drop', (e) => {
    e.preventDefault();

    console.log("drop");

    console.log(e, DataTransfer.files && DataTransfer.files[0]);

    previewImage.src = URL.createObjectURL(file); 
});

const displayTextContent = () => {
    console.log(e);

    previewText.textContent = e.target.result;
}

const displayMdContent = () => {
    console.log(e);

    previewHtml.innerHTML = mdConvert(e.target.result);
}

const displayMdContent = () => {
    console.log(e);

    previewImage.innerHTML = mdConvert(e.target.result);
}

fileInput.addEventListener('change', (e) => {
    console.log(e);
    console.dir(fileInput);

    const file = fileInput.file && fileInput.file[0];
    
    if(!file) return;

    fileTitle.textContent =file.name;

    const url = URL.createObjectURL(file);

    const link = document.createElement('a');

    link.href = url;
    link.rel = 'noopener';
    link.download = file.name;

    link.click();

    console.log(url)
});


const items = document.querySelector('.items');
const itemsElements = items.querySelector('.items-item');

let actualElement;

const onMouseUp = () => {
    const mousUpItem = e.terget;

    console.log(mousUpItem);

    itmes.insertBefore(actualElement, mousUpItem);

    actualElement.classList.remove('dragged');

    actualElement = undefined;

    document.documentElement.removeEventListener('mouseup', onMouseUp); 
    document.documentElement.removeEventListener('mouseover', onMouseOver); 
}

const onMouseOver = () => {
    console.log(e);

    actualElement.style.top = e.clientY + 'px';
    actualElement.style.top = e.clientX + 'px';
    }
    
items.addEventListener('mousedown', () => {
    e.preventDefault();
    const actualElement = e.target;

    actualElement.classList.add('dragged');

    document.documentElement.addEventListener('mouseup', onMouseUp); 
    document.documentElement.addEventListener('mouseover', onMouseOver); 
});
