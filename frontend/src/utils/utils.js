import Swal from "sweetalert2";
import './style.css'


export function showSmallInfo(contractor) {

    let contacts = contractor.obj.obj_type === 'web_studio' ? `<div>
            <h5>Адрес:</h5>
            <p>${contractor.address}</p>
            <h5>Телефон:</h5>
            <p>${contractor.phone_number}</p>
        <div/>` : ''

    let html = `<div>
        ${contacts}
        <h5>Ссылка на сайт:</h5>
        <p><a href=${contractor.obj.link}>${contractor.obj.link}</a></p>
        <h5>Описание:</h5>
        <p>${contractor.obj.description}</p>
    </div>`

    Swal.fire({
        title: `${contractor.obj.name}`,
        confirmButtonText: 'Ок',
        html,
        width: '800px',
        customClass: {
            htmlContainer: 'swalHtmlContainer'
        }
    }).then()
}