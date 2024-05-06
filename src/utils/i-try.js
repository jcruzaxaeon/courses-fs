//  client\src\utils\i-try.js
//
// import { useNavigate } from "react-router-dom";

exports.iTry = (cb, msg, nav) => {
   return (() => {
      try { cb(); }
      // catch (err) { throw new Error(msg); }
      catch {
         nav('/error', {state: { errors: [msg]}})
      }
   })();
}