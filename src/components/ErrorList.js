////////////////////////////////////////////////////////////////////////////////////////////////////
//  client\src\components\ErrorList.js
////////////////////////////////////////////////////////////////////////////////////////////////////
const ErrorList = ({ errors }) => {
    let errorList = null;

    if (errors.length) {
        errorList = (
            <div className='validation--errors'>
                <h3 className='error-list'>Error List</h3>
                <div className='error-list'>
                    <ul className='error-list'>
                        {errors.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                </div>
            </div>
        );
    }

    return errorList;

    //TURNERY EXAMPLE
    // return errors.length
    //     ? ( <div>
    //             <h2 className="validation--errors--label">Validation errors</h2>
    //             <div className="validation-errors">
    //                 <ul>
    //                     {errors.map((error, i) => <li key={i}>{error}</li>)}
    //                 </ul>
    //             </div>
    //         </div> )
    //     : null

    // <div class="validation--errors">
    //    <h3>Validation Errors</h3>
    //    <ul>
    //       <li>Please provide a value for "Title"</li>
    //       <li>Please provide a value for "Description"</li>
    //    </ul>
    // </div>
}

export default ErrorList;