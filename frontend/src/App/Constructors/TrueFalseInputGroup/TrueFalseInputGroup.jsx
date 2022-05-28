import React from 'react';

const TrueFalseInputGroup = ({heading, handleOnChange, state, stateSetter, idFalse, idTrue, name, idAll}) => {
    return (
        <>
            <div className={'col-lg-4 mb-3'}>
                <p className="mb-0">{heading}</p>
                <div className={'btn-group mt-1'}
                     onChange={(e) => {
                         stateSetter(e.target.value)
                         handleOnChange(e.target.name, {value: e.target.value})
                     }}>
                    <input type="radio"
                           value={''}
                           readOnly={true}
                           checked={state === ''}
                           hidden={true} className="btn-check" name={name} id={idAll}
                           autoComplete="off"/>
                    <label
                        className={'btn radio-label ' + (state === '' ? 'btn-secondary' : 'btn-outline-secondary')}
                        htmlFor={idAll}>Все</label>

                    <input type="radio"
                           value={'true'}
                           readOnly={true}
                           checked={state === 'true'}
                           hidden={true} className="btn-check" name={name}
                           id={idTrue} autoComplete="off"/>
                    <label
                        className={'btn ms-1 radio-label ' + (state === 'true' ? 'btn-success' : 'btn-outline-success')}
                        htmlFor={idTrue}>Да</label>

                    <input type="radio"
                           value={'false'}
                           readOnly={true}
                           checked={state === 'false'}
                           hidden={true} className="btn-check" name={name}
                           id={idFalse} autoComplete="off"/>
                    <label
                        className={'btn ms-1 radio-label ' + (state === 'false' ? 'btn-danger' : 'btn-outline-danger')}
                        htmlFor={idFalse}>Нет</label>
                </div>
            </div>
        </>
    );
};

export default TrueFalseInputGroup;