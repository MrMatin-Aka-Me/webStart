import Swal from "sweetalert2";
import './style.css'


export function showSmallInfo(contractor) {

    let contacts = contractor.obj.obj_type === 'web_studio' ? `<div>
            <h5>Адрес:</h5>
            ${contractor.address.split(' | ').map(address => `<p>${address}</p>`).join('')}
            <h5>Телефон:</h5>
            ${contractor.phone_number.split(' | ').map(phone_number => `<p>${phone_number}</p>`).join('')}
        <div/>` : ''

    let html = `<div>
        ${contacts}
        <h5>Ссылка на сайт:</h5>
        <p><a href=${contractor.obj.link}>${contractor.obj.link}</a></p>
        <h5>Описание:</h5>
        ${contractor.obj.description.split("\n").map(str => {
        return str === "\r" ? `<p/>` : `<div>${str}</div>`}).join('')}
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