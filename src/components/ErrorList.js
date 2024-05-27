
//  client\src\components\ErrorList.js

/**
 * ## `ErrorList`-Component
 * Error message list
 * 
 * ### Returns
 * - `<div>` containing a `<ul>` of `<li>`-error-messages produced with `errors.map()`
 * - Used by: `Error.js`
 * 
 * @module ErrorList
 * @param {Object} props
 * @param {[string]} props.errors - Array of error messages
 * @returns {JSX.Element | null} 
 * @ReactComponent
 */
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
}

export default ErrorList;